import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-plat-livreur',
  templateUrl: './plat-livreur.component.html',
  styleUrls: ['./plat-livreur.component.scss']
})
export class PlatLivreurComponent implements OnInit {

  advanceSearchExpanded: boolean = false;
  commande = [];
  count = 0;
  current_page = 1;
  isLoader = true;
  status:Array<string> = [];
  constructor(private router:Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService) { }

  init(){
    this.userService.commandeAll().subscribe((res)=>{
      this.commande = res["results"];
      for(let i=0;i<this.commande.length;i++){
        this.status.push(this.commande[i].status);
        this.userService.detailCommande(this.commande[i]._id).subscribe((ress)=>{
          this.commande[i]['detail'] = ress["success"]['data'];
        },(err)=>{
          this.userService.openMessage(true,err);
        });
      }
      this.count = res["count"];
      this.current_page = res["current_page"];
      this.isLoader = false;
    },(err)=>{
      this.isLoader = false;
      this.router.navigate(['/']);
      this.userService.openMessage(true,err.error.error.message);
    });
  }
  ngOnInit(): void {
    this.init();
  }

  livraison(idcommande,i){
    this.userService.livraison(idcommande,this.status[i]).subscribe(()=>{
      this.init();
      this.userService.openMessage(false,"OK");
    },
    (err)=>{
      this.userService.openMessage(true,err);
    })
  }
}
