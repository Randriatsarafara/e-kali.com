import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url_node } from 'src/environments/environment.prod';
import { HttptoolsService } from '../httptools/httptools.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private tools:HttptoolsService) {}

  setUser (data:any) {
    localStorage.setItem('id', data['id']);
    localStorage.setItem('name', data['name']);
    localStorage.setItem('token', data['token']);
  }
  addPanier (qt:any,id) {
    const data = {
      product: id,
      quantite: parseInt(qt)
    }
    if(!localStorage.getItem("pannier")){
      const datas = [];
      datas.push(data);
      localStorage.setItem('pannier', JSON.stringify(datas));
    }else{
      const datas = JSON.parse(localStorage.getItem("pannier"));
      for(let i=0;i<datas.length;i++){
        if(datas[i]['product']===id){
          datas[i]['quantite'] += parseInt(qt);
          localStorage.setItem('pannier', JSON.stringify(datas));
          return;
        }
      }
      datas.push(data);
      localStorage.setItem('pannier', JSON.stringify(datas));
    }
    // alert(this.countPannier());
  }

  getPanier(){
    const options = this.tools.formOption();
    const data = JSON.parse(localStorage.getItem("pannier"));
    const body = {
      id : data
    }
    return this.http.post(base_url_node + '/plat/pannier/detail', body,options);
  }

  countPannier(){
    let panier = 0;
    if(localStorage.getItem("pannier")){
      const datas = JSON.parse(localStorage.getItem("pannier"));
      for(let a=0;a<datas.length;a++){
        panier += parseInt(datas[a]['quantite']);
      }
    }
    return panier;
  }

  removeAllPanier () {
    localStorage.removeItem('pannier');
  }

  removePanier () {
    localStorage.clear();
  }

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

  recettes(like=null,user=null,prixMin=null,prixMax=null,limit=null,page=null) {
    let body = this.tools.makeBody({
      'like' : like,
      'user' : user,
      'prixMin' : prixMin,
      'prixMax' : prixMax,
      'limit' : limit,
      'page' : page
    });
    return this.http.get(base_url_node + '/plat/actif'+body);
  }

  sendMailContact (nom:string, numero:string, mail:string, subject:string,message:string) {
    const options = this.tools.formOption();
    let body = {
      'name':nom,
      'clientmail':mail,
      'subject':subject,
      'numero':numero,
      'message':message
    };
    return this.http.post(base_url_node+'/user/contact/mail', body,options);
  }
}
