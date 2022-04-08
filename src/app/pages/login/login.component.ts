import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MessageComponent } from 'src/app/shared/components/message/message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  affiche:string = "password";
  constructor(public dialog: MatDialog,private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http:HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      check: [false, Validators.required]
    })
  }

  showhide(){
    if(!this.loginForm.value.check){
      this.affiche = "text";
    }else{
      this.affiche = "password";
    }
  }

  login = ()=>{
    if(this.loginForm.invalid) {
      this.openMessage(true,"Complete toute les champs!");
      return;
    };
    const data = this.loginForm.value;
    const success = (response:any)=>{
        const input = {
          token : response.success.token,
          id : response.success.id,
          name : response.success.name
        };
        this.userService.setUser(input);
        this.router.navigate(['/']);
    }
    const error = (response:any) => {
      this.openMessage(true,response.error.error.message);
    };
    this.userService.login(data.login,data.password).subscribe(success,error);
  }
  openMessage(error:boolean=true,message:string) {
    let icon = 'highlight_off';
    let color = 'red';
    if(!error){
      icon = 'check_circle_outline';
      color = 'green';
    }
    this.dialog.open(MessageComponent,{
      data: { message: message,icon:icon,color:color },
    });
  }
}
