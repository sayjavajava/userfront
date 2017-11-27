import { NgModule } from '@angular/core';
import{CreateComponent} from './create/create.component';

import{ListComponent} from './list/list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

{path:'user',component: ListComponent},
{path:'user/create',component: CreateComponent},

{path:'user/edit:id',component: CreateComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
