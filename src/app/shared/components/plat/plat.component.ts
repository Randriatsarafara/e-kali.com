import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {

  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products = [];
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true
    }, 8000)
  }

}
