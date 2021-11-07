<template>
  <div class="parent-div">
    <img
      ref="loadingSpin"
      class="loading-spin"
      :src="CONST.LOADING_SPINNER_BASE64"
    >
    <div :id="`${id}_chart`" class="chart" ref="chartdiv"/>
  </div>
</template>

<script>
/* eslint-disable no-unreachable,no-debugger */
let am5, am5xy, am5exporting;
import CONST from '../lib/const.js';
import _ from 'underscore';

export default {
  props: {
    id: Number,
    user: Object,
    chartData: Array,
    isFetching: Boolean,
  },
  data: () => ({
    CONST: CONST,
    isGeneratingChart: false,

    root: null,
    chart: null,
    exporting: null,
    dateAxis: null,
  }),
  computed: {
    isLoading() {
      return this.isGeneratingChart || this.isFetching;
    },
    latestChartData() {
      return this.chartData ? _.last(this.chartData) : null;
    }
  },

  watch: {
    async chartData() {
      this.drawChart();
    },
    isLoading(v) {
      if (v) {
        this.showLoadingSpin();
        this.hideChart();
        this.$emit('is-loading-chart', true);
      } else {
        this.hideLoadingSpin();
        this.showChart();
        this.$emit('is-loading-chart', false);
      }
    }
  },
  mounted() {
    am5 = this.$am5.am5;
    am5xy = this.$am5.am5xy;
    am5exporting = this.$am5.am5exporting;

    this.drawChart();
  },
  methods: {
    generateChartImageBase64() {
      return this.exporting.export('png', {
        maxHeight: 400,
        minHeight: 400,
        maxWidth: 700,
        minWidth: 700,
        useLocale: true
      });
    },
    async drawChart() {
      if (this.chart) {
        this.chart.dispose();
      }

      this.root = am5.Root.new(`${this.id}_chart`);

      this.exporting = am5exporting.Exporting.new(this.root, {
        pngOptions: {
          maintainPixelRatio: true
        }
      });

      this.chart = this.root.container.children.push(
        am5xy.XYChart.new(this.root, {
          focusable: true,
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          background: am5.Rectangle.new(this.root, {
            fill: am5.Color.fromString("#ffffff"),
          }),
          paddingTop: 70
        })
      );

      this.addZoomCursor();
      this.addDateAxis();
      this.createELOAxis();
      this.createRankAxis();
      this.addLabels();
      this.addLegends();

      this.chart.appear(500, 500);
    },
    addZoomScrollBar() {
      this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
        orientation: "horizontal",
      }));
    },
    addZoomCursor() {
      let cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
        xAxis: this.dateAxis,
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);
    },
    addDateAxis() {
      this.dateAxis = this.chart.xAxes.push(
        am5xy.DateAxis.new(this.root, {
          tooltipDateFormat: "yyyy-MM-dd HH:mm",
          maxDeviation: 0.1,
          groupData: false,
          baseInterval: {
            timeUnit: "hour",
            count: 1
          },
          renderer: am5xy.AxisRendererX.new(this.root, {}),
          tooltip: am5.Tooltip.new(this.root, {})
        })
      );
      this.dateAxis.get("dateFormats")["month"] = "M月";
      this.dateAxis.get("dateFormats")["week"] = "MM-dd";
      this.dateAxis.get("dateFormats")["day"] = "MM-dd HH:mm";
      this.dateAxis.get("dateFormats")["hour"] = "HH:mm";
    },
    addLegends() {
      let legend = this.chart.children.push(am5.Legend.new(this.root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        centerX: am5.percent(100),
        x: am5.percent(95),
        y: am5.percent(0),
      }));

      legend.data.setAll([{
        name: "1v1ELO",
        color: am5.color("#ff0000")
      }, {
        name: "Rank",
        color: am5.color("#003af3")
      }]);
    },
    addLabels() {
      if (this.latestChartData) {
        let d = this.latestChartData;
        console.log(d);
        this.chart.children.unshift(am5.Label.new(this.root, {
          text: `ELO: ${d.elo}   GlobalRank: ${d.rank}   Win: ${d.winPercent}%`,
          fontSize: 18,
          textAlign: "center",
          x: am5.percent(50),
          centerX: am5.percent(50),
          y: am5.percent(-12),
        }));
      }

      this.chart.children.unshift(am5.Label.new(this.root, {
        text: this.user ? this.user.name : 'unknown player',
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(-25),
      }));
    },
    createELOAxis() {
      let yRenderer = am5xy.AxisRendererY.new(this.root, {
        opposite: false
      });
      let yAxis = this.chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          maxDeviation: 1,
          renderer: yRenderer
        })
      );

      if (this.chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", this.chart.yAxes.getIndex(0));
      }

      let tooltip = am5.Tooltip.new(this.root, {
        getFillFromSprite: false,
        pointerOrientation: "horizontal",
        labelText: "ELO: {elo}",
      });
      tooltip.get("background").setAll({
        fill: am5.color("#bd0000"),
        fillOpacity: 0.7
      });

      let series = this.chart.series.push(
        am5xy.LineSeries.new(this.root, {
          xAxis: this.dateAxis,
          yAxis: yAxis,
          valueYField: "elo",
          valueXField: "modifiedCreatedAt",
          tooltip: tooltip,
          stroke: am5.color("#ff0000"),
        })
      );

      series.strokes.template.setAll({strokeWidth: 1});
      series.set("fill", am5.color("#ff0000"));
      series.strokes.template.setAll({
        strokeWidth: 2,
      });

      yRenderer.grid.template.set("strokeOpacity", 0.05);
      yRenderer.labels.template.set("fill", series.get("fill"));
      yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
      });

      series.data.processor = am5.DataProcessor.new(this.root, {
        dateFormat: "yyyy-MM-dd HH:mm:SS",
        dateFields: ["modifiedCreatedAt"]
      });

      series.data.setAll(this.chartData);
    },
    createRankAxis() {
      let yRenderer = am5xy.AxisRendererY.new(this.root, {
        opposite: true,
        inversed: true,
      });

      let yAxis = this.chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          min: 1,
          maxDeviation: 1,
          renderer: yRenderer
        })
      );

      if (this.chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", this.chart.yAxes.getIndex(0));
      }

      let tooltip = am5.Tooltip.new(this.root, {
        getFillFromSprite: false,
        pointerOrientation: "horizontal",
        labelText: "Rank: {rank}",
      });

      tooltip.get("background").setAll({
        fill: am5.color("#003af3"),
        fillOpacity: 0.7
      });

      let series = this.chart.series.push(
        am5xy.LineSeries.new(this.root, {
          xAxis: this.dateAxis,
          yAxis: yAxis,
          valueYField: "rank",
          valueXField: "modifiedCreatedAt",
          tooltip: tooltip,
          stroke: am5.color("#003af3"),
        })
      );

      series.strokes.template.setAll({strokeWidth: 1});
      series.set("fill", am5.color("#003af3"));
      series.strokes.template.setAll({
        strokeWidth: 2,
      });

      yRenderer.grid.template.set("strokeOpacity", 0.05);
      yRenderer.labels.template.set("fill", series.get("fill"));
      yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
      });

      series.data.processor = am5.DataProcessor.new(this.root, {
        dateFormat: "yyyy-MM-dd HH:mm:SS",
        dateFields: ["modifiedCreatedAt"]
      });

      series.data.setAll(this.chartData);
    },

    hideChart() {
      let chartDiv = this.$refs.chartdiv;
      chartDiv.style.display = "none";
    },
    showChart() {
      let chartDiv = this.$refs.chartdiv;
      chartDiv.style.display = "block";
    },
    hideLoadingSpin() {
      let loadingSpinImg = this.$refs.loadingSpin;
      loadingSpinImg.style.display = "none";
    },
    showLoadingSpin() {
      let loadingSpinImg = this.$refs.loadingSpin;
      loadingSpinImg.style.display = "block";
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  height: 400px;
  padding-bottom: 2rem;
}

.parent-div {
  position: relative;
  min-height: 400px;
}

.loading-spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>
