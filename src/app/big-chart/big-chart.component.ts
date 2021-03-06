import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";
import * as echarts from "echarts";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { UrlResolver } from "@angular/compiler";
import "echarts-gl";
@Component({
  selector: "app-big-chart",
  templateUrl: "./big-chart.component.html",
  styleUrls: ["./big-chart.component.css"],
})
export class BigChartComponent implements OnInit {
  chartInstance: any;
  options: any;
  series = [];
  iframesUrl: SafeResourceUrl;
  initOpts = {
    width: 900,
    height: 900,
  };
  chartName = "china";
  allJson: any = [];
  toCoord = [113.280637, 23.125178];
  chinaDatas = [
    [
      {
        name: "吉林省",
        value: [125.3245, 43.886841],
        ed: 0, // 用于区分版块颜色
      },
    ],
    [
      {
        name: "陕西省",
        value: [108.948024, 34.263161],
        ed: 0,
      },
    ],
    [
      {
        name: "山东省",
        value: [117.000923, 36.675807],
        ed: 0,
      },
    ],
    [
      {
        name: "重庆市",
        value: [106.504962, 29.533155],
        ed: 0,
      },
    ],
    [
      {
        name: "江苏省",
        value: [118.767413, 32.041544],
        ed: 0,
      },
    ],
    [
      {
        name: "北京市",
        value: [116.405285, 39.904989],
        ed: 1,
      },
    ],
    [
      {
        name: "福建省",
        value: [119.306239, 26.075302],
        ed: 1,
      },
    ],
    [
      {
        name: "上海市",
        value: [121.472644, 31.231706],
        ed: 1,
      },
    ],
    [
      {
        name: "浙江省",
        value: [120.153576, 30.287459],
        ed: 0,
      },
    ],
    [
      {
        name: "广东省",
        value: [113.280637, 23.125178],
        ed: 10,
      },
    ],
  ];
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  onChartInit(e) {
    this.chartInstance = e;
    const that = this;
    this.chartInstance.on("click", function (params) {
      console.log(params.name);
      if (params.componentType === "title") {
        that.back();
        return false;
      }
      const encode = that.allJson.find((o) => {
        return o.name === params.name;
      });
      that.chinaDatas = [
        [
          {
            name: "济南",
            value: [117.000923, 36.675807],
            ed: 0,
          },
        ],
      ];
      that.chartName = params.name;
      that.registermap(params.name, encode.adcode);
    });
  }

  back() {
    this.chartName = "china";
    this.chinaDatas = [
      [
        {
          name: "吉林省",
          value: [125.3245, 43.886841],
          ed: 0, // 用于区分版块颜色
        },
      ],
      [
        {
          name: "陕西省",
          value: [108.948024, 34.263161],
          ed: 0,
        },
      ],
      [
        {
          name: "山东省",
          value: [117.000923, 36.675807],
          ed: 0,
        },
      ],
      [
        {
          name: "重庆市",
          value: [106.504962, 29.533155],
          ed: 0,
        },
      ],
      [
        {
          name: "江苏省",
          value: [118.767413, 32.041544],
          ed: 0,
        },
      ],
      [
        {
          name: "北京市",
          value: [116.405285, 39.904989],
          ed: 1,
        },
      ],
      [
        {
          name: "福建省",
          value: [119.306239, 26.075302],
          ed: 1,
        },
      ],
      [
        {
          name: "上海市",
          value: [121.472644, 31.231706],
          ed: 1,
        },
      ],
      [
        {
          name: "浙江省",
          value: [120.153576, 30.287459],
          ed: 0,
        },
      ],
      [
        {
          name: "广东省",
          value: [113.280637, 23.125178],
          ed: 10,
        },
      ],
    ];
    this.registermap("china", "");
  }

  loadAll() {
    this.http.get("/assets/all.json").subscribe((data) => {
      this.allJson = data;
    });
  }
  convertData(data) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = dataItem[0].value;
      const toCoord = [113.280637, 23.125178];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: "广东省",
          coords: [fromCoord, this.toCoord],
        });
      }
      this.toCoord = dataItem[0].value;
    }

    return res;
  }

  registermap(name, encode = "") {
    let url = "/assets/world.json";
    const headers = new HttpHeaders();
    if (encode !== "") {
      url = "/assets/shandong1.json";
    }
    console.log(encode);

    this.http.get(url).subscribe((data) => {
      console.log(data);
      echarts.registerMap(name, data);

      this.loadOption();
    });
  }

  loadSeries() {
    this.series = [
      {
        name: " Top10",
        type: "lines",
        zlevel: 3,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          symbol: "arrow",
          color: "#ff2345",
          symbolSize: 3,
        },
        lineStyle: {
          normal: {
            color: "#a6c84c",
            width: 0,
            curveness: 0.2,
          },
        },
        data: this.convertData(this.chinaDatas),
      },
      {
        name: " Top10",
        type: "map",
        // map: "china",
        geoIndex: 0, // 从0开始，不设置的话需要放开上面的map指定地图，会生成2个地图
        zoom: 1.3,
        roam: true,
        top: 50,
        bottom: 16,
        // center: [106.948024, 32.563161],
        zlevel: 1,
        itemStyle: {
          normal: {
            show: false,
          },
        },
        label: {
          show: true,
        },
        // data: [{ name: '北京市', value: 0.3 }],
        data: this.chinaDatas.map(function (dataItem) {
          // data:{name:'北京市',value:0}
          return {
            name: dataItem[0].name,
            value: dataItem[0].ed,
          };
        }),
      },

      {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 3,
        mapType: this.chartName,
        rippleEffect: {
          // 涟漪特效
          period: 4, // 动画时间，值越小速度越快
          brushType: "stroke", // 波纹绘制方式 stroke, fill
          scale: 7, // 波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: "right", // 显示位置
            offset: [5, 0], // 偏移设置
            formatter(params) {
              // 圆环显示文字
              return params.data.name;
            },
            fontSize: 13,
            color: "#fff",
          },
          emphasis: {
            show: true,
          },
        },
        symbol: "circle",
        symbolSize(val) {
          return 5 + val[2] * 5; // 圆环大小
        },
        showEffectOn: "render",
        itemStyle: {
          normal: {
            show: false,
            color: "#ff2345",
            shadowBlur: 0,
            shadowColor: "#ff2345",
          },
        },
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", // 箭头图标
          symbolSize: 5, // 图标大小
        },
        lineStyle: {
          normal: {
            width: 1, // 尾迹线条宽度
            opacity: 1, // 尾迹线条透明度
            curveness: 0.3, // 尾迹线条曲直度,
            color: "#ff2345",
          },
        },
        data: this.chinaDatas.map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: dataItem[0].value.concat(0.7),
          };
        }),
      },
    ];
  }

  loadOption() {
    this.loadSeries();
    this.options = {
      backgroundColor: "#0c1c30", // 图形容器背景色
      title: {
        text: this.chartName,
        triggerEvent: true,
      },
      geo3D: {
        map: this.chartName,
      },
      visualMap: {
        min: 0,
        max: 1,
        text: ["High", "Low"],
        realtime: false,
        calculable: true,

        inRange: {
          color: ["rgba(11,191,0,0.8)", "rgba(191,197,53,0.8)", "#FF2345"],
        },
      },
      // geo配置详解： https://echarts.baidu.com/option.html#geo
      geo:
        // 地理坐标系组件用于地图的绘制
        // 地图背景
        {
          map: this.chartName,
          label: {
            show: false,
            textStyle: {
              color: "#5FB5FF",
              fontSize: 12,
            },
          },
          roam: true,
          top: 50,
          bottom: 16,
          itemStyle: {
            areaColor: {
              // 版块颜色
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0,66,147,.8)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0,27,80,.8)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            borderColor: "#0087FF",
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              areaColor: "rgba(0,66,147,.8))",
            },
            label: {
              color: "#fff",
            },
          },
          zoom: 1.3,
          //   center: [106.948024, 32.563161],
        },

      // 地图坐标

      series: this.series,
    };
    if (this.chartInstance) {
      this.chartInstance.setOption(this.options);
    }
  }
  ngOnInit(): void {
    this.initOpts.width = window.innerWidth;
    this.initOpts.height = window.innerHeight;

    this.registermap(this.chartName);
    this.loadAll();
  }
}
