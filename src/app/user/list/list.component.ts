import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service';
import {User} from '../user';
import{Router} from '@angular/router';
@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers :[UserService]
})
export class ListComponent implements OnInit {

  private users: User[];
  
    constructor(private userService: UserService,private router:Router) { }
  
    ngOnInit() { //when component loading get all users and set the users[]
      this.getAllUsers();
    }
  
    getAllUsers() {
      this.userService.findAll().subscribe(
        
        users => {
          this.users = users;
          console.log("i am called in find all" + this.userService.findAll());
          
        },
        err => {
          console.log(err);
        }
  
      );
      console.log(UserService.length);
    }

    newProductPage(){
      this.router.navigate(['user/create']);
    }
}
