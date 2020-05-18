export class ErrorMessage {

    constructor(

        public forControl: string,

        public forValidator: string,

        public text: string

    ) { }

}

export const ShoppinglistFormErrorMessages = [

    new ErrorMessage('id', 'required', 'Die Listen ID muss angegeben werden.'),

    new ErrorMessage('user_id', 'required', 'Die ID des Hilfesuchenden muss angegeben werden.'),

    new ErrorMessage('until', 'required', 'Es muss angegeben werden, bis wann die Einkäufe gebraucht werden.'),

    new ErrorMessage('listarticles', 'required', 'Es muss mindestens ein Listenartikel angegeben werden.'),


];
