import { EventEmitter, InjectionToken, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { FlyToOptions, LayerEvents, LayerSpecificationLayout, LayerSpecificationPaint, MapEvent, MapImageData, MapImageOptions } from './map.types';
import { Map, AnimationOptions, SourceSpecification, Source, CameraOptions, FitBoundsOptions, IControl, Layer, LngLatBoundsLike, LngLatLike, MapOptions, Marker, MarkerOptions, PointLike, Popup, PopupOptions, Style, ControlPosition } from 'mapbox-gl';
import * as i0 from "@angular/core";
export declare const MAPBOX_API_KEY: InjectionToken<unknown>;
export interface SetupMap {
    accessToken?: string;
    mapOptions: MapOptions;
    mapEvents: MapEvent;
}
export interface SetupLayer {
    layerOptions: Layer;
    layerEvents: LayerEvents;
}
export interface SetupPopup {
    popupOptions: PopupOptions;
    popupEvents: {
        open: EventEmitter<void>;
        close: EventEmitter<void>;
        popupOpen: EventEmitter<void>;
        popupClose: EventEmitter<void>;
    };
}
export interface SetupMarker {
    markersOptions: MarkerOptions & {
        feature?: GeoJSON.Feature<GeoJSON.Point>;
        lngLat?: LngLatLike;
    };
    markersEvents: {
        markerDragStart: EventEmitter<Marker>;
        markerDrag: EventEmitter<Marker>;
        markerDragEnd: EventEmitter<Marker>;
    };
}
export type MovingOptions = FlyToOptions | (AnimationOptions & CameraOptions) | CameraOptions;
export declare class MapService {
    private zone;
    private readonly MAPBOX_API_KEY;
    mapInstance: Map;
    mapCreated$: Observable<void>;
    mapLoaded$: Observable<void>;
    mapEvents: MapEvent;
    private mapCreated;
    private mapLoaded;
    private markersToRemove;
    private popupsToRemove;
    private imageIdsToRemove;
    private subscription;
    constructor(zone: NgZone, MAPBOX_API_KEY: string | null);
    setup(options: SetupMap): void;
    destroyMap(): void;
    updateProjection(projection: MapOptions['projection']): void;
    updateMinZoom(minZoom: number): void;
    updateMaxZoom(maxZoom: number): void;
    updateMinPitch(minPitch: number): void;
    updateMaxPitch(maxPitch: number): void;
    updateRenderWorldCopies(status: boolean): void;
    updateScrollZoom(status: boolean): void;
    updateDragRotate(status: boolean): void;
    updateTouchPitch(status: boolean): void;
    updateTouchZoomRotate(status: boolean): void;
    updateDoubleClickZoom(status: boolean): void;
    updateKeyboard(status: boolean): void;
    updateDragPan(status: boolean): void;
    updateBoxZoom(status: boolean): void;
    updateStyle(style: Style): void;
    updateMaxBounds(maxBounds: LngLatBoundsLike): void;
    changeCanvasCursor(cursor: string): void;
    queryRenderedFeatures(pointOrBox: PointLike | [PointLike, PointLike], parameters?: {
        layers?: string[];
        filter?: any[];
    }): GeoJSON.Feature<GeoJSON.GeometryObject>[];
    panTo(center: LngLatLike, options?: AnimationOptions): void;
    move(movingMethod: 'jumpTo' | 'easeTo' | 'flyTo', movingOptions?: MovingOptions, zoom?: number, center?: LngLatLike, bearing?: number, pitch?: number): void;
    addLayer(layer: SetupLayer, bindEvents: boolean, before?: string): void;
    removeLayer(layerId: string): void;
    addMarker(marker: SetupMarker): Marker;
    removeMarker(marker: Marker): void;
    createPopup(popup: SetupPopup, element: Node): Popup;
    addPopupToMap(popup: Popup, lngLat: LngLatLike, skipOpenEvent?: boolean): void;
    addPopupToMarker(marker: Marker, popup: Popup): void;
    removePopupFromMap(popup: Popup, skipCloseEvent?: boolean): void;
    removePopupFromMarker(marker: Marker): void;
    addControl(control: IControl, position?: ControlPosition): void;
    removeControl(control: IControl): void;
    loadAndAddImage(imageId: string, url: string, options?: MapImageOptions): Promise<void>;
    addImage(imageId: string, data: MapImageData, options?: MapImageOptions): void;
    removeImage(imageId: string): void;
    addSource(sourceId: string, source: SourceSpecification): void;
    getSource<T extends Source>(sourceId: string): T;
    removeSource(sourceId: string): void;
    setAllLayerPaintProperty(layerId: string, paint: LayerSpecificationPaint): void;
    setAllLayerLayoutProperty(layerId: string, layout: LayerSpecificationLayout): void;
    setLayerFilter(layerId: string, filter: any[]): void;
    setLayerBefore(layerId: string, beforeId: string): void;
    setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number): void;
    fitBounds(bounds: LngLatBoundsLike, options?: FitBoundsOptions): void;
    fitScreenCoordinates(points: [PointLike, PointLike], bearing: number, options?: AnimationOptions & CameraOptions): void;
    applyChanges(): void;
    private createMap;
    private removeMarkers;
    private removePopups;
    private removeImages;
    private findLayersBySourceId;
    private hookEvents;
    private assign;
    static ɵfac: i0.ɵɵFactoryDeclaration<MapService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MapService>;
}
