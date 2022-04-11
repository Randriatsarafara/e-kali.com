import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-plats-livreur',
  templateUrl: './plats-livreur.component.html',
  styleUrls: ['./plats-livreur.component.scss']
})
export class PlatsLivreurComponent implements OnInit {

  isAlive: boolean = true;
  @ViewChild('sidenav') sidenav;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  isLoader = true;
  constructor(private userService: UserService,private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.isAlive = false
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }

}
