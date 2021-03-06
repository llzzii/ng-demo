import { HttpClient, HttpEventType, HttpRequest } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { map } from 'rxjs/operators';
@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"],
})
export class UploadFileComponent implements OnInit {
  value = 0;
  loading=false;
  constructor(public http: HttpClient) {}

  submit(e) {
    this.loading=false;
 
    const files = document.getElementById("file");
    const url = "http://localhost:6060/register";
    const file = files["files"][0];
    const formData = new FormData();
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      console.log(event);
      if (event.lengthComputable) {
        // 已上传
        // 该文件总共大小
        this.value = (event.loaded * 100) / event.total;
      }
    };
    xhr.addEventListener("load", (evt) => {
      // 上传文件post接口返回的数据
      console.log(evt);
    });
    xhr.addEventListener("error", (evt) => {
      console.log(evt);
    });
    xhr.open("POST", url);
    xhr.send(formData);
  }

  clickthis(){
    this.loading=true;
  }
  handleFileSelect() {
    this.value = 0;
    const files = document.getElementById("file");
    const url = "http://localhost:6060/register";
    const file = files["files"][0];
    const formData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest("Post", url, formData, {
      reportProgress: true,
    });
    this.http
      .request(req)
      .pipe(map((event) => this.getEventMessage(event, file)))
      .subscribe((r) => {});
  }
  private getEventMessage(event, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        break;
      case HttpEventType.UploadProgress:
        this.value = (event.loaded * 100) / event.total;
        break;
      default:
        console.log(event.type);
    }
  }
  ngOnInit(): void {}
}
