import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "./shared/authentication.service";
import {ShoppingListService} from "./shared/shopping-list.service";
import {User} from "./shared/user";


@Component({
    selector: 'bs-root',
    templateUrl: 'app.component.html',
    styles: []
})

export class AppComponent implements OnInit{

    user: User;

    /*wert aus role nach dem ausloggen wieder löschen*/
    role: boolean;

    constructor(private authService: AuthService,
                private sl: ShoppingListService,
    ) {}

    ngOnInit(){
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
                console.log(res);
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


    getLoginLabel() {
        if (this.isLoggedIn()) {
            return "Logout";
        } else {
            return "Login";
        }
    }

}
