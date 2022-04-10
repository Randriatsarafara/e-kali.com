import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  commande:any = [];
  total= 0;
  constructor(private router:Router,private userService: UserService) { }

  panier(){
    this.total=0;
    const data = JSON.parse(localStorage.getItem("pannier"));
    const success = (res)=>{
      for(let i=0;i<data.length;i++){
        for(let j=0;j<res["success"]["data"].length;j++){
          if(data[i]['product']===res["success"]["data"][j]._id){
            res["success"]["data"][j].quantite = data[i]['quantite'];
            this.total += parseInt(data[i]['quantite'])*parseFloat(res["success"]["data"][j].prixVente);
          }
        }
      }
      this.commande = res["success"]["data"];
    }
    const error = (err)=>{
      alert(err);
    }
    this.userService.getPanier().subscribe(success,error);
  }
  ngOnInit(): void {
    this.panier();
  }

  valider(){
    let reste = [];
    if(!localStorage.getItem("id")){
      this.userService.openMessage(true,"Veillez vous connecter pour faire une commande");
      this.router.navigate(['/connecter']);
      return;
    }
    // if(this.commande.length<1){
    //   this.userService.openMessage(true,"Panier vide");
    // }
    for(let i=0;i<this.commande.length;i++){
      var containputiner = document.querySelector("#panier_"+this.commande[i]._id);
      if(parseInt(containputiner['value'])<=0){
        this.userService.openMessage(true,"Entrer une quantite valide");
        return;
      }
      const id = { product:this.commande[i]._id,quantite:containputiner['value'] };
      reste.push(id);
    }
    const va = {id:reste,user: localStorage.getItem("id")};
    this.userService.newCommande(va).subscribe((res)=>{
      console.log(res);
      this.userService.openMessage(false,res["success"]["message"]);
      localStorage.removeItem("pannier");
    },(err)=>{
      console.log(err)
      this.userService.openMessage(true,err.error.error.message);
    });
  }

  removePannierById(id){
    this.userService.removePanierById(id);
    this.panier();
  }
}
