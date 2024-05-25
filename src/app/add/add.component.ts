import { Component } from '@angular/core';
import { EmployeeModal } from '../employee.model';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
   
  //using employee.model.ts
  employee:EmployeeModal={}

  constructor(private api:ApiServiceService,private router:Router){}


//function to reset the values in input field
  cancelEmployee(){
    this.employee={}
  }

  //fuction to add employee
  addEmployee(){
    console.log(this.employee);
    this.api.addEmployeeApi(this.employee).subscribe({
      next:(res:EmployeeModal)=>{
        console.log(res);
        
        Swal.fire({
          title:'Congrats',
          text:`${this.employee.username} added Successfully`,
          icon:"success",
          
        })
        this.router.navigateByUrl('employee')
      },
      error:(res:any)=>{
        console.log(res);
        
      }
    })
    
  }

}
