import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DragService } from "../../drag.service";

@Component({
  selector: "app-prop",
  templateUrl: "./prop.component.html",
  styleUrls: ["./prop.component.css"],
})
export class PropComponent implements OnInit {
  _propData;
  data;
  x;
  y;
  propForm: FormGroup;
  commonForm: FormGroup;
  constructor(private dragService: DragService, private fb: FormBuilder) {
    this.propForm = this.fb.group({});

    this.dragService.getDragData().subscribe((res) => {
      console.log(res, 12);
      this._propData = res;

      if (res != null) {
        this.data = {};
        const item = res.data;
        for (const key in item.data) {
          if (key !== "component" && typeof item.data[key] !== "function") {
            this.data[key] = item.data[key];
            this.propForm.addControl(key, new FormControl(item.data[key]));
          }
        }
        this.x = item.x;
        this.y = item.y;
        console.log(this.data);
      }
    });
  }
  submitForm() {
    this._propData.data.data = Object.assign(
      this._propData.data.data,
      this.propForm.value
    );
    this._propData.data.x = this.x;
    this._propData.data.y = this.y;
    console.log(this._propData);
    this.dragService.setDragData(this._propData);
    return;
  }
  ngOnInit(): void {
    this.commonForm = this.fb.group({ x: [""], y: [""] });
  }
}
