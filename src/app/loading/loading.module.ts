import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoadingComponent } from "./loading.component";

export const routerConfig = [
    {
        path: "",
        component: LoadingComponent
    }
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [ LoadingComponent ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class LoadingModule { }
