import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFileComponent } from './client-file/client-file.component';

const routes: Routes = [
  {path: 'client-file', component: ClientFileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
