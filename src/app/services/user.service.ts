import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../classes/user';
import { tap } from 'rxjs/operators';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost/';
  users: Array<any>;
  human: string;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    console.log("Service opened correctly");
    let gato = this.http.get<any>('http://127.0.0.1/obtain.php');
    return gato;
  }
  deleteUser(person: User) {
    console.log("Hi, I am deleteUser");
    this.human = JSON.stringify(person);
    let erase = this.http.post('http://127.0.0.1/personDelete.php', this.human, {responseType: 'text'}).subscribe((data) => console.log(data));
  }
  createUser(person: User) {
    console.log("Hi, I am createUser");
    this.human = JSON.stringify(person);
    let create = this.http.post('http://127.0.0.1/personUpload.php', this.human, {responseType: 'text'}).subscribe((data) => console.log(data));
  }
  modifyUser(person: User) {
    console.log("Hi, I am modifyUser");
    this.human =  JSON.stringify(person);
    let modify = this.http.post('http://127.0.0.1/personModify.php', this.human, {responseType: 'text'}).subscribe((data) => console.log(data));
  }
}
