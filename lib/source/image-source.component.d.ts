import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { ImageSourceOptions } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class ImageSourceComponent implements OnInit, OnDestroy, OnChanges, ImageSourceOptions {
    private mapService;
    id: string;
    url: ImageSourceOptions['url'];
    coordinates: ImageSourceOptions['coordinates'];
    private sub;
    private sourceId?;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageSourceComponent, "mgl-image-source", never, { "id": { "alias": "id"; "required": false; }; "url": { "alias": "url"; "required": false; }; "coordinates": { "alias": "coordinates"; "required": false; }; }, {}, never, never, false, never>;
}
