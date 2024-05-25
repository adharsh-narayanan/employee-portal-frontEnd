import { Component, OnInit } from '@angular/core';
import { EmployeeModal } from '../employee.model';
import { ApiServiceService } from '../services/api-service.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  allEmployees:EmployeeModal[]=[]
  loginTime:any=new Date
  searchKey:string=""
  //paginTION
  p: number = 1;

  constructor(private api:ApiServiceService){}

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(){
    this.api.getEmployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allEmployees=res
        
      },
      error:(res:any)=>{
        console.log(res);
        

      }
    })
  }

  //to sort
  sortbyId(){
    this.allEmployees.sort((a:any,b:any)=>a.id-b.id)
  }
  sortbyName(){
     //only numbers can be sorted hence to sort strings we convert them to number by localeCompare method. it compares 2 strings and returns -1,0 or 1 
     //syntax
     //string.localecompare(2nd string)
    this.allEmployees.sort((a:any,b:any)=>a.username.localeCompare(b.username))
  }
  // method to generate pdf using  jspdf  refer syntax
generatePdf(){
     //create object for jsPDF class
  const pdf = new jsPDF()
  let head= [['employeeId', 'EmplyeeName', 'Email','status']]

  let body:any=[]
  //since data is from backend which is array of objects we take each item and store into an array then push that array to body to get nested array as per syntax



  this.allEmployees.forEach((item)=>{
    body.push([item.id, item.username, item.email, item.status])
  })

  //to generate table
  autoTable(pdf,{head,body})

  //to set font size
  pdf.setFontSize(16)

  //to set title
  pdf.text('Employee Details',10,10)

  //to open table in a new tab

  pdf.output('dataurlnewwindow')


  //to set table file name

  pdf.save('employee-data.pdf')
  
}

//method to delete an entry

deleteemployee(id:any){
  this.api.deleteEmployeeApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      
      alert('employee deleted successfully')
      this.getAllEmployees()
      
        
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })

}
}
