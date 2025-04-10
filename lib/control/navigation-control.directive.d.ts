import { AfterContentInit } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export declare class NavigationControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    showCompass?: boolean;
    showZoom?: boolean;
    constructor(mapService: MapService, controlComponent: ControlComponent<NavigationControl>);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationControlDirective, [null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationControlDirective, "[mglNavigation]", never, { "showCompass": { "alias": "showCompass"; "required": false; }; "showZoom": { "alias": "showZoom"; "required": false; }; }, {}, never, never, false, never>;
}
