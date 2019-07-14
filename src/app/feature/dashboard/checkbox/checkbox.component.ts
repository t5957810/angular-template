import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  checkboxForm: FormGroup;
  selectedAll: boolean;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkboxForm = this.fb.group({
      mainQuestions: this.fb.group({
        payForAll: [false],
        payForBook: [false],
        payForMusic: [false],
        payForMovie: [true]
      })
    });
    this._setSelectAllState();
  }

  checkAllChange($event: MatCheckboxChange) {
    this.checkboxForm
      .get('mainQuestions')
      .get('payForBook')
      .setValue($event.checked);
    this.checkboxForm
      .get('mainQuestions')
      .get('payForMusic')
      .setValue($event.checked);
    this.checkboxForm
      .get('mainQuestions')
      .get('payForMovie')
      .setValue($event.checked);
    this._setSelectAllState();
  }
  payForChange() {
    this._setSelectAllState();
  }

  private _setSelectAllState() {
    const payForBook = this.checkboxForm.get('mainQuestions').get('payForBook').value;
    const payForMusic = this.checkboxForm.get('mainQuestions').get('payForMusic').value;
    const payForMovie = this.checkboxForm.get('mainQuestions').get('payForMovie').value;
    const count = (payForBook ? 1 : 0) + (payForMusic ? 1 : 0) + (payForMovie ? 1 : 0);
    this.checkboxForm.get('mainQuestions').get('payForAll').setValue(count === 3);
    this.selectedAll = count > 0 && count < 3;
  }
}
