import { Component,Input,OnInit,ViewChild } from '@angular/core';
import { Database } from 'src/app/dataforms/database';
import { NgForm, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dataforms',
  templateUrl: './dataforms.component.html',
  styleUrls: ['./dataforms.component.css']
})
export class DataformsComponent implements OnInit {
  title = 'Employee Database'; 
  isfetching:boolean=false;
  editmode:boolean=false;
 allEmployees:Database[]=[];
  submitted=false;
@ViewChild('userform') uf!:FormGroup;
  ngOnInit(){
    this.fetchemployee();
  }
  onemployeefetch(){
    this.fetchemployee();
  }
  constructor(private http:HttpClient,private router:Router)
  {}
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
  ondelete(id:string){
    this.http.delete('https://employee-database-21589-default-rtdb.firebaseio.com/users/'+id+'.json')
    .subscribe();
  }
  ondeleteall(){
    this.http.delete('https://employee-database-21589-default-rtdb.firebaseio.com/users.json')
    .subscribe();
  }
onedit(id:string){
  console.log(id);
  let currentemployee=this.allEmployees.find((p)=>{return p.id===id});
  this.uf.get('firstname').setValue(currentemployee.firstname);
  this.uf.get('lastname').setValue(currentemployee.lastname);
  this.uf.get('email').setValue(currentemployee.email);
  this.uf.get('gender').setValue(currentemployee.gender);
  this.uf.get('contactno').setValue(currentemployee.contactno);
  this.uf.get('state').setValue(currentemployee.state);
  this.uf.get('city').setValue(currentemployee.city);
  this.uf.get('role').setValue(currentemployee.role);
  this.uf.get('exp').setValue(currentemployee.exp);
this.editmode=true;
}
}