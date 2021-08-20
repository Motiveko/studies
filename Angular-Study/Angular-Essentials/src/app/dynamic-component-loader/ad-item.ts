import { Type } from "@angular/core";
import { AdComponent } from "./ad.component";

export class AdItem {
    constructor(public component: Type<any>, public data: any) {}
}