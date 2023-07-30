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
    <p>*This group chat is non persistent!</p>
    <br>
    <ul class="list-group">
      <li *ngFor="let message of messages" class="list-group-item">
        <span class="sender">{{ message.sender}}</span>: {{ message.content }}
      </li>
    </ul>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-row chat-ui">
        <div class="col">
          <div class="form-group col-md-2">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" class="form-control" formControlName="name" required>
          </div>
        </div>
        <div class="col">
          <div class="form-group col-md-3">
            <label for="message">Message</label>
            <input type="text" id="message" name="message" class="form-control" formControlName="content" required>
          </div>
        </div>
        <div class="form-group col-sm-1 send-btn">
          <button [disabled]="!form.valid" type="submit" class="btn btn-primary">Send</button>
        </div>
      </div>
    </form>
  `,
  styles: [`
    .send-btn {
      margin-top: 25px;
    }

    .sender {
      color: blue;
    }

    /* .chat-ui {
      position: absolute;
      bottom: 0;
    } */
  `]
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