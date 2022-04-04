import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'll-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() show: boolean = true;
  constructor() { }

  ngOnInit(): void {

  }
}
