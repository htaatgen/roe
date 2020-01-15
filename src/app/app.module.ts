import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSliderModule } from "@angular/material/slider";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {EmpiresComponent} from './header/modal-empires/empires.component';
import {FooterComponent} from './footer/footer.component';
import {SettlementComponent} from './footer/settlement/settlement.component';
import {TileComponent} from './footer/tile/tile.component';
import {UnitComponent} from './footer/unit/unit.component';
import {ModalNewUnitComponent} from './footer/modal-new-unit/modal-new-unit.component';
import {ArmyComponent} from './footer/army/army.component';
import {MessageComponent} from './header/message/message.component';
import {ModalTechtreeComponent} from './header/modal-techtree/modal-techtree.component';
import {SidebarRightComponent} from './sidebar-right/sidebar-right.component';
import {ListArmiesComponent} from './sidebar-right/list-armies/list-armies.component';
import {ListResearchComponent} from './sidebar-left/list-research/list-research.component';
import {ListSettlementsComponent} from './sidebar-right/list-settlements/list-settlements.component';
import {ModalNewGameComponent} from './modal-new-game/modal-new-game.component';
import {SidebarLeftComponent} from './sidebar-left/sidebar-left.component';
import {TileArmiesComponent} from './footer/tile-armies/tile-armies.component';
import {EmpireStatsComponent} from './header/empire-stats/empire-stats.component';
import {SaveComponent} from './header/save/save.component';
import {LoadComponent} from './header/load/load.component';
import {ModalMenuComponent} from './header/modal-menu/modal-menu.component';
import {CanvasComponent} from './canvas/canvas.component';
import {ModalLoadGameComponent} from './modal-load-game/modal-load-game.component';
import {MainMenuComponent} from './main-menu/main-menu.component';

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
        ModalNewGameComponent,
        SidebarLeftComponent,
        TileArmiesComponent,
        EmpireStatsComponent,
        SaveComponent,
        LoadComponent,
        ModalMenuComponent,
        CanvasComponent,
        ModalLoadGameComponent,
        MainMenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTabsModule,
        MatListModule,
        MatProgressBarModule,
        MatSliderModule
    ],
    entryComponents: [
        EmpiresComponent,
        TileComponent,
        SettlementComponent,
        UnitComponent,
        ModalNewUnitComponent,
        ModalTechtreeComponent,
        ModalNewGameComponent,
        ModalMenuComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
