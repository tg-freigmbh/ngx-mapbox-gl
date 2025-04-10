import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { CanvasSourceOptions } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class CanvasSourceComponent implements OnInit, OnDestroy, OnChanges, CanvasSourceOptions {
    private mapService;
    id: string;
    coordinates: CanvasSourceOptions['coordinates'];
    canvas: CanvasSourceOptions['canvas'];
    animate?: CanvasSourceOptions['animate'];
    private sourceAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasSourceComponent, "mgl-canvas-source", never, { "id": { "alias": "id"; "required": false; }; "coordinates": { "alias": "coordinates"; "required": false; }; "canvas": { "alias": "canvas"; "required": false; }; "animate": { "alias": "animate"; "required": false; }; }, {}, never, never, false, never>;
}
