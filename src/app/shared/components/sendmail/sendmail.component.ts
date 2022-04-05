import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.scss']
})
export class SendmailComponent implements OnInit {

  mapOptions: google.maps.MapOptions = {
      center: { lat: 38.9987208, lng: -77.2538699 },
      zoom : 14
  }
  marker = {
      position: { lat: 38.9987208, lng: -77.2538699 },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
