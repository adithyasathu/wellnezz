import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    {
        path: "promotions",
        loadChildren: "~/app/promotions/promotions.module#PromotionsModule"
    },
    {
        path: "loading",
        loadChildren: "~/app/loading/loading.module#LoadingModule"
    },
    {
        path: "login",
        loadChildren: "~/app/login/login.module#LoginModule"
    },
    {
        path: "",
        redirectTo: "loading",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
