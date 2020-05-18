
import {Article} from './article' ;
export {Article} from './article' ;

import {Pivot} from './pivot' ;
export {Pivot} from './pivot' ;

export class Shoppinglist{

    constructor (
        public id:number ,
        public user_id:number,
        public until:Date,
        public helper_id?:number ,
        public price?:number,
        public comments?:string,
        public articles?:Article[],
    ) { }
}
