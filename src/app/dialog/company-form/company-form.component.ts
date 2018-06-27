import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Computer} from '../../computer/computer.model';
import {Company} from '../../company/company.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material';

@Component({
  selector: 'cdb-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  @Output()
  public cancelEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public submitEvent: EventEmitter<Company> = new EventEmitter<Company>();

  private _company: Company;
  private _form: FormGroup;
  private _nameMaxLength = 250;
  private _descMaxLength = 1000;
  private _title: string;

  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private formBuilder: FormBuilder
  ) {
    this._title = 'COMPANY.ADD';
  }

  ngOnInit() {
  }

  @Input()
  set company(company: Company) {
    this._company = company;
    this.buildForm();
  }

  get company(): Company {
    return this._company;
  }

  get form(): FormGroup {
    return this._form;
  }

  get nameMaxLength(): number {
    return this._nameMaxLength;
  }

  get descMaxLength(): number {
    return this._descMaxLength;
  }

  get title(): string {
    return this._title;
  }

  buildForm(): void {
    this._form = this.formBuilder.group({
      id: [this._company.id],
      name: [this._company.name, [Validators.required, Validators.maxLength(this._nameMaxLength)]],
      description: [this._company.description, Validators.maxLength(this._descMaxLength)],
      image: [this._company.image, Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')]
    });
  }

  onSubmit(): void {
    console.log(this._form.value);
    this.submitEvent.emit(this._form.value);
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

}
