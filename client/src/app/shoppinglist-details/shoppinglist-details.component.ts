import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shoppinglist} from '../shared/shoppinglist';
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {AuthService} from "../shared/authentication.service";
import {User} from "../shared/user";


@Component({
  selector: 'sl-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styles: []
})

export class ShoppinglistDetailsComponent implements OnInit{

  user: User;

  role: boolean;

  shoppinglist:Shoppinglist = ShoppinglistFactory.empty();

  constructor(
      private sl: ShoppingListService,
      private router: Router,
      private route: ActivatedRoute,
      public authService: AuthService
  )
  { }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.sl.getSingle(params['id']).subscribe(l=>this.shoppinglist = l);

    let user_id = localStorage.getItem("userId");
    this.sl.getUser(user_id).subscribe(res => this.user = res);

    if(this.isLoggedIn()) {
      this.isHelper();
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public isHelper():any {
    this.sl.getUser(localStorage.getItem("userId")).subscribe(
        (res) => {
          if (res.seeker) {
            this.role = true;
          } else {
            this.role = false;
          }
        },
        (err) => {
          console.log(err);
          return false;
        }
    );
  }


  removeShoppinglist () {
    if ( confirm ( 'Liste wirklich löschen?' )) {
      this.sl.remove ( this.shoppinglist.id)
          .subscribe (res => this.router.navigate ([ '../' ], { relativeTo:this.route }));
    }
  }


}
