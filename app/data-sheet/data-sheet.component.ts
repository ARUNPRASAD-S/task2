import { Component, OnInit,ViewChild } from '@angular/core';
import { Database} from './database';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';


@Component({
  selector: 'app-data-sheet',
  templateUrl: './data-sheet.component.html',
  styleUrls: ['./data-sheet.component.css']
})
export class DataSheetComponent implements OnInit {

  title = 'Employee-Form'; 
  isfetching:boolean=false;
  editmode:boolean=false;
 allEmployees:Database[]=[];
  submitted=false;
  uf: any;

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
    
    let employee=this.allEmployees.find((p)=>{return id});
  console.log(employee);
  this.uf.setValue({
    // firstname:employee?.firstname,
    // lastname:employee?.lastname,
    // email:employee?.email,
    // gender:employee?.gender,
    // contactno:employee?.contactno,
    // state:employee?.state,
    // city:employee?.city,
    // id:employee?.id,
    // role:employee?.role,
    // exp:employee?.exp,

  })
this.editmode=true;
}}

