import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginEmail: string = ""
  loginPassword: string = ""

  constructor(private api:ApiServiceService,private router:Router){}  //dependancy injection from service to access the api function
  login() {
    if (!this.loginEmail || !this.loginPassword){
     Swal.fire({
        title:'oops',
        text:"please fill the form completely",
        icon:"info",
        
      })}
    else{
     this.api.loginApi().subscribe({
      next:(res:any)=>{
        const {email,password}=res
        if(email==this.loginEmail && password==this.loginPassword){
          Swal.fire({
            title:'Congrats',
            text:"Login Successfull",
            icon:"success",
            
          })
          
          this.router.navigateByUrl('dashboard')
        }else{
          Swal.fire({
            title:'oops',
            text:"Incorrect email or password",
            icon:"error",
            
          })
        
        }
      }
     })
    }
  }

}
