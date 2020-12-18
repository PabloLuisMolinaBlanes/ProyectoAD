import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { User } from '../../classes/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { withLatestFrom } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-user-modifier',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss']
})

export class MainMenuPage implements OnInit {

  public personArray: Array<User> = [];
  public people: Observable<any> = this.userService.getAll();
  public man: any;
  public currentPerson: User = new User(-1, 'a', 'a', 'a', 'a');
  public definitePerson: User;
  public number = 0;
  public myObserver;
  public showed = true;
  public delete = false;
  public phrase = "Escoja a quien modificar pinchando en la foto";
  public mode = "Borrar";

  constructor(private userService: UserService, private router: Router, @Inject(DOCUMENT) document, private alertCtrl: AlertController) { 
}

  ngOnInit(): void {
    const myObserver = {
      next: personData => {
        this.personArray = [];
        for (var i = 0; i < personData.data.length; i++) {
          this.man = personData;
          this.definitePerson = new User(this.man.data[this.number].id, this.man.data[this.number].name, this.man.data[this.number].status, this.man.data[this.number].building, this.man.data[this.number].picture);
          this.personArray.push(this.definitePerson);
          this.number += 1;
        }
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {console.log('Observer got a complete notification'); this.number = 0},
    };
    this.myObserver = myObserver;
    this.people.subscribe(this.myObserver);
  }
  async setPerson(id: number, name: string, status: string, building: string, picture: string) {
    this.currentPerson.id = id;
    this.currentPerson.name = name;
    this.currentPerson.status = status;
    this.currentPerson.building = building;
    this.currentPerson.picture = picture;
    if (this.mode === "Modificar") {
      let alert = this.alertCtrl.create({
        message: 'Seguro que desea eliminar a ' + this.currentPerson.name + '?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.userService.deleteUser(this.currentPerson);
              console.log("Yes clicked");
            }
          }
        ]
      });
      (await alert).present();
    } else {
      console.log("Succesful change to " + id + status + building + picture);
    }
  }
  modifyPerson(user: User) {
    this.userService.modifyUser(user);
    this.people.subscribe(this.myObserver);
    this.people = this.userService.getAll();
  }
  goToEdit() {
    this.router.navigateByUrl(`/add`);
    this.people.subscribe(this.myObserver);
    this.people = this.userService.getAll();
  }
  goToDelete() {
    this.showed = !(this.showed);
    this.delete = !(this.delete);
    if (this.showed) {
      this.phrase = "Escoja a quien modificar pinchando en la foto";
      this.mode = "Eliminar";
      this.people.subscribe(this.myObserver);
      this.people = this.userService.getAll();
    } else {
      this.phrase = "Escoja a quien eliminar pinchando en la foto";
      this.mode = "Modificar";
      this.people.subscribe(this.myObserver);
      this.people = this.userService.getAll();
    }
  }
}
