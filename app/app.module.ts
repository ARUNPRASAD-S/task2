import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';
import { DataSheetComponent } from './data-sheet/data-sheet.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { UpdateformComponent } from './updateform/updateform.component';
@NgModule({
  declarations: [
    AppComponent,
    DataSheetComponent,
    FirstFormComponent,
    UpdateformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }