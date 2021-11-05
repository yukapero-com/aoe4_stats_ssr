import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5exporting from "@amcharts/amcharts5/plugins/exporting";
import Vue from "vue";
Vue.prototype.$am5 = {
  am5,
  am5xy,
  am5exporting,
};
