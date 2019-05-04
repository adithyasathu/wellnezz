import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { PromotionDetailEditComponent } from "./promotion-detail-edit/promotion-detail-edit.component";
import { MyImageAddRemoveComponent } from "./promotion-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./promotion-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./promotion-detail-edit/my-list-selector/my-list-selector.component";
import { PromotionDetailComponent } from "./promotion-detail/promotion-detail.component";
import { PromotionListComponent } from "./promotion-list.component";
import { PromotionsRoutingModule } from "./promotions-routing.module";
import { SharedModule } from "~/app/shared/shared.module";

@NgModule({
    imports: [
        PromotionsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        SharedModule
    ],
    declarations: [
        PromotionListComponent,
        PromotionDetailComponent,
        PromotionDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PromotionsModule { }
