import {Component, EventEmitter, OnInit, Output  } from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {Shoppinglist, Article} from "../shared/shoppinglist";

@Component({
  selector: 'sl-shoppinglist-list',
  templateUrl: './shoppinglist-list.component.html',
  styles: []
})


export class ShoppinglistListComponent implements OnInit {

  shoppinglists : Shoppinglist[];

  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  constructor (private sl:ShoppingListService) { }


  ngOnInit(): void {
    this.sl.getAll().subscribe (res => this.shoppinglists = res);

  }

}


