import { Component, OnInit, Input } from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {AuthService} from "../shared/authentication.service";
import {ShoppingListService} from "../shared/shopping-list.service";
import {User} from "../shared/user";

@Component({
  selector: 'a.sl-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styles: []
})
export class ShoppinglistComponent implements OnInit {
  @Input() shoppinglist: Shoppinglist;
  user : User;

  constructor(private authService: AuthService,  private sl:ShoppingListService,
  ) {}


  ngOnInit(): void {
    let user_id = localStorage.getItem("userId");
    this.sl.getUser(user_id).subscribe(res => this.user = res);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
