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
import { LoadingModule } from "~/app/loading/loading.module";
import { NativeScriptFormsModule } from "nativescript-angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        LoadingModule,
        LoginModule,
        PromotionsModule,
        ReactiveFormsModule,
        NativeScriptModule,
        NativeScriptFormsModule,
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
