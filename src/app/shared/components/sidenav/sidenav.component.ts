import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  isLessThenLargeDevice;
  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {}

  ngOnInit(): void {
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
    alert("Deconnection!")
  }
}
