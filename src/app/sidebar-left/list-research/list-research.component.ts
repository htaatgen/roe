import { Component } from '@angular/core';
import {TechService} from "../../_services/tech.service";
import {PlayerService} from "../../_services/player.service";

@Component({
  selector: 'app-list-research',
  templateUrl: './list-research.component.html',
  styleUrls: ['./list-research.component.css']
})
export class ListResearchComponent {

  constructor(public tech:TechService, public player:PlayerService) { }

}
