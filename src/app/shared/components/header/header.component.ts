import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  isLessThenLargeDevice;
  isLogged: boolean = false;
  userType: string = "Client";
  countPanier: number = 0;
  constructor(private router:Router,private userService: UserService,private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.countPanier = this.userService.countPannier();
    if(this.userService.userById()==null){
        this.userType = "Client";
        this.isLogged = false;
    }else{
      this.userService.userById().subscribe((res)=>{
        this.isLogged = true;
        this.userType = res["success"]["data"][0].role[0].val;
      });
    }
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PanierComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deconnecter(){
    this.userService.logOut();
    this.isLogged = false;
    this.router.navigate(['/']);
  }


}
