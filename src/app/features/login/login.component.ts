import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/AUth/auth.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private _authService:AuthService , private router:Router){
  }

  ngOnInit(): void {
  }
  
  login(){
    
    this._authService.login({userName:'admin' , password:"123456"}).subscribe(res =>{
      this.router.navigateByUrl('dashboard')
    })
  }
}
