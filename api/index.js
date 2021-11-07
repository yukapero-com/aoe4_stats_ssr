const appRoot = require('app-root-path');
const express = require('express');
const app = express();
const __ = require('underscore');
const sequelize = require(appRoot + '/api/lib/sequelize.js');
const {QueryTypes} = require('sequelize');
const LeaderBoardLog = require(`${appRoot}/api/model/leader_board_log.js`);
const ChartImageForShare = require(`${appRoot}/api/model/chart_image_for_share.js`);
const bodyParser = require('body-parser');
const Player = require(`${appRoot}/api/model/player.js`);

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true, limit: '2mb'}));

app.post('/upload_elo_chart_img', async (req, res, next) => {
  let {rlUserId, imageBase64} = req.body;

  try {
    let chartImageForShareModel = await ChartImageForShare.upsert({
      rlUserId: rlUserId,
      chartImageBase64: imageBase64,
    });

    res.send(rlUserId);
  } catch (e) {
    console.error(e);
    res.send(null);
  }
});

app.get('/ogp_img/:rlUserId', async (req, res, next) => {
  let {rlUserId} = req.params;

  try {
    let chartImageForShareModel = await ChartImageForShare.findOne({
      where: {
        rlUserId: rlUserId
      }
    });

    if (!chartImageForShareModel) {
      throw new Error(`chart image for share not found. dispId: ${rlUserId}`);
    }

    const img = new Buffer.from(chartImageForShareModel.chartImageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': img.length
    });
    res.end(img);
  } catch (e) {
    console.error(e);
    next();
  }
});


app.get('/user_candidates', async (req, res, next) => {
  let {text} = req.query;

  if (text.length < 2) {
    res.send([]);
    return;
  }

  let records = await sequelize.query(
    `
      SELECT DISTINCT rl_user_id, user_name
      FROM player
      WHERE MATCH (user_name) AGAINST (? IN BOOLEAN MODE);
    `,
    {
      replacements: [text],
      type: QueryTypes.SELECT
    }
  );

  let data = records.map(r => ({
    id: r.rl_user_id,
    name: r.user_name,
  }));

  res.send(data.slice(0, 100));
});

app.get('/elo_log', async (req, res, next) => {
  let {id} = req.query;
  let leaderBoardLogModels = await LeaderBoardLog.findAll({
    where: {
      rlUserId: id
    }
  });
  res.send(leaderBoardLogModels.map(m => ({
    elo: m.elo,
    rank: m.rank,
    winPercent: m.winPercent,
    wins: m.wins,
    losses: m.losses,
    createdAt: m.createdAt,
  })));
});

app.get('/get_name_by_rl_user_id', async (req, res, next) => {
  let {rlUserId} = req.query;
  let playerModel = await Player.findOne({
    where: {
      rlUserId: rlUserId
    }
  });

  if (playerModel) {
    res.send({
      id: playerModel.rlUserId,
      name: playerModel.userName
    });
  } else {
    res.send(null);
  }
});

app.get('/get_top_ranker_user_id', async (req, res, next) => {
  let records = await sequelize.query(
    `SELECT @max_id := MAX(id) AS maxid
     FROM leader_board_log;`,
    {type: QueryTypes.SELECT}
  );

  let maxid = records[0].maxid;

  let records2 = await sequelize.query(
    `SELECT user_name, rl_user_id, wins
     FROM (SELECT * FROM leader_board_log WHERE id > ${maxid - 100}) AS t1;`,
    {type: QueryTypes.SELECT}
  );

  let r = __.max(records2, r => r.wins);

  res.send({
    id: r.rl_user_id,
    name: r.user_name,
  });
});

module.exports = {
  path: '/api',
  handler: app
}
