import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataformsComponent } from 'src/app/dataforms/dataforms.component';
import { AppComponent } from './app.component';
import { FormpageComponent } from './formpage/formpage.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:"app",
  component:AppComponent},
  {path:"formpage",
 component:FormpageComponent},
 {path:"formpage/dataforms",
 component: DataformsComponent},
 {path:"update",
component:UpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ 
}
