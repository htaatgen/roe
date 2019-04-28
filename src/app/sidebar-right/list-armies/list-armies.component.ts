import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../_services/player.service";

@Component({
  selector: 'app-list-armies',
  templateUrl: './list-armies.component.html',
  styleUrls: ['./list-armies.component.css']
})
export class ListArmiesComponent implements OnInit {

  constructor(public player: PlayerService) { }

  ngOnInit() {
  }

}
