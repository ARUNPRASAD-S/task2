import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Database } from '../data-sheet/database';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})
export class UpdateformComponent implements OnInit {
  title = 'Employee-Form'; 
  isfetching:boolean=false;
  editmode:boolean=false;
 allEmployees:Database[]=[];
  submitted=false;
@ViewChild('userform') uf!:NgForm
  State=[
    {"state":"TamilNadu"},
    {"state":"Karnataka"},
    {"state":"Kerala"},
    {"state":"Pudhucherry"},
    {"state":"AndhraPradesh"},
    
  ];
  Design=[
    {"designs":"Intern"},
    {"designs":"Technical Lead"},
    {"designs":"Technical Staff"},
    {"designs":"Associate Manager"},
    {"designs":"Manager"},
    {"designs":"CEO/President"}
  ];
  ngOnInit(){
    this.fetchemployee();
  }
  onemployeefetch(){
    this.fetchemployee();
  }
  constructor(private http:HttpClient)
  {}
  onSubmit(users:{no:string,firstname:string,lastname:string,email:string,contactno:string,city:string}){
    this.submitted=true;
    console.log(users);
    this.http.post<{name:string}>('https://employeedata-5cf2c-default-rtdb.firebaseio.com/users.json',users)
    .subscribe((res)=>{
      console.log(res);
    });
  }
  private fetchemployee()
  {
    this.isfetching=true;
    this.http.get<{[key:string]:Database}>('https://employeedata-5cf2c-default-rtdb.firebaseio.com/users.json')
    .pipe(map((res)=>{
      const employees=[];
      for(const key in res){
        if(res.hasOwnProperty(key))
        {employees.push({...res[key],id:key})}
        
      }
return employees;
    }))    .subscribe((employees)=>{
      console.log(employees);
      this.allEmployees=employees;
      this.isfetching=false;
    });
  }
  ondelete(id:string){
    this.http.delete('https://employeedata-5cf2c-default-rtdb.firebaseio.com/users/'+id+'.json')
    .subscribe();
  }
  ondeleteall(){
    this.http.delete('https://employeedata-5cf2c-default-rtdb.firebaseio.com/users.json')
    .subscribe();
  }
  onedit(id:string){
    
    let currentemployee=this.allEmployees.find((p)=>{return p.id==id});
  console.log(currentemployee);
  this.uf.setValue({
    firstname:currentemployee?.firstname,
    lastname:currentemployee?.lastname,
    email:currentemployee?.email,
    gender:currentemployee?.gender,
    contactno:currentemployee?.contactno,
    state:currentemployee?.state,
    city:currentemployee?.city,
    id:currentemployee?.id,
    role:currentemployee?.role,
    exp:currentemployee?.exp,

  })
this.editmode=true;
}}

