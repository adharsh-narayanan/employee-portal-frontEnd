import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModal } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  serverUrl ='https://employee-portal-server-ke9q.onrender.com'
//dependancy injection
  constructor(private http:HttpClient) { }

  //to get admin for login
  loginApi(){ //it returns observable
    return this.http.get(`${this.serverUrl}/employees/1`)
  }

  //api to add an employee

  addEmployeeApi(employee:EmployeeModal){
    return this.http.post(`${this.serverUrl}/employees`,employee)
  }

  //api get all employees

  getEmployeeApi(){
    return this.http.get(`${this.serverUrl}/employees`)
  }

  //api to delete an employee

  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.serverUrl}/employees/${id}`)
  }

  //api to get a single employee

  getanemployeeApi(id:any){
    return this.http.get(`${this.serverUrl}/employees/${id}`)
  }

  //api to edit and update employee details

  updateEmployeeDataApi(id:any,body:any){
    return this.http.put(`${this.serverUrl}/employees/${id}`,body)

  }

  //api to updare admin details
  updateAdminApi(body:any){
    return this.http.put(`${this.serverUrl}/employees/1`,body)
  }

}
