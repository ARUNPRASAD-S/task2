import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Database } from 'src/assets/model/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'templates'; 
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
  onSubmit(users:{no:string,firstname:string,lastname:string,email:string,contactno:string,city:string}){
    this.submitted=true;
    console.log(users);
    //const header=new HttpHeaders({'MyHeader':'Employee Database'})
    this.http.post<{name:string}>('https://employee-database-21589-default-rtdb.firebaseio.com/users.json',users)
    .subscribe((res)=>{
      console.log(res);
    });
  }
  private fetchemployee()
  {
    this.isfetching=true;
    this.http.get<{[key:string]:Database}>('https://employee-database-21589-default-rtdb.firebaseio.com/users.json')
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
  ondelete(no:string){
    this.http.delete('https://employee-database-21589-default-rtdb.firebaseio.com/users/'+no+'.json')
    .subscribe();
  }
  ondeleteall(){
    this.http.delete('https://employee-database-21589-default-rtdb.firebaseio.com/users.json')
    .subscribe();
  }
onedit(no:string){
  let currentemployee=this.allEmployees.find((p)=>{return p.no==no});
  console.log(currentemployee);
  //this.uf.setValue({
    //firstname:currentemployee.firstname,
    //lastname:currentemployee.firstname,
    //email:currentemployee.email,
    //gender:currentemployee.gender,
    //contactno:currentemployee.contactno,
    //state:currentemployee.state,
    //city:currentemployee.city,
    //role:currentemployee.role,
    //exp:currentemployee.exp
  //})
this.editmode=true;
}}