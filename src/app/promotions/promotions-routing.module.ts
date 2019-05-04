import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PromotionDetailEditComponent } from "./promotion-detail-edit/promotion-detail-edit.component";
import { PromotionDetailComponent } from "./promotion-detail/promotion-detail.component";
import { PromotionListComponent } from "./promotion-list.component";

const routes: Routes = [
    { path: "", component: PromotionListComponent },
    { path: "promotion-detail/:id", component: PromotionDetailComponent },
    { path: "promotion-detail-edit/:id", component: PromotionDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PromotionsRoutingModule { }
