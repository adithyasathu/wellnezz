import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login.component";
import { NativeScriptFormsModule } from "nativescript-angular";
import { ReactiveFormsModule } from "@angular/forms";

export const routerConfig = [
    {
        path: "",
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [ LoginComponent ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class LoginModule { }
