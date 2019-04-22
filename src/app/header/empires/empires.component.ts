import { Component, OnInit } from '@angular/core';
import {MapService} from "../../_services/map.service";

@Component({
  selector: 'app-empires',
  templateUrl: './empires.component.html',
  styleUrls: ['./empires.component.css']
})
export class EmpiresComponent implements OnInit {

  constructor(public map:MapService) { }

  ngOnInit() {
  }

}
