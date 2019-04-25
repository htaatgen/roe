import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {EmpiresComponent} from './header/empires/empires.component';
import {FooterComponent} from './footer/footer.component';
import {SettlementComponent} from './footer/settlement/settlement.component';
import {TileComponent} from './footer/tile/tile.component';
import {UnitComponent} from './footer/unit/unit.component';
import {ModalNewUnitComponent} from './footer/modal-new-unit/modal-new-unit.component';
import {ArmyComponent} from './footer/army/army.component';
import {MessageComponent} from './header/message/message.component';
import {ModalTechtreeComponent} from './footer/modal-techtree/modal-techtree.component';
import {SidebarRightComponent} from './sidebar-right/sidebar-right.component';
import {ListArmiesComponent} from './sidebar-right/list-armies/list-armies.component';
import {ListResearchComponent} from './sidebar-right/list-research/list-research.component';
import {ListSettlementsComponent} from './sidebar-right/list-settlements/list-settlements.component';
import {ModalNewGameComponent} from './modal-new-game/modal-new-game.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EmpiresComponent,
        FooterComponent,
        SettlementComponent,
        TileComponent,
        UnitComponent,
        ModalNewUnitComponent,
        ArmyComponent,
        MessageComponent,
        ModalTechtreeComponent,
        SidebarRightComponent,
        ListArmiesComponent,
        ListResearchComponent,
        ListSettlementsComponent,
        ModalNewGameComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTabsModule,
        MatListModule,
        MatProgressBarModule
    ],
    entryComponents: [
        EmpiresComponent,
        TileComponent,
        SettlementComponent,
        UnitComponent,
        ModalNewUnitComponent,
        ModalTechtreeComponent,
        ModalNewGameComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
