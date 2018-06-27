import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Computer} from '../../computer/computer.model';

@Component({
  selector: 'cdb-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.scss']
})
export class ConfirmFormComponent implements OnInit {

  @Output()
  public cancelEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public submitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

  onSubmit(): void {
    this.submitEvent.emit(true);
  }

}
