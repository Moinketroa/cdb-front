import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Computer} from '../../computer/computer.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../../company/company.model';
import {CompanyService} from '../../company/company.service';
import {DateAdapter} from '@angular/material';

@Component({
  selector: 'cdb-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.scss']
})
export class ComputerFormComponent implements OnInit {

  @Output()
  public cancelEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public submitEvent: EventEmitter<Computer> = new EventEmitter<Computer>();

  private _computer: Computer;
  private _form: FormGroup;
  private _maxLength = 250;
  private _title: string;
  private _companies: Company[] = new Array();

  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {
    this.dateAdapter.setLocale('fr');
    companyService.get({page: 0, limit: 100}).subscribe(
      (page: any) => page.content.forEach(
        (company: any, index: number) => this._companies[index] = new Company(company)
      )
    );
  }

  ngOnInit() {
  }

  @Input()
  set computer(computer: Computer) {
    this._computer = computer;
    this._title = 'COMPUTER.ADD';
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

  get companies(): Company[] {
    return this._companies;
  }

  checkDates(formControl: FormControl) {
    const dataForm = formControl.parent;

    if (!dataForm || dataForm.get('discontinued').value === null) {
      return null;
    } else if (dataForm.get('introduced').value === null) {
      dataForm.controls['introduced'].setErrors({absent: true});
      return {
        introduced: {
          absent: true
        }
      };
    }

    const discontinuedForm = dataForm.get('discontinued');
    const discontinuedControl = dataForm.controls['discontinued'];
    const introducedDate = new Date(dataForm.get('introduced').value);
    const discontinuedDate = new Date(discontinuedForm.value);

    if (discontinuedDate < introducedDate) {
      discontinuedControl.setErrors({prior: true});

      if (discontinuedForm === formControl) {
        return {
          discontinued: {
            prior: true
          }
        };
      }
    } else {
      discontinuedControl.setErrors(null);
    }

    return null;
  }

  buildForm(): void {
    this._form = this.formBuilder.group({
      id: [this._computer.id],
      name: [this._computer.name, Validators.required],
      introduced: [this._computer.introduced, this.checkDates],
      discontinued: [this._computer.discontinued, this.checkDates],
      companyId: [this._computer.company.id]
    });
  }

  onSubmit(): void {
    const introDate: Date = this._form.get('introduced').value;
    const discoDate: Date = this._form.get('discontinued').value;

    if (introDate !== null && introDate.getHours() < 3) {
      introDate.setHours(3);
    }
    if (discoDate !== null && discoDate.getHours() < 3) {
      discoDate.setHours(3);
    }

    this._form.setValue({
      id: this._form.get('id').value,
      name: this._form.get('name').value,
      introduced: introDate,
      discontinued: discoDate,
      companyId: this._form.get('companyId').value
    });

    this.submitEvent.emit(this._form.value);
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

  private transformDate(date: Date): string {
    if (date == null) {
      return null;
    }

    return date.toISOString().substring(0, 10);
  }
}
