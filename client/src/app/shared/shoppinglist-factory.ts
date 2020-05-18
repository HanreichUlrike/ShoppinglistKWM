import {Article, Shoppinglist, Pivot} from './shoppinglist' ;


export class ShoppinglistFactory {

    static empty ():Shoppinglist {
        return new Shoppinglist(
            0,
            0,
            new Date(),
            0,
            0,
            '',
            [
                new Article(
                    0,
                    '',
                    new Pivot(
                        '',
                        0
                    )
                )
            ]
        )
    };


    static fromObject (rawShoppinglist: any ):Shoppinglist {
        return new Shoppinglist(
            rawShoppinglist.id ,
            rawShoppinglist.user_id,
            typeof (rawShoppinglist.until) === 'string' ?
                new Date (rawShoppinglist.until) : rawShoppinglist.until,
            rawShoppinglist.helper_id ,
            rawShoppinglist.price,
            rawShoppinglist.comments,
            rawShoppinglist.articles,
        );
    }

}
