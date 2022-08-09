import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee-Form';
  constructor(private router:Router){
    this.router.navigate(['/FirstForm']);
  
  }
  ngOnInit(): void{

  }
}
