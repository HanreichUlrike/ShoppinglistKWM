import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';

import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {ShoppingListService} from "../shared/shopping-list.service";
import {Article, Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";
import {Pivot} from "../shared/pivot";
import {count} from "rxjs/operators";
import {ShoppinglistListComponent} from "../shoppinglist-list/shoppinglist-list.component";
import {AuthService} from "../shared/authentication.service";

@Component({
    selector: 'sl-shoppinglist-form',
    templateUrl: './shoppinglist-form.component.html'
})

export class ShoppinglistFormComponent implements OnInit {
    shoppinglistForm: FormGroup;
    shoppinglist = ShoppinglistFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingShoppinglist = false;
    articles: FormArray;


    constructor(private fb: FormBuilder,
                private sl: ShoppingListService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isUpdatingShoppinglist = true;
            this.sl.getSingle(id).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;
                this.initShoppinglist();

            });
        }
        this.initShoppinglist();
    }

    initShoppinglist() {

        this.buildListarticlesArray();

        this.shoppinglistForm = this.fb.group({
            id: this.shoppinglist.id,
            user_id: this.shoppinglist.user_id,
            until: this.shoppinglist.until,
            helper_id: this.shoppinglist.helper_id,
            articles: this.articles,
            comments: this.shoppinglist.comments,
            price: this.shoppinglist.price
        });

        this.shoppinglistForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }


    buildListarticlesArray() {


        if (this.shoppinglist.articles.length == 0) {
            this.shoppinglist.articles.push(new Article(
                0,
                '',
                new Pivot('', 0)));
        }

        this.articles = this.fb.array(
            this.shoppinglist.articles.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    term: this.fb.control(t.term),
                    pivot: this.fb.control(t.pivot),
                    unit: this.fb.control(t.pivot.unit),
                    max_price: this.fb.control(t.pivot.max_price),
                })
            )
        );
    }

    addArticleControl() {
        this.articles.push(this.fb.group({term: '', pivot: {unit: '', max_price: 0}}));
    }

    submitForm() {

        const shoppinglist: Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
        shoppinglist.articles = this.shoppinglistForm.value.articles;
        //console.log(shoppinglist);

        if (this.isUpdatingShoppinglist) {
            this.sl.update(shoppinglist).subscribe(res => {
                this.router.navigate(['../../shoppinglists', shoppinglist.id], {relativeTo: this.route});
            });
                } else {

            this.sl.getAll().subscribe(res => {
                shoppinglist.id = res.length + 1
            });

            shoppinglist.user_id = parseInt(localStorage.getItem("userId"));

            this.sl.getUser(shoppinglist.user_id.toString()).subscribe(user => {
                console.log(user)
            });

            this.sl.create(shoppinglist).subscribe(res => {
                this.shoppinglist = ShoppinglistFactory.empty();
                this.shoppinglistForm.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../shoppinglists'], {relativeTo: this.route});
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of ShoppinglistFormErrorMessages) {
            const control = this.shoppinglistForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}
