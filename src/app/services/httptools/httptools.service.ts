import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttptoolsService {

  constructor(private http:HttpClient) { }

  formOption (use_authorization = false) {
    const options = {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : ''
      }
    };

    if (use_authorization) {
      options['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return options;
  }

  makeBody (json) {
    let body = [];
    for (let key in json)
      body.push(key + '=' + json[key]);
    return body.join('&');
  }

}
