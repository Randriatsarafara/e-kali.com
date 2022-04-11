import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-commandesresp',
  templateUrl: './commandesresp.component.html',
  styleUrls: ['./commandesresp.component.scss']
})
export class CommandesrespComponent implements OnInit {

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
