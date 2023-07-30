import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, NgFor],
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
            <span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
          </button>
          <a [routerLink]="['/group-chat']" class="navbar-brand">Group Chat App</a>
        </div>
        <div class="navbar-collapse" [class.collapse]="collapsed" (window:resize)="collapsed=true">
          <ul class="nav navbar-nav">
            <li routerLinkActive="active"><a [routerLink]="['/group-chat']">Group Chat</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    a { 
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {
  collapsed = true;
}