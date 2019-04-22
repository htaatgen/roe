import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    messages=[];

    constructor() {
    }

    addMessage(message, colour){
        const id = window.performance.now();
        this.messages.push({message:message, colour:colour, id:id})

        setTimeout(()=>this.messages.splice(this.messages.indexOf(message => message.id == id ), 1), 2000)
    }
}
