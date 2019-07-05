import { Component, OnInit, ViewChild } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-clock-holder',
  templateUrl: './clock-holder.component.html',
  styleUrls: ['./clock-holder.component.css']
})
export class ClockHolderComponent implements OnInit {

  constructor() { }

  @ViewChild('clock') clock: ClockComponent;

  ngOnInit() {
  }

  updateButtonClick(event: Event) {
    this.clock.forceUpdate();
  }
}
