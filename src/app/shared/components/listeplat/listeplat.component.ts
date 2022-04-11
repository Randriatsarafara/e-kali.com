import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-listeplat',
  templateUrl: './listeplat.component.html',
  styleUrls: ['./listeplat.component.scss']
})
export class ListeplatComponent implements OnInit {
  advanceSearchExpanded: boolean = false;
  plats:Array<any> = [];
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
    this.userService.platByUser(localStorage.getItem("id")).subscribe((res:Array<any>)=>{
      this.plats = res['data'];
      this.count = res['count'];
      this.isLoader = false;
    },(err)=>{
      this.isLoader = false;
      this.userService.openMessage(true,err.error.message);
    }
    );
  }

  activer(id){
    const success = response => {
      this.userService.openMessage(false,"OK");
      this.router.navigate(['/listplat']);
    };
    const error = response => {
      this.userService.openMessage(true,response.error.error.message);
    };
    this.userService.activer(id).subscribe(success, error);
  }

  desactiver(id){
    const success = response => {
      this.userService.openMessage(false,"OK");
      this.router.navigate(['/listplat']);
    };
    const error = response => {
      this.userService.openMessage(true,response.error.error.message);
    };
    this.userService.desactiver(id).subscribe(success, error);
  }
}
