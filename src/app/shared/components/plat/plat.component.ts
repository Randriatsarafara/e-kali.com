import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {

  advanceSearchExpanded: boolean = false;
  products = [];
  isLoader = true;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false
    }, 2000)
  }

}
