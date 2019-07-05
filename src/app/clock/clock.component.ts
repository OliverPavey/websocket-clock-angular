import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }

  clockText: String = '??:??.??';
  stompClient = null;

  ngOnInit() {
    console.log('connecting');
    // Connect to websocket '/websocket-clock' (on same server that delivered webpage)
    const socket = new SockJS('http://localhost:8080/websocket-clock');
    const appClock = this;
    appClock.stompClient = Stomp.over(socket);
    appClock.stompClient.connect({},
      function(frame: any) {
        // Subscribe to '/topic/clock' update broadcasts
        appClock.stompClient.subscribe('/topic/clock',
          function(message: { body: string; }) {
            appClock.updateClock(JSON.parse(message.body).time);
          });
        // Force immediate update on first connection
        appClock.forceUpdate();
      });
    console.log('connection done');
  }

  updateClock(time: String) {
    this.clockText = time;
  }

  forceUpdate() {
    this.stompClient.send('/app/clock', {}, JSON.stringify({}));
  }

}
