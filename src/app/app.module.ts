import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationService } from "~/app/shared/navigation.service";
import { LoginModule } from "~/app/login/login.module";
import { PromotionsModule } from "~/app/promotions/promotions.module";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { UserService } from "~/app/shared/user.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        LoginModule,
        PromotionsModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    providers: [
        NavigationService,
        LoadingIndicator,
        UserService
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
