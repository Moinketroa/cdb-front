import {Component, Input, OnInit} from '@angular/core';
import {Computer} from '../../computer/computer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'cdb-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.scss']
})
export class ComputerFormComponent implements OnInit {

  private _computer: Computer;
  private _form: FormGroup;
  private _maxLength = 250;
  private _title: string;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this._title = 'Add Computer';
    this._computer = new Computer();
    this.buildForm();
  }

  ngOnInit() {
  }

  @Input()
  set computer(computer: Computer) {
    this._computer = computer;
    this._title = 'Update Computer';
    this.buildForm();
  }

  get computer(): Computer {
    return this._computer;
  }

  get form(): FormGroup {
    return this._form;
  }

  get maxLength(): number {
    return this._maxLength;
  }

  get title(): string {
    return this._title;
  }

  buildForm() {
    this._form = this.formBuilder.group({
      name: [this._computer.name, Validators.required],
      introduced: [this._computer.introduced],
      discontinued: [this._computer.discontinued],
      company: [this._computer.company.id]
    });
  }

  onSubmit() {

  }

  onCancel() {

  }
}
