import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { WebsocketService } from "./ws.service";

@Component({
  selector: "app-group-chat",
  standalone: true,
  imports: [],
  template: `
    <h1>Group Chat Works!</h1>
  `,
  styles: [``]
})
export class GroupChatComponent implements OnInit, OnDestroy {
  wsService = inject(WebsocketService);

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}