import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DragService } from "../../drag.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
  _eventData;
  data;
  x;
  y;
  eventForm: FormGroup;
  commonForm: FormGroup;
  constructor(private dragService: DragService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({});

    this.dragService.getDragData().subscribe((res) => {
      this._eventData = res;
      if (res != null) {
        this.data = {};
        const item = res.data;
        for (const key in item.data) {
          if (key !== "component" && typeof item.data[key] === "function") {
            this.data[key] = item.data[key];
            this.eventForm.addControl(
              key,
              new FormControl(`${item.data[key]}`)
            );
          }
        }
      }
    });
  }
  submitForm() {
    for (const key in this.eventForm.value) {
      this._eventData.data.data[key] = new Function(
        "return " + this.eventForm.value[key]
      );
    }
    // this._eventData.data.data = Object.assign(
    //   this._eventData.data.data,
    //   this.eventForm.value
    // );
    console.log(this._eventData);
    this.dragService.setDragData(this._eventData);
    return;
  }
  ngOnInit(): void {}
}
