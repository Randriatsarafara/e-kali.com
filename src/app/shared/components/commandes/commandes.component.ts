import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  advanceSearchExpanded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
