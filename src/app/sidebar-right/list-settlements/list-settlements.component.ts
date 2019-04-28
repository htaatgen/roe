import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../_services/player.service";

@Component({
  selector: 'app-list-settlements',
  templateUrl: './list-settlements.component.html',
  styleUrls: ['./list-settlements.component.css']
})
export class ListSettlementsComponent implements OnInit {

  constructor(public player: PlayerService) { }

  ngOnInit() {
  }

}
