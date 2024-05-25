import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { EmployeeModal } from '../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employee:EmployeeModal={}

  //ActivatedRoute is a predefined class used to access data from the url here we use id parameter 
  constructor(private route:ActivatedRoute,private api:ApiServiceService,private router:Router){}

  // to access id when the page loads
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id}=res
      this.getanemployee(id)
      
    })
    
  }
//to get a single employee details
  getanemployee(id:any){
    this.api.getanemployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);     
        this.employee=res
        

      },
      error:(err:any)=>{
        console.log(err);
        

      }

    })

    
  }

  //to update a employee data

  updateEmployee(id:any){
    this.api.updateEmployeeDataApi(id,this.employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert(`Employee details updated successfully`)
        this.router.navigateByUrl('employee')

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  //to cancel edit
  cancelEdit(id:any){
    this.getanemployee(id)
  }
}
