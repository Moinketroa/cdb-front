import {Component, Input, OnInit} from '@angular/core';
import {Computer} from '../computer.model';

@Component({
  selector: 'cdb-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.css']
})
export class ComputerDetailComponent implements OnInit {

  private _computer: Computer;

  @Input()
  set computer(computer: any) {
    this._computer = new Computer(computer);
  }

  get computer(): any {
    return this._computer;
  }

  constructor() { }

  ngOnInit() {
  }
}
