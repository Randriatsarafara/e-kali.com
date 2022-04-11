import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { base_url_node } from 'src/environments/environment.prod';
import { HttptoolsService } from '../httptools/httptools.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public dialog: MatDialog,private http:HttpClient,private tools:HttptoolsService) {}

  setUser (data:any) {
    localStorage.setItem('id', data['id']);
    localStorage.setItem('name', data['name']);
    localStorage.setItem('token', data['token']);
  }

  openMessage(error:boolean=true,message:string) {
    let icon = 'highlight_off';
    let color = 'red';
    if(!error){
      icon = 'check_circle_outline';
      color = 'green';
    }
    this.dialog.open(MessageComponent,{
      data: { message: message,icon:icon,color:color },
    });
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
  }

  getPanier(){
    const options = this.tools.formOption();
    const data = JSON.parse(localStorage.getItem("pannier"));
    const body = {
      id : data
    }
    return this.http.post(base_url_node + '/plat/pannier/detail', body,options);
  }

  removePanierById(id){
    const data = JSON.parse(localStorage.getItem("pannier"));
    const indexOfObject = data.findIndex(object => {
      return object.product === id;
    });
    data.splice(indexOfObject, 1);
    localStorage.setItem('pannier', JSON.stringify(data));
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
  addhuhu(){
    console.log("huhu");

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

  newCommande(commande:any){
    const options = this.tools.formOption();
    return this.http.post(base_url_node+'/commande/create', commande,options);
  }

  commandeEnCours(like=null,user=null,prixMin=null,prixMax=null,limit=null,page=null) {
    const options = this.tools.formOption(true);
    let body = this.tools.makeBody({
      'like' : like,
      'user' : user,
      'prixMin' : prixMin,
      'prixMax' : prixMax,
      'limit' : limit,
      'page' : page
    });
    return this.http.patch(base_url_node + '/commande/encours'+body,{},options);
  }

  detailCommande(idcommande) {
    return this.http.get(base_url_node + '/commande/detail/'+idcommande);
  }

  newplat (designation:string, description:string, prixAchat:number, prixVente:number,id:string) {
    const options = this.tools.formOption();
    let body = {
      'designation':designation,
      'description':description,
      'prixAchat':prixAchat,
      'prixVente':prixVente,
      'user':id
    };
    return this.http.post(base_url_node+'/plat/create', body,options);
  }

  platByUser(iduser) {
    return this.http.get(base_url_node + '/plat/all/'+iduser);
  }

  platById(id) {
    return this.http.get(base_url_node + '/plat/detail/'+id);
  }

  benefice(id) {
    const options = this.tools.formOption();
    const body = {
      'idvendeur':id
    }
    return this.http.post(base_url_node + '/commande/listeDetail', body,options);
  }


  //TY
  commandeAll(like=null,user=null,prixMin=null,prixMax=null,limit=null,page=null) {
    const options = this.tools.formOption(true);
    let body = this.tools.makeBody({
      'like' : like,
      'user' : user,
      'prixMin' : prixMin,
      'prixMax' : prixMax,
      'limit' : limit,
      'page' : page
    });
    return this.http.patch(base_url_node + '/commande/all'+body,{},options);
  }

  userAll() {
    const options = this.tools.formOption(true);
    return this.http.patch(base_url_node + '/user/admin/all',{},options);
  }

  formatMoney(mon){
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return formatter.format(mon);
  }

  livraison(idcommande,status:string) {
    const options = this.tools.formOption(true);
    const body = {
      status: status,
      livreur:localStorage.getItem("id")
    }
    return this.http.patch(base_url_node + '/commande/update/'+idcommande,body,options);
  }

}
