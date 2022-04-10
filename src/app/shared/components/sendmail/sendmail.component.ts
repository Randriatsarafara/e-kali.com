import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.scss']
})
export class SendmailComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(public dialog: MatDialog  ,private userService: UserService,private router:Router, private route: ActivatedRoute,private formBuilder: FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nom: ['', Validators.required],
      numero: ['', Validators.required],
      mail: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  sendMail(){
    this.userService.sendMailContact(this.loginForm.value.nom,this.loginForm.value.numero,this.loginForm.value.mail,this.loginForm.value.subject,this.loginForm.value.message).subscribe(
      (res)=>{
        this.userService.openMessage(false,"Message envoyer au responsable de e-kali");
      },
      (err)=>{
        this.userService.openMessage(true,"Message non envoyer");
      }
    )
  }

}
