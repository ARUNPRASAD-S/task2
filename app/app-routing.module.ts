import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSheetComponent } from './data-sheet/data-sheet.component';
import { AppComponent } from './app.component';
import { FirstFormComponent } from './first-form/first-form.component';


const routes: Routes = [
  {path:"app",
  component:AppComponent},
  {path:"FirstForm",
 component:FirstFormComponent},
 {path:"FirstForm/DataSheet",
 component: DataSheetComponent},
 {
  path:"",redirectTo:"FirstForm/DataSheet",pathMatch:'full'
}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
