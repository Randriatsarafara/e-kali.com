import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-listesusers',
  templateUrl: './listesusers.component.html',
  styleUrls: ['./listesusers.component.scss']
})
export class ListesusersComponent implements OnInit {

  advanceSearchExpanded: boolean = false;
  users:Array<any> = [];
  count = 0;
  current_page = 1;
  isLoader = true;
  loginForm: FormGroup = new FormGroup({});
  formPanier: FormGroup = new FormGroup({});
  constructor(private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      like: [null],
      min: [null],
      max: [null]
    })
    this.formPanier = this.formBuilder.group({
      quantite : this.formBuilder.array([])
    })
    this.userService.userAll().subscribe((res:Array<any>)=>{
      console.log("=============",res);
      this.users = res["success"]["data"];
      // console.log(this.commande)
      // this.count = res["count"];
      // this.current_page = res["current_page"];
      // this.isLoader = false;
    },()=>this.isLoader = false);
  }

  desactiver(id){

  }
  activer(id){

  }
}
