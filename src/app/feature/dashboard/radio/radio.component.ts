import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  radioForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.radioForm = this.fb.group({
      angularMaterialLikeScore: [4]
    });
  }

}
