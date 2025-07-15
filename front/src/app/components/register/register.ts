import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterServices } from '../../services/register-services';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = "";
  email = "";
  password = "";

  constructor(private registerS: RegisterServices, private router: Router){ }
  handleSubmit():void{
    if(!this.name || !this.email || !this.password) {
      alert("Please fill in all fields");
      return;
    }

    this.registerS.createUser(this.name, this.email, this.password).subscribe({
      next: (res: ApiResponse)=>{
        if(res.result === 'fine'){
          alert("Usuario registrado correctamente");
          this.router.navigate(['/login']);
        }else{
          alert(res.message || "Can not register user");
        }
      },

      error:(err)=> {
        console.log("Error en el seridor", err );
        alert("Error en el servidor, por favor intente más tarde");
      }
    });
  }

}
