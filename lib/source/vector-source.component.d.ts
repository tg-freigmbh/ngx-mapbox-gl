import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { VectorSource } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class VectorSourceComponent implements OnInit, OnDestroy, OnChanges, VectorSource {
    private mapService;
    id: string;
    url?: VectorSource['url'];
    tiles?: VectorSource['tiles'];
    bounds?: VectorSource['bounds'];
    scheme?: VectorSource['scheme'];
    minzoom?: VectorSource['minzoom'];
    maxzoom?: VectorSource['maxzoom'];
    attribution?: VectorSource['attribution'];
    promoteId?: VectorSource['promoteId'];
    readonly type: VectorSource['type'];
    private sourceAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<VectorSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VectorSourceComponent, "mgl-vector-source", never, { "id": { "alias": "id"; "required": false; }; "url": { "alias": "url"; "required": false; }; "tiles": { "alias": "tiles"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "scheme": { "alias": "scheme"; "required": false; }; "minzoom": { "alias": "minzoom"; "required": false; }; "maxzoom": { "alias": "maxzoom"; "required": false; }; "attribution": { "alias": "attribution"; "required": false; }; "promoteId": { "alias": "promoteId"; "required": false; }; }, {}, never, never, false, never>;
}
