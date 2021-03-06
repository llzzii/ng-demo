import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import * as d3 from "d3";
import * as graphlib from "graphlib";
import dagreD3 from "dagre-d3";
import { fromEvent } from "rxjs";

@Component({
  selector: "app-topu",
  templateUrl: "./topu.component.html",
  styleUrls: ["./topu.component.css"],
})
export class TopuComponent implements OnInit, AfterViewInit {
  @ViewChild("drawerTemplate", { static: true }) drawerTemplate;
  g = new graphlib.Graph({ compound: true })
    .setGraph({})
    .setDefaultEdgeLabel(function () {
      return {};
    });
  width: number;
  height: number;
  nodeList = [
    {id: 'a', type: 'gateway', status: 'normal', label: 'a'},
    {id: 'b', type: 'app', status: 'normal', label: '应用实例b'},
    {id: 'c', type: 'app', status: 'normal', label: '应用实例c'},
    {id: 'd', type: 'app', status: 'normal', label: '应用实例d'},
    {id: 'e', type: 'service', parent: 'b', status: 'warning', label: '服务e'},
    {id: 'f', type: 'workload', parent: 'b', status: 'error', label: 'f', time: '22ms'},
    {id: 'g', type: 'workload', parent: 'b', status: 'normal', label: 'g', time: '22ms'},
    {id: 'w', type: 'workload', parent: 'b', status: 'warning', label: 'w', time: '22ms'},
    {id: 'o', type: 'workload', parent: 'b', status: 'normal', label: 'f', time: '22ms'},
    {id: 'p', type: 'workload', parent: 'b', status: 'error', label: 'g', time: '22ms'},
    {id: 'q', type: 'workload', parent: 'b', status: 'normal', label: 'w', time: '22ms'},
    {id: 'h', type: 'service', parent: 'c', status: 'normal', label: '服务h'},
    {id: 'i', type: 'workload', parent: 'c', status: 'normal', label: 'i', time: '22ms'},
    {id: 'j', type: 'service', parent: 'd', status: 'normal', label: '服务j'},
    {id: 'k', type: 'workload', parent: 'd', status: 'normal', label: 'k', time: '22ms'},
    {id: 'l', type: 'gateway', label: 'l'},
    {id: 'n', type: 'gateway', label: 'n'}
  ];
  linkList = [
    {sourceId: 'a', targetId: 'e', label: 3.45},
    {sourceId: 'e', targetId: 'f', label: 2.12},
    {sourceId: 'e', targetId: 'g', label: 2.12},
    {sourceId: 'e', targetId: 'o', label: 2.12},
    {sourceId: 'e', targetId: 'p', label: 2.12},
    {sourceId: 'e', targetId: 'q', label: 2.12},
    {sourceId: 'e', targetId: 'w', label: 2.12},
    {sourceId: 'i', targetId: 'j', label: 2.12},
    {sourceId: 'f', targetId: 'h', label: 2.35},
    {sourceId: 'h', targetId: 'i', label: 3.34},
    {sourceId: 'g', targetId: 'j', label: 3.45},
    {sourceId: 'j', targetId: 'k', label: 3.45},
    {sourceId: 'l', targetId: 'f', label: 3.45},
    {sourceId: 'n', targetId: 'g', label: 3.45}
  ];
  svg;
  inner;
  zoom;
  constructor() {}
  /**
   * 画图函数，增加图配置项，添加节点、连线
   * @param g 图
   */
  draw(g) {
    const THIS = this;
    g.graph().rankDir = "LR";
    g.graph().nodesep = 20;
    g.graph().ranker = "tight-tree";
    this.addNode(g, this.nodeList);
    this.addEdge(g, this.linkList);
    let i = 0;
    g.nodes().forEach(function (v) {
      const node = g.node(v);
      if (THIS.nodeList[i].status === "warning") {
        node.fill = "#fbf8e6";
        node.stroke = "#f6e3c4";
      } else if (THIS.nodeList[i].status === "error") {
        node.fill = "#fcf7f4";
        node.stroke = "#fbefea";
      }
    });
    this.svg = d3.select("svg g");
    this.inner = d3.select("g");
    this.zoom = d3.zoom().on("zoom", function () {
      THIS.inner.select("g").attr("transform", d3.event.transform);
    });
    this.svg.call(this.zoom);
    // 创建renderer
    const render = new dagreD3.render();
    // 执行renderer,渲染最终的图
    render(this.inner, this.g);
  }

  addNode(g, nodeList) {
       if (nodeList && nodeList.length > 0) {
           for(let i in nodeList){
               switch (nodeList[i].type) {
                   case "gateway":
                      let label= this.createLabel(nodeList[i].label)
                      let title=this.createText('50%', '85%', '#36b3df', '12px',label);
                      let gatewayTitle = this.createText('50%', '40%', '#5a5a5a', '14px', '服务网关');
                          gatewayTitle.setAttribute('text-anchor', 'middle');
                          gatewayTitle.setAttribute('font-size', '14px');
                          let gatewayText = this.createText('50%', '85%', '#36b3df', '12px', nodeList[i].label);
                          gatewayText.setAttribute('text-anchor', 'middle');
                          label.appendChild(gatewayTitle);
                          label.appendChild(gatewayText);
                          g.setNode(nodeList[i].id, {labelType: 'svg', label: label, class: nodeList[i].type + ' ' + nodeList[i].status, style: 'width:120px;height:55px;rx: 15;ry: 15;'});

                       break;
                   case 'app':
                         g.setNode(nodeList[i].id, {label: nodeList[i].label, clusterLabelPos: 'top', class: nodeList[i].status});
                       break;
                   default:
                   this.defaultCreate(g,nodeList[i])
                       break;
               }
           }
       }
  }

defaultCreate(g,node){
  let svg_label = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg_label.setAttribute('width', '130px');
            svg_label.setAttribute('height', '140px');
            let title = this.createText('50%', '13%', '#fff', '14px', '工作负载' + node.label);
            title.setAttribute('text-anchor', 'middle');
            let rect;
            switch (node.status) {
              case 'warning':
                rect = this.createRect('130px', '25px', '#fdb55c', '0', '0');
                break;
              case 'error':
                rect = this.createRect('130px', '25px', '#eb6c64', '0', '0');
                break;
              default:
                rect = this.createRect('130px', '25px', '#36b3df', '0', '0');
                break;
            }
            let icon1Path = this.createPath('M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z');
            let icon2Path = this.createPath('M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z');
            let icon3Path1 = this.createPath('M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z');
            let icon3Path2 = this.createPath('M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z');
            let icon1 = this.createIcon('10%', '28%');
            let icon2 = this.createIcon('10%', '43%');
            let icon3 = this.createIcon('10%', '58%');
            icon1.appendChild(icon1Path);
            icon2.appendChild(icon2Path);
            icon3.appendChild(icon3Path1);
            icon3.appendChild(icon3Path2);
            let text1 = this.createText('25%', '33%', '#5a5a5a', '12px', node.type);
            let text2 = this.createText('25%', '48%', '#5a5a5a', '12px', node.type);
            let text3 = this.createText('25%', '63%', '#5a5a5a', '12px', node.type);
            let rect2 = this.createRect('40%', '20px', '#bec0c3', '10%', '73%');
            let rect3 = this.createRect('40%', '20px', '#fff', '50%', '73%');
            let text4 = this.createText('15%', '83%', '#fff', '12px', 'version');
            let text5 = this.createText('55%', '83%', '#5a5a5a', '12px', '2/2');
            svg_label.appendChild(title);
            svg_label.appendChild(text1);
            svg_label.appendChild(text2);
            svg_label.appendChild(text3);
            svg_label.appendChild(text4);
            svg_label.appendChild(text5);
            svg_label.insertBefore(rect, title);
            svg_label.insertBefore(icon1, text1);
            svg_label.insertBefore(icon2, text2);
            svg_label.insertBefore(icon3, text3);
            svg_label.insertBefore(rect2, text4);
            svg_label.insertBefore(rect3, text5);
            g.setNode(node.id, {labelType: 'svg', label: svg_label, class: node.status, style: 'width:130px;height:140px', paddingX: 0, paddingY: 0});
            g.setParent(node.id, node.parent);
}

  createLabel(label){
      let labelTem=document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      labelTem.setAttribute("width","100px")
      labelTem.setAttribute("height","35px")
      return labelTem
  }
  addEdge(g, edgeList) {
    for (let i in edgeList) {
         let edgeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      edgeLabel.setAttribute('width', '50px');
      edgeLabel.setAttribute('height', '20px');
      let edgeText = this.createText('50%', '45%', '#5a5a5a', '12px', edgeList[i].label + 'RPS' );
      edgeText.setAttribute('text-anchor', 'middle');
      let edgeFill = this.createRect('50px', '20px', 'currentColor', 0, 0);
      edgeFill.setAttribute('fill-opacity', '0');
      edgeLabel.appendChild(edgeText);
      edgeLabel.insertBefore(edgeFill, edgeText);
      g.setEdge(edgeList[i].sourceId, edgeList[i].targetId, {curve: d3.curveBasis, labelType: 'svg', label: edgeLabel});
    
    }
  }
  /**
   * 绘制 svg rect
   * @param width rect宽度
   * @param height rect高度
   * @param fill rect填充色
   * @param x rect水平位置
   * @param y rect垂直位置
   */
  createRect(width, height, fill, x, y): any {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', fill);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    return rect;
  }

  /**
   * 绘制 svg path
   * @param path path数据
   */
  createPath(path): any {
    let iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', path);
    return iconPath;
  }

  /**
   * 绘制 svg icon
   * @param x 水平位置
   * @param y 垂直位置
   */
  createIcon(x, y): any {
    let icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '64 64 896 896');
    icon.setAttribute('fill', 'currentColor');
    icon.setAttribute('width', '1em');
    icon.setAttribute('height', '1em');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('x', x);
    icon.setAttribute('y', y);
    return icon;
  }

  createText(x,y,color,size,value){
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', color);
    text.setAttribute('font-size', size);
    text.setAttribute('font-weight', '600');
    text.textContent = value;
    return text;
  }

  ngOnInit(): void {
    this.width = window.innerWidth ;
    this.height = window.innerHeight ;
    fromEvent(window, "resize").subscribe((event) => {
      const tempHeight = window.innerHeight;
      this.height = tempHeight > this.height ? tempHeight : this.height;
    });
    this.draw(this.g);
  }
  ngAfterViewInit() {}
}
