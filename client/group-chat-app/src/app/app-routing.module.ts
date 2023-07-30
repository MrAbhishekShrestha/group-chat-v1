import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupChatComponent } from './group-chat.component';
import { ErrorPageComponent } from './error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'group-chat', pathMatch: 'full' },
  { path: "group-chat", component: GroupChatComponent },
  {
    path: "**", component: ErrorPageComponent, data: {
      errorCode: 404, message: "Page not found"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
