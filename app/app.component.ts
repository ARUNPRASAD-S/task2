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
  //isfetching:boolean=false;
 allEmployees:Database[]=[];
  //gender = ['Male', 'Female']
   // user={
      //no:"",
    //firstname: "",
    //lastname:"",
    //email: "",
    //gender: "",
    //contactno: "",
    //state: "",
   // city:"",
    //role:"",
    //exp:"",
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
    //this.user.no=this.uf.value.no;
    //this.user.firstname=this.uf.value.firstname;
    //this.user.lastname=this.uf.value.lastname;
    //this.user.email=this.uf.value.email;
    //this.user.gender=this.uf.value.gender;
    //this.user.contactno=this.uf.value.contactno;
    //this.user.state=this.uf.value.state;
    //this.user.city=this.uf.value.city;
    //this.user.role=this.uf.value.role;
    //this.user.exp=this.uf.value.exp;
    //console.log(this.uf.value.no,this.uf.value.firstname,this.uf.value.lastname,this.uf.value.email,this.uf.value.gender,
      //this.uf.value.contactno,this.uf.value.state,this.uf.value.city,this.uf.value.role,this.uf.value.exp)
//this.uf.reset();
    console.log(users);
    //const header=new HttpHeaders({'MyHeader':'Employee Database'})
    this.http.post<{name:string}>('https://employee-database-21589-default-rtdb.firebaseio.com/users.json',users)
    .subscribe((res)=>{
      console.log(res);
    });
  }
  private fetchemployee()
  {
    //this.isfetching=true;
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
      //this.isfetching=false;
    });
  }
  ondelete(no:string){
    this.http.delete('https://employee-database-21589-default-rtdb.firebaseio.com/users/'+no+'json')
    .subscribe();
  }
  ondeleteall(){
    this.http.delete('https://employee-database-21589-default-rtdb.firebaseio.com/users.json')
    .subscribe();
  }}