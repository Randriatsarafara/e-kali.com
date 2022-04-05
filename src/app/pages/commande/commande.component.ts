import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  isAlive: boolean = true;
  @ViewChild('sidenav') sidenav;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  isLoader = true;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 2500);
  }

  ngOnDestroy(): void{
    this.isAlive = false
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }

}
