import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {

  advanceSearchExpanded: boolean = false;
  @Input()addHuhu:Function;
  products = [];
  count = 0;
  current_page = 1;
  isLoader = true;
  loginForm: FormGroup = new FormGroup({});
  formPanier: FormGroup = new FormGroup({});
  constructor(private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http:HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      like: [null],
      min: [null],
      max: [null]
    })
    this.formPanier = this.formBuilder.group({
      quantite : this.formBuilder.array([])
    })
    this.userService.recettes().subscribe((res)=>{
      this.products = res["results"];
      console.log(this.products)
      this.count = res["count"];
      this.current_page = res["current_page"];
      this.isLoader = false;
    },()=>this.isLoader = false);
  }

  get quantite() : FormArray {
    return this.formPanier.get("quantite") as FormArray
  }

  addQuantite() {
    const quantiteForm = this.formBuilder.group({
      quantite: [1, Validators.required]
    });
    this.quantite.push(quantiteForm);
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

  addPanier(val: any,id){
    var containputiner = document.querySelector("#"+val);
    if(parseInt(containputiner['value'])<=0){
      this.userService.openMessage(true,"Entrer une quantite valide");
      return;
    }
    this.userService.openMessage(false,`Quantite ${containputiner['value']} ajouter au pannier`);
    this.userService.addPanier(containputiner['value'],id);
  }

  toMoney(valeur:number){
    return valeur.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
  }
}
