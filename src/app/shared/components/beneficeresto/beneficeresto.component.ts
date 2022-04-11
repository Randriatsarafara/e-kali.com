import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-beneficeresto',
  templateUrl: './beneficeresto.component.html',
  styleUrls: ['./beneficeresto.component.scss']
})
export class BeneficerestoComponent implements OnInit {

  benefice = [];
  constructor(private userService: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.benefice(localStorage.getItem("id")).subscribe((res)=>{
      console.log(res["success"]["data"])
      this.benefice = res["success"]["data"];
    },(err)=>{
      console.log(err)
      this.userService.openMessage(true,err);
    })
  }

}
