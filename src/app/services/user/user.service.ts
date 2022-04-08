import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url_node } from 'src/environments/environment.prod';
import { HttptoolsService } from '../httptools/httptools.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private tools:HttptoolsService) {
  }

  setUser (data:any) {
    localStorage.setItem('id', data['id']);
    localStorage.setItem('name', data['name']);
    localStorage.setItem('token', data['token']);
  }

  // isLogged () {
  //   if(localStorage.getItem('id') && localStorage.getItem('name') && localStorage.getItem('token') && this.user!=null){
  //     return true;
  //   }
  //   return false;
  // }


  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }

  login(login: string,password: string){
    const options = this.tools.formOption();
    let body = {
      'login': login,
      'password' : password
    }
    return this.http.post(base_url_node+'/user/login',body,options);
  }

  inscription (nom:string, prenom:string, email:string, adresse:string,numero:string,password:string,ville:string,role:string) {
    const options = this.tools.formOption();
    let body = {
      'nom':nom,
      'prenom':prenom,
      'email':email,
      'adresse':adresse,
      'numero':numero,
      'password':password,
      'ville':ville,
      'role':role
    };
    return this.http.post(base_url_node+'/user/create', body,options);
  }

  allVille () {
    return this.http.get(base_url_node + '/ville', {});
  }

  allType () {
    return this.http.get(base_url_node + '/type', {});
  }

  userById(){
    if(localStorage.getItem('id')!=null){
      return this.http.get(base_url_node + '/user/'+localStorage.getItem('id'), {});
    }else{
      return null;
    }

  }
}
