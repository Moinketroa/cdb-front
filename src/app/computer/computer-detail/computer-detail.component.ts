import {Component, Input, OnInit} from '@angular/core';
import {Computer} from '../computer.model';

@Component({
  selector: 'cdb-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.css']
})
export class ComputerDetailComponent implements OnInit {

  @Input() computer: Computer;
  constructor() { }

  ngOnInit() {
  }
}
