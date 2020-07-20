import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpformComponent } from './empform/empform.component';
import { EmplistComponent } from './emplist/emplist.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'emp/:id', component: EmpformComponent },
  { path: 'allemp', component: EmplistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
