const Axios = require('axios');

(async () => {
  let res = await Axios.post("https://cards-dev.twitter.com/validator/validate", {
    authenticity_token: 'e301f90f7cdb154dfe56217c8ea267264d1c3134',
    url: 'https://www.aoe4stats.net/?chartDispId=fb63d6c3e32826627a2961af',
    platform: 'Swift-12',
  }, {
    "referrer": "https://cards-dev.twitter.com/validator",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "mode": "cors",
    "credentials": "include",
    headers: {
      "accept": "*/*",
      "accept-language": "ja,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "_gid=GA1.2.1643290124.1636131468; kdt=A9NXI7RxFCyIOnZvYaUPF9Bz9fdHN8dsGiXJgDmV; dnt=1; auth_multi=\"3300672648:a711463b213e236064b9f026558057016f4eff36|1061916915453456384:3600318288a36504367a20293101b326425a8f38\"; auth_token=31f96e7682e8fa04773deb802e3bbec2dc26cd77; personalization_id=\"v1_b2ff0csJIpYUfbhacUXTAQ==\"; guest_id=v1%3A163613170775436639; twid=u%3D1456529333607366657; ct0=5347e07c96624491cf08738e1d0d8370b6e82ed9f71eb24c23f17d66813ec6c8e9b23d75b55ae0bed33602d11f3e017c5227df5788f6b32262b7628dcf8b07030b752d251e34e7a8a16b61cd42ba05fc; att=1-92fnEbRhO3PEF3GPGfxY91jdXE8wRA6wflkttiLC; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCF3lDPF8AToMY3NyZl9p%250AZCIlNTJjYTE0NWY5ZjIzMGYyZTU1ZWQyMDFmMDJhY2RiNTE6B2lkIiViYzM4%250AMDVhN2U1M2ViYWI2YzlhMTk3OTJhN2Q1NDMyOA%253D%253D--27ad995f55dce3ecaf4b90a8959d7a785942ab9d; csrf_id=4bf56e8f1ef5f2bcf8ffa909766763da; at_check=true; mbox=session#742f689cae3744e3813bcf320200e800#1636176739|PC#742f689cae3744e3813bcf320200e800.32_0#1699419680; _ga_34PHSZMC42=GS1.1.1636174879.1.0.1636174879.0; _ga=GA1.2.828165831.1636131468; external_referer=padhuUp37ziAKibuopE6QzC1qMlD1KP271bTjPK8etAXq3t56SIJD1C0s4lwVACNNcbFnCVMuupADklJCwTnAQ%3D%3D|0|8e8t2xd8A2w%3D",
      "Referer": "https://cards-dev.twitter.com/validator",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "authenticity_token=e301f90f7cdb154dfe56217c8ea267264d1c3134&url=https%3A%2F%2Fwww.aoe4stats.net%2F%3FchartDispId%3Dc10bdd4c9f390816a0cebb9b&platform=Swift-12&authenticity_token=e301f90f7cdb154dfe56217c8ea267264d1c3134&authenticity_token=e301f90f7cdb154dfe56217c8ea267264d1c3134",

  });

  console.log(res.data);
})();


//
// fetch("https://cards-dev.twitter.com/validator/validate", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ja,en-US;q=0.9,en;q=0.8",
//     "cache-control": "no-cache",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://cards-dev.twitter.com/validator",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "authenticity_token=e301f90f7cdb154dfe56217c8ea267264d1c3134&url=https%3A%2F%2Fwww.aoe4stats.net%2F%3FchartDispId%3Dc10bdd4c9f390816a0cebb9b&platform=Swift-12&authenticity_token=e301f90f7cdb154dfe56217c8ea267264d1c3134&authenticity_token=e301f90f7cdb154dfe56217c8ea267264d1c3134",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
