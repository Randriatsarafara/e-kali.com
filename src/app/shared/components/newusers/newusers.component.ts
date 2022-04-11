import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-newusers',
  templateUrl: './newusers.component.html',
  styleUrls: ['./newusers.component.scss']
})
export class NewusersComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  affiche:string = "password";
  type = [];
  ville = [];
  constructor(private userService: UserService,public dialog: MatDialog,private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      numero: ['', Validators.required],
      password: ['', Validators.required],
      ville: ['', Validators.required],
      role: ['', Validators.required],
      check: [false, Validators.required]
    })
    this.userService.allVille().subscribe((res)=>this.ville = res['success']['data'])
    this.userService.allType().subscribe((res)=>this.type = res['success']['data'])
  }

  showhide(){
    if(!this.loginForm.value.check){
      this.affiche = "text";
    }else{
      this.affiche = "password";
    }
  }

  inscrire(){
    const success = response => {
      console.log(response);
      if (response['status'] == 200) {
        this.userService.openMessage(false,response.success.message);
        this.router.navigate(['/admin/newuser']);
      } else {
        this.userService.openMessage(true,response.error.error.message);
      }
    };
    const error = response => {
      this.userService.openMessage(true,response.error.error.message);
    };
    this.userService.inscription(this.loginForm.value.nom, this.loginForm.value.prenom, this.loginForm.value.email, this.loginForm.value.adresse,this.loginForm.value.numero,this.loginForm.value.password,this.loginForm.value.ville,this.loginForm.value.role).subscribe(success, error);
  }
}
