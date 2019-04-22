import { Component } from '@angular/core';
import {MessageService} from "../../_services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{
  constructor(public message: MessageService) { }

}
