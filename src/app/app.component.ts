import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  DesktopMsg(option) {
    console.log(123);
    Notification.requestPermission().then(function (permission) {
      if (permission == "granted") {
        const notification = new Notification(option.title, option);

        notification.onclick = function () {
          console.log('点击');
          notification.close();
        };
      } else {
        Notification.requestPermission();
        console.log('没有权限,用户拒绝:Notification');
      }
    });
  }
  ngOnInit(): void {
    const that = this;

    setInterval(function () {
      const option = {
        title: '起来吧',
        body: '起来跳个舞吧',
        icon: '../assets/5.gif',
      };
      that.DesktopMsg(option);
    }, 600000);
  }
}
