import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service';
import {User} from '../user';
import{Router,ActivatedRoute} from '@angular/router';
import{FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[UserService]
})
export class CreateComponent implements OnInit {


 id:number;
 user:User;

 post :any;
 price :number;
name:string;
description:string;
titleAlert:string="can not be empty";
pricealert:string="price number should be between 3 and 6";

 formdata :FormGroup;
 rform:FormGroup;


  constructor(private userservice:UserService,private router:Router,private route:ActivatedRoute,private fb:FormBuilder) {

      this.formdata=fb.group({
     'name' : [null,Validators.required],
      'price':['',([Validators.required,Validators.maxLength(6),Validators.minLength(3)])],
      'description':[null,([Validators.required])],
      'validate':''
    });
   
  }


  ngOnInit() {
  // this.formdata = new FormGroup({
  //   name:new FormControl('',Validators.required),
  //   price:new FormControl('',([Validators.required,Validators.maxLength(10),Validators.minLength(5)])),
  //   description:new FormControl('',[
  //     Validators.pattern("[^ @]*@[^ @]*"),
  //   Validators.required])
  // });


  this.formdata.get('validate').valueChanges.subscribe(
    (validate) => {
      if (validate == '1') {
        this.formdata.get('name').setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = "You need to specify at least 3 characters";
        this.formdata.get('price').setValidators([Validators.required,Validators.maxLength(5),Validators.minLength(2)]);
this.pricealert="u need to specify bw 2 and 5";
      } else {
        this.formdata.get('price').setValidators(Validators.required);
        this.formdata.get('name').setValidators(Validators.required);
      }
      this.formdata.get('name').updateValueAndValidity();
      this.formdata.get('price').updateValueAndValidity();
    }
  )
  // this.formdata.get('validate').valueChanges.subscribe(
  //   (validate) => {
  //     if (validate == '1') {
  //       this.formdata.get('name').setValidators([Validators.required, Validators.minLength(3)]);
  //       this.titleerror = "You need to specify at least 3 characters";
  //     } else {
  //       this.formdata.get('name').setValidators(Validators.required);
  //     }
  //     this.formdata.get('name').updateValueAndValidity();
  //   }
  // )
  }
  ngOnDestroy():void{

  }
   act(post) {
     if(this.formdata.valid){

      let useformdatadata = new User(null,
      this.formdata.controls["name"].value,
      this.formdata.controls["description"].value,
      this.formdata.controls["price"].value);
     // post.name,post.price,post.description);
      this.userservice.saveUser(useformdatadata).subscribe();  
    
}else{
  console.log('error caught by me');
}

// this.name= post.name;
// this.price=post.price;
// this.description= post.description;


this.formdata.reset();
this.router.navigate(['/user']);
}

redirectUserPage(){

  this.router.navigate(['user']);
}

}
