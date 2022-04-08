import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {

  advanceSearchExpanded: boolean = false;
  products = [];
  count = 0;
  current_page = 1;
  isLoader = true;
  loginForm: FormGroup = new FormGroup({});
  constructor(private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http:HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      like: [null],
      min: [null],
      max: [null]
    })
    this.userService.recettes().subscribe((res)=>{
      this.products = res["results"];
      console.log(this.products)
      this.count = res["count"];
      this.current_page = res["current_page"];
      this.isLoader = false;
    },()=>this.isLoader = false);
  }

  onLike(){
    this.isLoader = true;
    this.userService.recettes(this.loginForm.value.like,null,this.loginForm.value.min,this.loginForm.value.max).subscribe((res)=>{
      this.products = res["results"];
      this.count = res["count"];
      this.current_page = res["current_page"];
      this.isLoader = false;
    },()=>this.isLoader = false);
  }

  // onMin(){
  //   this.isLoader = true;
  //   this.userService.recettes(this.loginForm.value.like,null,this.loginForm.value.min,this.loginForm.value.max).subscribe((res)=>{
  //     this.products = res["results"];
  //     this.count = res["count"];
  //     this.current_page = res["current_page"];
  //     this.isLoader = false;
  //   },()=>this.isLoader = false);
  // }

  // onMax(){
  //   this.isLoader = true;
  //   this.userService.recettes(this.loginForm.value.like,null,this.loginForm.value.min,this.loginForm.value.max).subscribe((res)=>{
  //     this.products = res["results"];
  //     this.count = res["count"];
  //     this.current_page = res["current_page"];
  //     this.isLoader = false;
  //   },()=>this.isLoader = false);
  // }
}
