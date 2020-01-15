import {Component, ElementRef, ViewChild} from '@angular/core';
import {MapService} from "../../_services/map.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-save',
    templateUrl: './save.component.html',
    styleUrls: ['./save.component.css']
})
export class SaveComponent {
    @ViewChild('saveElement', {static: false}) saveElement: ElementRef;
    public saveElementHref;

    constructor(public map: MapService, private sanitizer: DomSanitizer) {
    }


    save() {
        const save = {
            map: JSON.stringify(this.map.tiles.map(tile => tile.toJson()))
        };

        this.saveElementHref = this.sanitizer.bypassSecurityTrustUrl('data:,' + JSON.stringify(save));
        setTimeout(()=>  this.saveElement.nativeElement.click(), 1);

    }
}
