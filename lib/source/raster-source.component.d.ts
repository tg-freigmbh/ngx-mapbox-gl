import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { RasterSource } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class RasterSourceComponent implements OnInit, OnDestroy, OnChanges, RasterSource {
    private mapService;
    id: string;
    url?: RasterSource['url'];
    tiles?: RasterSource['tiles'];
    bounds?: RasterSource['bounds'];
    minzoom?: RasterSource['minzoom'];
    maxzoom?: RasterSource['maxzoom'];
    tileSize?: RasterSource['tileSize'];
    scheme?: RasterSource['scheme'];
    attribution?: RasterSource['attribution'];
    readonly type: RasterSource['type'];
    private sourceAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<RasterSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RasterSourceComponent, "mgl-raster-source", never, { "id": { "alias": "id"; "required": false; }; "url": { "alias": "url"; "required": false; }; "tiles": { "alias": "tiles"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "minzoom": { "alias": "minzoom"; "required": false; }; "maxzoom": { "alias": "maxzoom"; "required": false; }; "tileSize": { "alias": "tileSize"; "required": false; }; "scheme": { "alias": "scheme"; "required": false; }; "attribution": { "alias": "attribution"; "required": false; }; }, {}, never, never, false, never>;
}
