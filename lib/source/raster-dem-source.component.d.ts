import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { RasterDEMSource, RasterDEMSourceOptions } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class RasterDemSourceComponent implements OnInit, OnDestroy, OnChanges, RasterDEMSource {
    private mapService;
    id: string;
    url?: RasterDEMSourceOptions['url'];
    tiles?: RasterDEMSourceOptions['tiles'];
    bounds?: RasterDEMSourceOptions['bounds'];
    minzoom?: RasterDEMSourceOptions['minzoom'];
    maxzoom?: RasterDEMSourceOptions['maxzoom'];
    tileSize?: RasterDEMSourceOptions['tileSize'];
    attribution?: RasterDEMSourceOptions['attribution'];
    encoding?: RasterDEMSourceOptions['encoding'];
    readonly type: RasterDEMSource['type'];
    private sourceAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<RasterDemSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RasterDemSourceComponent, "mgl-raster-dem-source", never, { "id": { "alias": "id"; "required": false; }; "url": { "alias": "url"; "required": false; }; "tiles": { "alias": "tiles"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "minzoom": { "alias": "minzoom"; "required": false; }; "maxzoom": { "alias": "maxzoom"; "required": false; }; "tileSize": { "alias": "tileSize"; "required": false; }; "attribution": { "alias": "attribution"; "required": false; }; "encoding": { "alias": "encoding"; "required": false; }; }, {}, never, never, false, never>;
}
