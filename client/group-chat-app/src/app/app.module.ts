import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@Angular/common/http';
import { HeaderComponent } from './header.component';
import { GroupChatComponent } from './group-chat.component';
import { ErrorPageComponent } from './error-page.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HeaderComponent,
    GroupChatComponent,
    ErrorPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
