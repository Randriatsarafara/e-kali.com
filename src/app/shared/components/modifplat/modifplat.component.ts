import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modifplat',
  templateUrl: './modifplat.component.html',
  styleUrls: ['./modifplat.component.scss']
})
export class ModifplatComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    designation:new FormControl(),
    description:new FormControl(),
    prixAchat:new FormControl(),
    prixVente:new FormControl(),
  });
  constructor(private userService: UserService,public dialog: MatDialog,private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  init(){

  }
  ngOnInit(): void {
    this.userService.platById(this.route.params["value"]["idplats"]).subscribe((res)=>{
      this.loginForm.controls.designation.setValue(res['designation']);
      this.loginForm.controls.description.setValue(res['description']);
      this.loginForm.controls.prixAchat.setValue(res['prixAchat']);
      this.loginForm.controls.prixVente.setValue(res['prixVente']);
    },(err)=>{
      this.userService.openMessage(true,'Plat invalide');
    })
  }

  enregistrer(){
    const success = response => {
      this.userService.openMessage(false,"OK");
      this.router.navigate(['/listplat']);
    };
    const error = response => {
      this.userService.openMessage(true,response.error.error.message);
    };
    this.userService.updateplat(this.route.params["value"]["idplats"],this.loginForm.value.designation, this.loginForm.value.description, this.loginForm.value.prixAchat, this.loginForm.value.prixVente,localStorage.getItem("id")).subscribe(success, error);
  }

}
