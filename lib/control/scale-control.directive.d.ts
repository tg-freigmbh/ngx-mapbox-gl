import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { ScaleControl, ScaleControlOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export declare class ScaleControlDirective implements AfterContentInit, OnChanges {
    private mapService;
    private controlComponent;
    maxWidth?: ScaleControlOptions['maxWidth'];
    unit?: ScaleControlOptions['unit'];
    constructor(mapService: MapService, controlComponent: ControlComponent<ScaleControl>);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScaleControlDirective, [null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ScaleControlDirective, "[mglScale]", never, { "maxWidth": { "alias": "maxWidth"; "required": false; }; "unit": { "alias": "unit"; "required": false; }; }, {}, never, never, false, never>;
}
