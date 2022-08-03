import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'templates';
@ViewChild('userform') uf!:NgForm
  State=[
    {"state":"TamilNadu"},
    {"state":"Karnataka"},
    {"state":"Kerala"},
    {"state":"Pudhucherry"},
    {"state":"AndhraPradesh"}
  ];
  Design=[
    {"designs":"Intern"},
    {"designs":"Technical Lead"},
    {"designs":"Technical Staff"},
    {"designs":"Associate Manager"},
    {"designs":"Manager"}
  ];
  ngOnInit(){
    this.fetchemployee();
  }
  onemployeefetch(){
    this.fetchemployee();
  }
  constructor(private http:HttpClient)
  {}
  onSubmit(users:{firstname:string,lastname:string,email:string,contactno:string,city:string}){
    console.log(users);
    const header=new HttpHeaders({'MyHeader':'Employee Database'})
    this.http.post('https://employee-database-21589-default-rtdb.firebaseio.com/users.json',users,
    {headers:header})
    .subscribe((res)=>{
      console.log(res);
    });
  }
  private fetchemployee()
  {
    this.http.get('https://employee-database-21589-default-rtdb.firebaseio.com/users.json')
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
