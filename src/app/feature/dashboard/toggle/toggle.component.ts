import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  toggleForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.toggleForm = this.fb.group({
      subscribeAngular: [],
      disabledToggleTrue: [{disabled: true, value: 'true'}],
      disabledToggle: [{disabled: true, value: ''}],
      colorAccent: [],
      colorWarn: [],
    });
  }

}
