import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { VideoSourceOptions } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class VideoSourceComponent implements OnInit, OnDestroy, OnChanges, VideoSourceOptions {
    private mapService;
    id: string;
    urls: VideoSourceOptions['urls'];
    coordinates: VideoSourceOptions['coordinates'];
    private sourceAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<VideoSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VideoSourceComponent, "mgl-video-source", never, { "id": { "alias": "id"; "required": false; }; "urls": { "alias": "urls"; "required": false; }; "coordinates": { "alias": "coordinates"; "required": false; }; }, {}, never, never, false, never>;
}
