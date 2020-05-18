import {Component, Input, OnInit} from '@angular/core';
import { User } from "../shared/user";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
  selector: 'sl-user',
  templateUrl: './shoppinglist-user.component.html',
  styles: []
})

export class ShoppinglistUserComponent implements OnInit {

  user : User;

  constructor(
      private sl:ShoppingListService,
  ) { }

  ngOnInit(): void {
    let user_id = localStorage.getItem("userId");
    this.sl.getUser(user_id).subscribe(res => this.user = res);
  }


  isSeeker(){
    if (this.user.seeker == true){
      return 'JA'
    }
    else{
      return 'NEIN'
    }
  }

  isHelper(){
    if (this.user.helper == true){
      return 'JA'
    }
    else {
      return 'NEIN'
    }

  }

}
