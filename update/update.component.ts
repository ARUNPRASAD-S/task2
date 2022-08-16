import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Database } from 'src/app/dataforms/database';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  title = 'Employee Database'; 
  isfetching:boolean=false;
  editmode:boolean=false;
 allEmployees:Database[]=[];
  submitted=false;
  currentemployees:string;
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
  }
  constructor(private http:HttpClient,private route:ActivatedRoute)
  {
  }
  submit(users:{no:string,firstname:string,lastname:string,email:string,contactno:string,city:string}){
   console.log(users)
    if(!this.editmode){
    this.submitted=true;
    console.log(users);
    //const header=new HttpHeaders({'MyHeader':'Employee Database'})
    this.http.post<{name:string}>('https://employee-database-21589-default-rtdb.firebaseio.com/users.json',users)
    .subscribe((res)=>{
      console.log(res);
    });}
  }
}

