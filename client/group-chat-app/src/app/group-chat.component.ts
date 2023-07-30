import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { WebsocketService } from "./services/ws.service";
import { NgFor } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Message } from "./models/app.model";
import { SubSink } from "subsink";

@Component({
  selector: "app-group-chat",
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  template: `
    <h1>Group Chat</h1>
    <ul>
      <li *ngFor="let message of messages">{{ message.sender}}: {{ message.content }}</li>
    </ul>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input placeholder="Name" type="text" formControlName="name">
      <input placeholder="Message" type="text" formControlName="content">
      <button [disabled]="!form.valid" type="submit">Send</button>
    </form>
  `,
  styles: [``]
})
export class GroupChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    content: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  })
  subs = new SubSink();

  wsService = inject(WebsocketService);

  ngOnInit(): void {
    this.subs.sink = this.wsService.connect().subscribe(msg => {
      this.messages = [...this.messages, msg];
    });
  }

  onSubmit() {
    const sender = this.form.value.name ?? '';
    const content = this.form.value.content ?? '';
    const newMessage = new Message(content, true, sender);
    this.wsService.send(newMessage);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}