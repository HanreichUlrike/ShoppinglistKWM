
import { Pivot } from './pivot' ;
export { Pivot } from './pivot' ;

export class Article {

    constructor (
        public id:number,
        public term?:string,
        public pivot?:Pivot

    ) { }

}
