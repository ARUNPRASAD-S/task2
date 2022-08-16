import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Database } from './data-sheet/database';
import { Route, Router, } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Only-Brand-app';
  constructor(private router:Router){
    this.router.navigate(['/FirstForm']);
  
  }
  ngOnInit(): void{

  }
}
