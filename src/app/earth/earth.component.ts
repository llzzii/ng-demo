import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as echarts from "echarts";
import "echarts-gl";
@Component({
  selector: "app-earth",
  templateUrl: "./earth.component.html",
  styleUrls: ["./earth.component.css"],
})
export class EarthComponent implements OnInit {
  @ViewChild("echart", { static: true }) echartTem: ElementRef;
  myEchart;
  constructor(private http: HttpClient) {}
  loadEh() {}

  registermap() {
    const url = "/assets/china.json";

    this.http.get(url).subscribe((data) => {
      console.log(data);
      echarts.registerMap("china", data);

      this.loadOption();
    });
  }
  loadOption() {
    let option = {
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(166, 200, 76, 0.82)",
        borderColor: "#FFFFCC",
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: "z-index:100",
        formatter: function (params, ticket, callback) {
          //根据业务自己拓展要显示的内容
          var res = "";
          var name = params.name;
          var value = params.value[params.seriesIndex + 1];
          res =
            "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
          return res;
        },
      },
      backgroundColor: "#013954",
      visualMap: {
        //图例值控制
        min: 0,
        max: 1,
        calculable: true,
        show: true,
        color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
        textStyle: {
          color: "#fff",
        },
      },
      geo: {
        map: "china",
        zoom: 1.2,
        label: {
          emphasis: {
            show: false,
          },
        },
        roam: true, //是否允许缩放
        itemStyle: {
          normal: {
            color: "rgba(51, 69, 89, .5)", //地图背景色
            borderColor: "#516a89", //省市边界线00fcff 516a89
            borderWidth: 1,
          },
          emphasis: {
            color: "rgba(37, 43, 61, .5)", //悬浮背景
          },
        },
      },
    };
    this.myEchart.setOption(option);
  }
  ngOnInit(): void {
    window.innerWidth;
    window.innerHeight;
    this.myEchart = echarts.init(this.echartTem.nativeElement, "", {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.registermap();
  }
}
