(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{616:function(t,e,r){var content=r(665);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(40).default)("33ec3463",content,!0,{sourceMap:!1})},664:function(t,e,r){"use strict";r(616)},665:function(t,e,r){var o=r(39)(!1);o.push([t.i,".elo-chart-card[data-v-a5c268c6]{max-width:800px;margin:auto!important}.disable-link-style[data-v-a5c268c6]{text-decoration:none!important}",""]),t.exports=o},679:function(t,e,r){"use strict";r.r(e);var o={components:{EloChartCard:r(618).default},data:function(){return{chartNum:1}},head:function(){var t=this.$route.query.user_id,e=t?"https://www.aoe4stats.net/api/ogp_img/".concat(t):"https://www.aoe4stats.net/aoe4_stats_logo.png";return{meta:[{hid:"og:title",property:"og:title",content:"AoEIV Stats"},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"},{hid:"twitter:site",name:"twitter:site",content:"@yukapero_com"},{hid:"twitter:image",name:"twitter:image",content:e},{hid:"og:type",property:"og:type",content:"website"},{hid:"og:url",property:"og:url",content:"https://www.aoe4stats.net/"},{hid:"og:image",property:"og:image",content:e},{hid:"og:site_name",name:"og:site_name",content:"AoEIV Stats"}]}},methods:{onClickedAddChart:function(){this.chartNum++}}},n=(r(664),r(128)),c=r(164),l=r.n(c),d=r(232),h=r(672),m=r(231),w=r(673),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{md:"10",sm:"12"}},[t._l(t.chartNum,(function(t){return r("div",{key:t,staticClass:"mb-3"},[r("EloChartCard",{staticClass:"elo-chart-card",attrs:{"chart-id":t}})],1)})),t._v(" "),r("v-row",[r("v-col",{staticClass:"text-center"},[r("v-btn",{attrs:{color:"success"},on:{click:function(e){return e.preventDefault(),t.onClickedAddChart.apply(null,arguments)}}},[r("v-icon",{attrs:{left:""}},[t._v("\n            mdi-plus\n          ")]),t._v("\n          Add Chart\n        ")],1)],1)],1),t._v(" "),r("v-row",{staticClass:"mt-16 text-right",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12"}},[r("a",{staticClass:"disable-link-style",attrs:{href:"https://twitter.com/yukapero_com",target:"_blank"}},[r("v-icon",{staticStyle:{color:"#6262ff"},attrs:{right:""}},[t._v("\n            mdi-twitter\n          ")]),t._v("\n          @yukapero_com\n        ")],1)]),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-icon",{attrs:{right:""}},[t._v("\n          mdi-discord\n        ")]),t._v("\n        Dyukusi#5800\n      ")],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("div",[t._v("Icons made by "),r("a",{attrs:{href:"https://www.flaticon.com/authors/gregor-cresnar",title:"Gregor Cresnar"}},[t._v("Gregor\n          Cresnar")]),t._v(" from "),r("a",{attrs:{href:"https://www.flaticon.com/",title:"Flaticon"}},[t._v("www.flaticon.com")])])])],1)],2)],1)}),[],!1,null,"a5c268c6",null);e.default=component.exports;l()(component,{EloChartCard:r(618).default}),l()(component,{VBtn:d.a,VCol:h.a,VIcon:m.a,VRow:w.a})}}]);