import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../computer.service';
import {ActivatedRoute} from '@angular/router';
import {Computer} from '../computer.model';

@Component({
  selector: 'cdb-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {

  private _computer: Computer;

  constructor(private computerService: ComputerService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.computerService.getById(this.route.snapshot.paramMap.get('id')).subscribe(computer => this._computer = computer);
  }

  get computer(): Computer {
    return this._computer;
  }

}
