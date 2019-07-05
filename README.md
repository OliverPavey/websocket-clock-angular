# WebSocket Clock Angular Client README.md

WebSockets are a technology for pushing updates from a web server to clients.
The client does not need to periodically poll the server.

This project is a companion to the websocket-clock demo written in Java/SpringMVC (server) 
and JavaScript (client) which can be found here.

- [https://github.com/OliverPavey/websocket-clock](https://github.com/OliverPavey/websocket-clock)

This project is intended to demonstrate how a like client can be written using Angular.

## The Angular client

After creating the Angular project (using `ng init`) the project requires a number of
additional node modules need to be installed.

```shell
npm install bootstrap jquery popper.js stompjs sockjs-client stomp-websocket @types/stompjs @types/sockjs-client net
```

And the javascript libraries which are to be made available globally need to be added to angular.json.

```json
            "styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/popper.js/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js",
              "node_modules/sockjs-client/dist/sockjs.min.js",
              "node_modules/stomp-websocket/lib/stomp.min.js"
            ]
```

Because of an issue with the sockjs-client this code had to be added to `index.html` in the \<head> section.

```html
  <script type="application/javascript">
    var global = window;
  </script>
```

Two components `app-clock-holder` and `app-clock` are created (using `ng create`) and the contents of `app.component.html` replaced with `<app-clock-holder></app-clock-holder>`.

## The app-clock-holder component

This component contains a reference to the clock `<app-clock #clock></app-clock>` and a button to
trigger manual updates of the clock `<button (click)="updateButtonClick($event)" ...`.  The update
request is passed on to the `<app-clock>` component via the typescript code:

```typescript
  @ViewChild('clock') clock: ClockComponent;

  updateButtonClick(event: Event) {
    this.clock.forceUpdate();
  }
```

## The app-clock component

The `app-clock` component html is `<span>{{clockText}}</span>` which shows the contents of the
`clockText` field in the associated typescript code.

The code imports Stomp and SockJS.

```typescript
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
```

The `ngOnInit()` method runs when the component is loaded.  

- It connects the client to the server.
- In the call back for the connection it subsribes to an endpoint `/topic/clock`.
- In the call back for the endpoint it updates the clock (using `this.clockText = time`).

```typescript
  ngOnInit() {
    const socket = new SockJS('http://localhost:8080/websocket-clock');
    const appClock = this;
    appClock.stompClient = Stomp.over(socket);
    appClock.stompClient.connect({},
      function(frame: any) {
        appClock.stompClient.subscribe('/topic/clock',
          function(message: { body: string; }) {
            appClock.updateClock(JSON.parse(message.body).time);
          });
        ...
      });
  }
```

The code to request a manual update from the server is:

```typescript
this.stompClient.send('/app/clock', {}, JSON.stringify({}));
```

## Running the project

The project requires that `node`, `npm` and `angular` are installed, and that the associated server software is running on the localhost.  

After fetching the Angular client project run `ng install` and `ng serve` and browse to `http://localhost:4200`.

## See also

- The [README.md file for the websocket-clock project](https://github.com/OliverPavey/websocket-clock/blob/master/README.md) which includes the server.
