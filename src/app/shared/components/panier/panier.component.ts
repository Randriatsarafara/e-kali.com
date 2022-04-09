import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  commande:any;
  total= 0;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
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

}
