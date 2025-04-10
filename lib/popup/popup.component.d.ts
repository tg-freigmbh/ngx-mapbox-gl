import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LngLatLike, PointLike, Popup, PopupOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import * as i0 from "@angular/core";
export declare class PopupComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
    private mapService;
    closeButton?: PopupOptions['closeButton'];
    closeOnClick?: PopupOptions['closeOnClick'];
    closeOnMove?: PopupOptions['closeOnMove'];
    focusAfterOpen?: PopupOptions['focusAfterOpen'];
    anchor?: PopupOptions['anchor'];
    className?: PopupOptions['className'];
    maxWidth?: PopupOptions['maxWidth'];
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    marker?: MarkerComponent;
    offset?: number | PointLike | {
        [anchor: string]: [number, number];
    };
    popupClose: EventEmitter<void>;
    popupOpen: EventEmitter<void>;
    /**
     * @deprecated Use popupClose instead
     */
    close: EventEmitter<void>;
    /**
     * @deprecated Use popupOpen instead
     */
    open: EventEmitter<void>;
    content: ElementRef;
    popupInstance?: Popup;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private createPopup;
    private addPopup;
    private warnDeprecatedOutputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopupComponent, "mgl-popup", never, { "closeButton": { "alias": "closeButton"; "required": false; }; "closeOnClick": { "alias": "closeOnClick"; "required": false; }; "closeOnMove": { "alias": "closeOnMove"; "required": false; }; "focusAfterOpen": { "alias": "focusAfterOpen"; "required": false; }; "anchor": { "alias": "anchor"; "required": false; }; "className": { "alias": "className"; "required": false; }; "maxWidth": { "alias": "maxWidth"; "required": false; }; "feature": { "alias": "feature"; "required": false; }; "lngLat": { "alias": "lngLat"; "required": false; }; "marker": { "alias": "marker"; "required": false; }; "offset": { "alias": "offset"; "required": false; }; }, { "popupClose": "popupClose"; "popupOpen": "popupOpen"; "close": "close"; "open": "open"; }, never, ["*"], false, never>;
}
