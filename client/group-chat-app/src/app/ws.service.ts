import { Injectable, OnDestroy } from "@angular/core";
import { WebSocketSubject, webSocket } from 'rxjs/webSocket'
import { Message } from "./app.model";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

/**
 * Reference: https://blog.briebug.com/blog/making-use-of-websockets-in-angular
 */
@Injectable({ providedIn: 'root' })
export class WebsocketService implements OnDestroy {
  connection$: WebSocketSubject<Message> | null;
  RETRY_SECONDS = 10;
  API_URL = "http://localhost:3000";

  connect(): Observable<Message> {
    return of(this.API_URL).pipe(
      map(url => url.replace(/^http/, 'ws')),
      switchMap(wsUrl => {
        if (!this.connection$) {
          this.connection$ = webSocket(wsUrl);
        }
        return this.connection$;
      }),
      catchError(error => {
        console.error(error);
        return of(error);
      })
    )
  }

  send(data: Message): void {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.error(`WS Connection not open`);
    }
  }

  closeConnection(): void {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }
}