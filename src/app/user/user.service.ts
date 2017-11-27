import { Injectable } from '@angular/core';
import{User} from './user';
import {Http,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private apiurl = "http://localhost:8080/api/newssources";
  private purl = "http://localhost:8080/restsaveproduct";
  constructor(private http: Http) {

   }
   findAll(): Observable<User[]>  {
    return this.http.get(this.apiurl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveUser(user :User ):Observable<User[]>{
    return this.http.post(this.purl,user)._catch((error:any)=>Observable.throw(error.json().error || 'server error'));
}


}
