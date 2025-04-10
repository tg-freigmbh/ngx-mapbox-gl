import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AnimationOptions, LngLatBoundsLike, Map, MapOptions, PointLike } from 'mapbox-gl';
import { MapService, MovingOptions } from './map.service';
import { MapEvent } from './map.types';
import * as i0 from "@angular/core";
export declare class MapComponent implements OnChanges, OnDestroy, AfterViewInit, Omit<MapOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>, MapEvent {
    private mapService;
    accessToken?: MapOptions['accessToken'];
    collectResourceTiming?: MapOptions['collectResourceTiming'];
    crossSourceCollisions?: MapOptions['crossSourceCollisions'];
    customMapboxApiUrl?: string;
    fadeDuration?: MapOptions['fadeDuration'];
    hash?: MapOptions['hash'];
    refreshExpiredTiles?: MapOptions['refreshExpiredTiles'];
    failIfMajorPerformanceCaveat?: MapOptions['failIfMajorPerformanceCaveat'];
    bearingSnap?: MapOptions['bearingSnap'];
    interactive?: MapOptions['interactive'];
    pitchWithRotate?: MapOptions['pitchWithRotate'];
    clickTolerance?: MapOptions['clickTolerance'];
    attributionControl?: MapOptions['attributionControl'];
    logoPosition?: MapOptions['logoPosition'];
    maxTileCacheSize?: MapOptions['maxTileCacheSize'];
    localIdeographFontFamily?: MapOptions['localIdeographFontFamily'];
    preserveDrawingBuffer?: MapOptions['preserveDrawingBuffer'];
    trackResize?: MapOptions['trackResize'];
    transformRequest?: MapOptions['transformRequest'];
    bounds?: MapOptions['bounds'];
    antialias?: MapOptions['antialias'];
    locale?: MapOptions['locale'];
    cooperativeGestures?: MapOptions['cooperativeGestures'];
    minZoom?: MapOptions['minZoom'];
    maxZoom?: MapOptions['maxZoom'];
    minPitch?: MapOptions['minPitch'];
    maxPitch?: MapOptions['maxPitch'];
    scrollZoom?: MapOptions['scrollZoom'];
    dragRotate?: MapOptions['dragRotate'];
    touchPitch?: MapOptions['touchPitch'];
    touchZoomRotate?: MapOptions['touchZoomRotate'];
    doubleClickZoom?: MapOptions['doubleClickZoom'];
    keyboard?: MapOptions['keyboard'];
    dragPan?: MapOptions['dragPan'];
    boxZoom?: MapOptions['boxZoom'];
    style: MapOptions['style'];
    center?: MapOptions['center'];
    maxBounds?: MapOptions['maxBounds'];
    zoom?: MapOptions['zoom'];
    bearing?: MapOptions['bearing'];
    pitch?: MapOptions['bearing'];
    fitBoundsOptions?: MapOptions['fitBoundsOptions'];
    renderWorldCopies?: MapOptions['renderWorldCopies'];
    projection?: MapOptions['projection'];
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo';
    movingOptions?: MovingOptions;
    fitBounds?: LngLatBoundsLike;
    fitScreenCoordinates?: [PointLike, PointLike];
    centerWithPanTo?: boolean;
    panToOptions?: AnimationOptions;
    cursorStyle?: string;
    mapResize: EventEmitter<{
        type: "resize";
        target: Map;
    }>;
    mapRemove: EventEmitter<{
        type: "remove";
        target: Map;
    }>;
    mapMouseDown: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapMouseUp: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapMouseMove: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapClick: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapDblClick: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapMouseOver: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapMouseOut: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapContextMenu: EventEmitter<import("mapbox-gl").MapMouseEvent>;
    mapTouchStart: EventEmitter<import("mapbox-gl").MapTouchEvent>;
    mapTouchEnd: EventEmitter<import("mapbox-gl").MapTouchEvent>;
    mapTouchMove: EventEmitter<import("mapbox-gl").MapTouchEvent>;
    mapTouchCancel: EventEmitter<import("mapbox-gl").MapTouchEvent>;
    mapWheel: EventEmitter<import("mapbox-gl").MapWheelEvent>;
    moveStart: EventEmitter<{
        type: "movestart";
        target: Map;
    } & {
        originalEvent?: MouseEvent | WheelEvent | TouchEvent;
    }>;
    move: EventEmitter<{
        type: "move";
        target: Map;
    } & {
        originalEvent?: MouseEvent | WheelEvent | TouchEvent;
    }>;
    moveEnd: EventEmitter<{
        type: "moveend";
        target: Map;
    } & {
        originalEvent?: MouseEvent | WheelEvent | TouchEvent;
    }>;
    mapDragStart: EventEmitter<{
        type: "dragstart";
        target: Map;
    } & {
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    mapDrag: EventEmitter<{
        type: "drag";
        target: Map;
    } & {
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    mapDragEnd: EventEmitter<{
        type: "dragend";
        target: Map;
    } & {
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    zoomStart: EventEmitter<{
        type: "zoomstart";
        target: Map;
    }>;
    zoomEvt: EventEmitter<{
        type: "zoom";
        target: Map;
    }>;
    zoomEnd: EventEmitter<{
        type: "zoomend";
        target: Map;
    }>;
    rotateStart: EventEmitter<{
        type: "rotatestart";
        target: Map;
    } & {
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    rotate: EventEmitter<{
        type: "rotate";
        target: Map;
    } & {
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    rotateEnd: EventEmitter<{
        type: "rotateend";
        target: Map;
    } & {
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    pitchStart: EventEmitter<{
        type: "pitchstart";
        target: Map;
    }>;
    pitchEvt: EventEmitter<{
        type: "pitch";
        target: Map;
    }>;
    pitchEnd: EventEmitter<{
        type: "pitchend";
        target: Map;
    }>;
    boxZoomStart: EventEmitter<{
        type: "boxzoomstart";
        target: Map;
    } & {
        originalEvent?: MouseEvent | KeyboardEvent;
    }>;
    boxZoomEnd: EventEmitter<{
        type: "boxzoomend";
        target: Map;
    } & {
        originalEvent?: MouseEvent;
    }>;
    boxZoomCancel: EventEmitter<{
        type: "boxzoomcancel";
        target: Map;
    } & {
        originalEvent?: MouseEvent | KeyboardEvent;
    }>;
    webGlContextLost: EventEmitter<{
        type: "webglcontextlost";
        target: Map;
    } & {
        originalEvent?: WebGLContextEvent;
    }>;
    webGlContextRestored: EventEmitter<{
        type: "webglcontextrestored";
        target: Map;
    } & {
        originalEvent?: WebGLContextEvent;
    }>;
    mapLoad: EventEmitter<{
        type: "load";
        target: Map;
    }>;
    mapCreate: EventEmitter<Map>;
    idle: EventEmitter<{
        type: "idle";
        target: Map;
    }>;
    render: EventEmitter<{
        type: "render";
        target: Map;
    }>;
    mapError: EventEmitter<{
        type: "error";
        target: Map;
    } & {
        error: Error;
    }>;
    data: EventEmitter<{
        type: "data";
        target: Map;
    } & import("mapbox-gl").MapDataEvent>;
    styleData: EventEmitter<{
        type: "styledata";
        target: Map;
    } & import("mapbox-gl").MapStyleDataEvent>;
    sourceData: EventEmitter<{
        type: "sourcedata";
        target: Map;
    } & import("mapbox-gl").MapSourceDataEvent>;
    dataLoading: EventEmitter<{
        type: "dataloading";
        target: Map;
    } & import("mapbox-gl").MapDataEvent>;
    styleDataLoading: EventEmitter<{
        type: "styledataloading";
        target: Map;
    } & import("mapbox-gl").MapStyleDataEvent>;
    sourceDataLoading: EventEmitter<{
        type: "sourcedataloading";
        target: Map;
    } & import("mapbox-gl").MapSourceDataEvent>;
    styleImageMissing: EventEmitter<{
        type: "styleimagemissing";
        target: Map;
    } & {
        id: string;
    }>;
    load: EventEmitter<Map>;
    get mapInstance(): Map;
    mapContainer: ElementRef;
    constructor(mapService: MapService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MapComponent, "mgl-map", never, { "accessToken": { "alias": "accessToken"; "required": false; }; "collectResourceTiming": { "alias": "collectResourceTiming"; "required": false; }; "crossSourceCollisions": { "alias": "crossSourceCollisions"; "required": false; }; "customMapboxApiUrl": { "alias": "customMapboxApiUrl"; "required": false; }; "fadeDuration": { "alias": "fadeDuration"; "required": false; }; "hash": { "alias": "hash"; "required": false; }; "refreshExpiredTiles": { "alias": "refreshExpiredTiles"; "required": false; }; "failIfMajorPerformanceCaveat": { "alias": "failIfMajorPerformanceCaveat"; "required": false; }; "bearingSnap": { "alias": "bearingSnap"; "required": false; }; "interactive": { "alias": "interactive"; "required": false; }; "pitchWithRotate": { "alias": "pitchWithRotate"; "required": false; }; "clickTolerance": { "alias": "clickTolerance"; "required": false; }; "attributionControl": { "alias": "attributionControl"; "required": false; }; "logoPosition": { "alias": "logoPosition"; "required": false; }; "maxTileCacheSize": { "alias": "maxTileCacheSize"; "required": false; }; "localIdeographFontFamily": { "alias": "localIdeographFontFamily"; "required": false; }; "preserveDrawingBuffer": { "alias": "preserveDrawingBuffer"; "required": false; }; "trackResize": { "alias": "trackResize"; "required": false; }; "transformRequest": { "alias": "transformRequest"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "antialias": { "alias": "antialias"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "cooperativeGestures": { "alias": "cooperativeGestures"; "required": false; }; "minZoom": { "alias": "minZoom"; "required": false; }; "maxZoom": { "alias": "maxZoom"; "required": false; }; "minPitch": { "alias": "minPitch"; "required": false; }; "maxPitch": { "alias": "maxPitch"; "required": false; }; "scrollZoom": { "alias": "scrollZoom"; "required": false; }; "dragRotate": { "alias": "dragRotate"; "required": false; }; "touchPitch": { "alias": "touchPitch"; "required": false; }; "touchZoomRotate": { "alias": "touchZoomRotate"; "required": false; }; "doubleClickZoom": { "alias": "doubleClickZoom"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "dragPan": { "alias": "dragPan"; "required": false; }; "boxZoom": { "alias": "boxZoom"; "required": false; }; "style": { "alias": "style"; "required": false; }; "center": { "alias": "center"; "required": false; }; "maxBounds": { "alias": "maxBounds"; "required": false; }; "zoom": { "alias": "zoom"; "required": false; }; "bearing": { "alias": "bearing"; "required": false; }; "pitch": { "alias": "pitch"; "required": false; }; "fitBoundsOptions": { "alias": "fitBoundsOptions"; "required": false; }; "renderWorldCopies": { "alias": "renderWorldCopies"; "required": false; }; "projection": { "alias": "projection"; "required": false; }; "movingMethod": { "alias": "movingMethod"; "required": false; }; "movingOptions": { "alias": "movingOptions"; "required": false; }; "fitBounds": { "alias": "fitBounds"; "required": false; }; "fitScreenCoordinates": { "alias": "fitScreenCoordinates"; "required": false; }; "centerWithPanTo": { "alias": "centerWithPanTo"; "required": false; }; "panToOptions": { "alias": "panToOptions"; "required": false; }; "cursorStyle": { "alias": "cursorStyle"; "required": false; }; }, { "mapResize": "mapResize"; "mapRemove": "mapRemove"; "mapMouseDown": "mapMouseDown"; "mapMouseUp": "mapMouseUp"; "mapMouseMove": "mapMouseMove"; "mapClick": "mapClick"; "mapDblClick": "mapDblClick"; "mapMouseOver": "mapMouseOver"; "mapMouseOut": "mapMouseOut"; "mapContextMenu": "mapContextMenu"; "mapTouchStart": "mapTouchStart"; "mapTouchEnd": "mapTouchEnd"; "mapTouchMove": "mapTouchMove"; "mapTouchCancel": "mapTouchCancel"; "mapWheel": "mapWheel"; "moveStart": "moveStart"; "move": "move"; "moveEnd": "moveEnd"; "mapDragStart": "mapDragStart"; "mapDrag": "mapDrag"; "mapDragEnd": "mapDragEnd"; "zoomStart": "zoomStart"; "zoomEvt": "zoomEvt"; "zoomEnd": "zoomEnd"; "rotateStart": "rotateStart"; "rotate": "rotate"; "rotateEnd": "rotateEnd"; "pitchStart": "pitchStart"; "pitchEvt": "pitchEvt"; "pitchEnd": "pitchEnd"; "boxZoomStart": "boxZoomStart"; "boxZoomEnd": "boxZoomEnd"; "boxZoomCancel": "boxZoomCancel"; "webGlContextLost": "webGlContextLost"; "webGlContextRestored": "webGlContextRestored"; "mapLoad": "mapLoad"; "mapCreate": "mapCreate"; "idle": "idle"; "render": "render"; "mapError": "mapError"; "data": "data"; "styleData": "styleData"; "sourceData": "sourceData"; "dataLoading": "dataLoading"; "styleDataLoading": "styleDataLoading"; "sourceDataLoading": "sourceDataLoading"; "styleImageMissing": "styleImageMissing"; "load": "load"; }, never, never, false, never>;
}
