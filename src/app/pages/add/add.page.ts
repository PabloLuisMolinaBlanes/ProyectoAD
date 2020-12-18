import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
human: User = new User(-1, "a", "a", "a", "a");
constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  createUser(user:User){
    this.userService.createUser(user);
    this.router.navigateByUrl(`/mainmenu`);
  }

}
