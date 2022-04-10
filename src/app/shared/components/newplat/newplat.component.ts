import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-newplat',
  templateUrl: './newplat.component.html',
  styleUrls: ['./newplat.component.scss']
})
export class NewplatComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  constructor(private userService: UserService,public dialog: MatDialog,private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  init(){
    this.loginForm = this.formBuilder.group({
      designation: ['', Validators.required],
      description: ['', Validators.required],
      prixAchat: [0, Validators.required],
      prixVente: [0, Validators.required]
    })
  }
  ngOnInit(): void {
    this.init();
  }

  enregistrer(){
    const success = response => {
      console.log(response);
      // if (response['status'] == 200) {
      //   const input = {
      //     token : response.success.token,
      //     id : response.success.id,
      //     name : response.success.name
      //   };
      //   this.userService.openMessage(false,response.success.message);
      //   this.userService.setUser(input);
      //   this.router.navigate(['/']);
      // } else {
      //   this.userService.openMessage(true,response.error.error.message);
      // }
      this.userService.openMessage(false,"OK");
      this.init();
    };
    const error = response => {
      console.log(response)
      this.userService.openMessage(true,response.error.error.message);
    };
    this.userService.newplat(this.loginForm.value.designation, this.loginForm.value.description, this.loginForm.value.prixAchat, this.loginForm.value.prixVente,localStorage.getItem("id")).subscribe(success, error);
  }

}
