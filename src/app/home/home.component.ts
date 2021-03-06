import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, Title } from "@angular/platform-browser";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpClient,
} from "@angular/common/http";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  interpolation: ["((", "))"],
})
export class HomeComponent implements OnInit {
  @Input() model;
  @ViewChild("qrCodeUrl", { static: true }) qrCodeUrl;
  url;
  constructor(
    private title: Title,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  handle() {
    this.model++;
  }
  open() {
    this.http.get("http://127.0.0.1:3000/json").subscribe((res) => {
      console.log(res);
    });
  }
  open2() {
    const xx = window.open("https://10.220.248.62/apps/secvisual/index.html");
    console.log(xx);
    console.log(xx.document);
    xx.onload = function () {
      console.log(xx.document);
    };
  }
  ngOnInit() {
    this.title.setTitle("home");
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://10.220.248.62/apps/secvisual/login/login.html"
    );
  }
}
