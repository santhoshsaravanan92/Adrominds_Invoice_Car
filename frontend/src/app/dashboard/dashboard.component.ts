import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  personalinformationForm: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.personalinformationForm = this.formBuilder.group({});
  }

  get getFormControls() {
    return this.personalinformationForm.controls;
  }

  personalInfoFormSubmit() {}
}
