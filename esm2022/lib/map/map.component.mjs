import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MapService } from './map.service';
import * as i0 from "@angular/core";
import * as i1 from "./map.service";
export class MapComponent {
    get mapInstance() {
        return this.mapService.mapInstance;
    }
    constructor(mapService) {
        this.mapService = mapService;
        /* Added by ngx-mapbox-gl */
        this.movingMethod = 'flyTo';
        this.mapResize = new EventEmitter();
        this.mapRemove = new EventEmitter();
        this.mapMouseDown = new EventEmitter();
        this.mapMouseUp = new EventEmitter();
        this.mapMouseMove = new EventEmitter();
        this.mapClick = new EventEmitter();
        this.mapDblClick = new EventEmitter();
        this.mapMouseOver = new EventEmitter();
        this.mapMouseOut = new EventEmitter();
        this.mapContextMenu = new EventEmitter();
        this.mapTouchStart = new EventEmitter();
        this.mapTouchEnd = new EventEmitter();
        this.mapTouchMove = new EventEmitter();
        this.mapTouchCancel = new EventEmitter();
        this.mapWheel = new EventEmitter();
        this.moveStart = new EventEmitter();
        this.move = new EventEmitter();
        this.moveEnd = new EventEmitter();
        this.mapDragStart = new EventEmitter();
        this.mapDrag = new EventEmitter();
        this.mapDragEnd = new EventEmitter();
        this.zoomStart = new EventEmitter();
        this.zoomEvt = new EventEmitter();
        this.zoomEnd = new EventEmitter();
        this.rotateStart = new EventEmitter();
        this.rotate = new EventEmitter();
        this.rotateEnd = new EventEmitter();
        this.pitchStart = new EventEmitter();
        this.pitchEvt = new EventEmitter();
        this.pitchEnd = new EventEmitter();
        this.boxZoomStart = new EventEmitter();
        this.boxZoomEnd = new EventEmitter();
        this.boxZoomCancel = new EventEmitter();
        this.webGlContextLost = new EventEmitter();
        this.webGlContextRestored = new EventEmitter();
        this.mapLoad = new EventEmitter();
        this.mapCreate = new EventEmitter();
        this.idle = new EventEmitter();
        this.render = new EventEmitter();
        this.mapError = new EventEmitter();
        this.data = new EventEmitter();
        this.styleData = new EventEmitter();
        this.sourceData = new EventEmitter();
        this.dataLoading = new EventEmitter();
        this.styleDataLoading = new EventEmitter();
        this.sourceDataLoading = new EventEmitter();
        this.styleImageMissing = new EventEmitter();
        this.load = new EventEmitter();
    }
    ngAfterViewInit() {
        this.mapService.setup({
            accessToken: this.accessToken,
            mapOptions: {
                collectResourceTiming: this.collectResourceTiming,
                container: this.mapContainer.nativeElement,
                crossSourceCollisions: this.crossSourceCollisions,
                fadeDuration: this.fadeDuration,
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
                minPitch: this.minPitch,
                maxPitch: this.maxPitch,
                style: this.style,
                hash: this.hash,
                interactive: this.interactive,
                bearingSnap: this.bearingSnap,
                pitchWithRotate: this.pitchWithRotate,
                clickTolerance: this.clickTolerance,
                attributionControl: this.attributionControl,
                logoPosition: this.logoPosition,
                failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                refreshExpiredTiles: this.refreshExpiredTiles,
                maxBounds: this.maxBounds,
                scrollZoom: this.scrollZoom,
                boxZoom: this.boxZoom,
                dragRotate: this.dragRotate,
                dragPan: this.dragPan,
                keyboard: this.keyboard,
                doubleClickZoom: this.doubleClickZoom,
                touchPitch: this.touchPitch,
                touchZoomRotate: this.touchZoomRotate,
                trackResize: this.trackResize,
                center: this.center,
                zoom: this.zoom,
                bearing: this.bearing,
                pitch: this.pitch,
                renderWorldCopies: this.renderWorldCopies,
                maxTileCacheSize: this.maxTileCacheSize,
                localIdeographFontFamily: this.localIdeographFontFamily,
                transformRequest: this.transformRequest,
                bounds: this.bounds ? this.bounds : this.fitBounds,
                fitBoundsOptions: this.fitBoundsOptions,
                antialias: this.antialias,
                locale: this.locale,
                cooperativeGestures: this.cooperativeGestures,
                projection: this.projection,
            },
            mapEvents: this,
        });
        if (this.cursorStyle) {
            this.mapService.changeCanvasCursor(this.cursorStyle);
        }
    }
    ngOnDestroy() {
        this.mapService.destroyMap();
    }
    async ngOnChanges(changes) {
        await lastValueFrom(this.mapService.mapCreated$);
        if (changes['cursorStyle'] && !changes['cursorStyle'].isFirstChange()) {
            this.mapService.changeCanvasCursor(changes['cursorStyle'].currentValue);
        }
        if (changes['projection'] && !changes['projection'].isFirstChange()) {
            this.mapService.updateProjection(changes['projection'].currentValue);
        }
        if (changes['minZoom'] && !changes['minZoom'].isFirstChange()) {
            this.mapService.updateMinZoom(changes['minZoom'].currentValue);
        }
        if (changes['maxZoom'] && !changes['maxZoom'].isFirstChange()) {
            this.mapService.updateMaxZoom(changes['maxZoom'].currentValue);
        }
        if (changes['minPitch'] && !changes['minPitch'].isFirstChange()) {
            this.mapService.updateMinPitch(changes['minPitch'].currentValue);
        }
        if (changes['maxPitch'] && !changes['maxPitch'].isFirstChange()) {
            this.mapService.updateMaxPitch(changes['maxPitch'].currentValue);
        }
        if (changes['renderWorldCopies'] &&
            !changes['renderWorldCopies'].isFirstChange()) {
            this.mapService.updateRenderWorldCopies(changes['renderWorldCopies'].currentValue);
        }
        if (changes['scrollZoom'] && !changes['scrollZoom'].isFirstChange()) {
            this.mapService.updateScrollZoom(changes['scrollZoom'].currentValue);
        }
        if (changes['dragRotate'] && !changes['dragRotate'].isFirstChange()) {
            this.mapService.updateDragRotate(changes['dragRotate'].currentValue);
        }
        if (changes['touchPitch'] && !changes['touchPitch'].isFirstChange()) {
            this.mapService.updateTouchPitch(changes['touchPitch'].currentValue);
        }
        if (changes['touchZoomRotate'] &&
            !changes['touchZoomRotate'].isFirstChange()) {
            this.mapService.updateTouchZoomRotate(changes['touchZoomRotate'].currentValue);
        }
        if (changes['doubleClickZoom'] &&
            !changes['doubleClickZoom'].isFirstChange()) {
            this.mapService.updateDoubleClickZoom(changes['doubleClickZoom'].currentValue);
        }
        if (changes['keyboard'] && !changes['keyboard'].isFirstChange()) {
            this.mapService.updateKeyboard(changes['keyboard'].currentValue);
        }
        if (changes['dragPan'] && !changes['dragPan'].isFirstChange()) {
            this.mapService.updateDragPan(changes['dragPan'].currentValue);
        }
        if (changes['boxZoom'] && !changes['boxZoom'].isFirstChange()) {
            this.mapService.updateBoxZoom(changes['boxZoom'].currentValue);
        }
        if (changes['style'] && !changes['style'].isFirstChange()) {
            this.mapService.updateStyle(changes['style'].currentValue);
        }
        if (changes['maxBounds'] && !changes['maxBounds'].isFirstChange()) {
            this.mapService.updateMaxBounds(changes['maxBounds'].currentValue);
        }
        if (changes['fitBounds'] &&
            changes['fitBounds'].currentValue &&
            !changes['fitBounds'].isFirstChange()) {
            this.mapService.fitBounds(changes['fitBounds'].currentValue, this.fitBoundsOptions);
        }
        if (changes['fitScreenCoordinates'] &&
            changes['fitScreenCoordinates'].currentValue) {
            if ((this.center != null || this.zoom != null || this.pitch != null || this.fitBounds != null) &&
                changes['fitScreenCoordinates'].isFirstChange()) {
                console.warn('[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input');
            }
            this.mapService.fitScreenCoordinates(changes['fitScreenCoordinates'].currentValue, this.bearing ? this.bearing : 0, this.movingOptions);
        }
        if (this.centerWithPanTo &&
            changes['center'] &&
            !changes['center'].isFirstChange() &&
            !changes['zoom'] &&
            !changes['bearing'] &&
            !changes['pitch']) {
            this.mapService.panTo(this.center, this.panToOptions);
        }
        else if ((changes['center'] && !changes['center'].isFirstChange()) ||
            (changes['zoom'] && !changes['zoom'].isFirstChange()) ||
            (changes['bearing'] &&
                !changes['bearing'].isFirstChange() &&
                !changes['fitScreenCoordinates']) ||
            (changes['pitch'] && !changes['pitch'].isFirstChange())) {
            this.mapService.move(this.movingMethod, this.movingOptions, this.zoom, this.center, this.bearing, this.pitch);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MapComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: MapComponent, selector: "mgl-map", inputs: { accessToken: "accessToken", collectResourceTiming: "collectResourceTiming", crossSourceCollisions: "crossSourceCollisions", customMapboxApiUrl: "customMapboxApiUrl", fadeDuration: "fadeDuration", hash: "hash", refreshExpiredTiles: "refreshExpiredTiles", failIfMajorPerformanceCaveat: "failIfMajorPerformanceCaveat", bearingSnap: "bearingSnap", interactive: "interactive", pitchWithRotate: "pitchWithRotate", clickTolerance: "clickTolerance", attributionControl: "attributionControl", logoPosition: "logoPosition", maxTileCacheSize: "maxTileCacheSize", localIdeographFontFamily: "localIdeographFontFamily", preserveDrawingBuffer: "preserveDrawingBuffer", trackResize: "trackResize", transformRequest: "transformRequest", bounds: "bounds", antialias: "antialias", locale: "locale", cooperativeGestures: "cooperativeGestures", minZoom: "minZoom", maxZoom: "maxZoom", minPitch: "minPitch", maxPitch: "maxPitch", scrollZoom: "scrollZoom", dragRotate: "dragRotate", touchPitch: "touchPitch", touchZoomRotate: "touchZoomRotate", doubleClickZoom: "doubleClickZoom", keyboard: "keyboard", dragPan: "dragPan", boxZoom: "boxZoom", style: "style", center: "center", maxBounds: "maxBounds", zoom: "zoom", bearing: "bearing", pitch: "pitch", fitBoundsOptions: "fitBoundsOptions", renderWorldCopies: "renderWorldCopies", projection: "projection", movingMethod: "movingMethod", movingOptions: "movingOptions", fitBounds: "fitBounds", fitScreenCoordinates: "fitScreenCoordinates", centerWithPanTo: "centerWithPanTo", panToOptions: "panToOptions", cursorStyle: "cursorStyle" }, outputs: { mapResize: "mapResize", mapRemove: "mapRemove", mapMouseDown: "mapMouseDown", mapMouseUp: "mapMouseUp", mapMouseMove: "mapMouseMove", mapClick: "mapClick", mapDblClick: "mapDblClick", mapMouseOver: "mapMouseOver", mapMouseOut: "mapMouseOut", mapContextMenu: "mapContextMenu", mapTouchStart: "mapTouchStart", mapTouchEnd: "mapTouchEnd", mapTouchMove: "mapTouchMove", mapTouchCancel: "mapTouchCancel", mapWheel: "mapWheel", moveStart: "moveStart", move: "move", moveEnd: "moveEnd", mapDragStart: "mapDragStart", mapDrag: "mapDrag", mapDragEnd: "mapDragEnd", zoomStart: "zoomStart", zoomEvt: "zoomEvt", zoomEnd: "zoomEnd", rotateStart: "rotateStart", rotate: "rotate", rotateEnd: "rotateEnd", pitchStart: "pitchStart", pitchEvt: "pitchEvt", pitchEnd: "pitchEnd", boxZoomStart: "boxZoomStart", boxZoomEnd: "boxZoomEnd", boxZoomCancel: "boxZoomCancel", webGlContextLost: "webGlContextLost", webGlContextRestored: "webGlContextRestored", mapLoad: "mapLoad", mapCreate: "mapCreate", idle: "idle", render: "render", mapError: "mapError", data: "data", styleData: "styleData", sourceData: "sourceData", dataLoading: "dataLoading", styleDataLoading: "styleDataLoading", sourceDataLoading: "sourceDataLoading", styleImageMissing: "styleImageMissing", load: "load" }, providers: [MapService], viewQueries: [{ propertyName: "mapContainer", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #container></div>', isInline: true, styles: [":host{display:block}div{height:100%;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mgl-map', template: '<div #container></div>', providers: [MapService], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}div{height:100%;width:100%}\n"] }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { accessToken: [{
                type: Input
            }], collectResourceTiming: [{
                type: Input
            }], crossSourceCollisions: [{
                type: Input
            }], customMapboxApiUrl: [{
                type: Input
            }], fadeDuration: [{
                type: Input
            }], hash: [{
                type: Input
            }], refreshExpiredTiles: [{
                type: Input
            }], failIfMajorPerformanceCaveat: [{
                type: Input
            }], bearingSnap: [{
                type: Input
            }], interactive: [{
                type: Input
            }], pitchWithRotate: [{
                type: Input
            }], clickTolerance: [{
                type: Input
            }], attributionControl: [{
                type: Input
            }], logoPosition: [{
                type: Input
            }], maxTileCacheSize: [{
                type: Input
            }], localIdeographFontFamily: [{
                type: Input
            }], preserveDrawingBuffer: [{
                type: Input
            }], trackResize: [{
                type: Input
            }], transformRequest: [{
                type: Input
            }], bounds: [{
                type: Input
            }], antialias: [{
                type: Input
            }], locale: [{
                type: Input
            }], cooperativeGestures: [{
                type: Input
            }], minZoom: [{
                type: Input
            }], maxZoom: [{
                type: Input
            }], minPitch: [{
                type: Input
            }], maxPitch: [{
                type: Input
            }], scrollZoom: [{
                type: Input
            }], dragRotate: [{
                type: Input
            }], touchPitch: [{
                type: Input
            }], touchZoomRotate: [{
                type: Input
            }], doubleClickZoom: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], dragPan: [{
                type: Input
            }], boxZoom: [{
                type: Input
            }], style: [{
                type: Input
            }], center: [{
                type: Input
            }], maxBounds: [{
                type: Input
            }], zoom: [{
                type: Input
            }], bearing: [{
                type: Input
            }], pitch: [{
                type: Input
            }], fitBoundsOptions: [{
                type: Input
            }], renderWorldCopies: [{
                type: Input
            }], projection: [{
                type: Input
            }], movingMethod: [{
                type: Input
            }], movingOptions: [{
                type: Input
            }], fitBounds: [{
                type: Input
            }], fitScreenCoordinates: [{
                type: Input
            }], centerWithPanTo: [{
                type: Input
            }], panToOptions: [{
                type: Input
            }], cursorStyle: [{
                type: Input
            }], mapResize: [{
                type: Output
            }], mapRemove: [{
                type: Output
            }], mapMouseDown: [{
                type: Output
            }], mapMouseUp: [{
                type: Output
            }], mapMouseMove: [{
                type: Output
            }], mapClick: [{
                type: Output
            }], mapDblClick: [{
                type: Output
            }], mapMouseOver: [{
                type: Output
            }], mapMouseOut: [{
                type: Output
            }], mapContextMenu: [{
                type: Output
            }], mapTouchStart: [{
                type: Output
            }], mapTouchEnd: [{
                type: Output
            }], mapTouchMove: [{
                type: Output
            }], mapTouchCancel: [{
                type: Output
            }], mapWheel: [{
                type: Output
            }], moveStart: [{
                type: Output
            }], move: [{
                type: Output
            }], moveEnd: [{
                type: Output
            }], mapDragStart: [{
                type: Output
            }], mapDrag: [{
                type: Output
            }], mapDragEnd: [{
                type: Output
            }], zoomStart: [{
                type: Output
            }], zoomEvt: [{
                type: Output
            }], zoomEnd: [{
                type: Output
            }], rotateStart: [{
                type: Output
            }], rotate: [{
                type: Output
            }], rotateEnd: [{
                type: Output
            }], pitchStart: [{
                type: Output
            }], pitchEvt: [{
                type: Output
            }], pitchEnd: [{
                type: Output
            }], boxZoomStart: [{
                type: Output
            }], boxZoomEnd: [{
                type: Output
            }], boxZoomCancel: [{
                type: Output
            }], webGlContextLost: [{
                type: Output
            }], webGlContextRestored: [{
                type: Output
            }], mapLoad: [{
                type: Output
            }], mapCreate: [{
                type: Output
            }], idle: [{
                type: Output
            }], render: [{
                type: Output
            }], mapError: [{
                type: Output
            }], data: [{
                type: Output
            }], styleData: [{
                type: Output
            }], sourceData: [{
                type: Output
            }], dataLoading: [{
                type: Output
            }], styleDataLoading: [{
                type: Output
            }], sourceDataLoading: [{
                type: Output
            }], styleImageMissing: [{
                type: Output
            }], load: [{
                type: Output
            }], mapContainer: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7O0FBb0IxRCxNQUFNLE9BQU8sWUFBWTtJQW1IdkIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUNyQyxDQUFDO0lBSUQsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWpFMUMsNEJBQTRCO1FBQ25CLGlCQUFZLEdBQWtDLE9BQU8sQ0FBQztRQVNyRCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXdCLENBQUM7UUFDckQsY0FBUyxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO1FBQ3JELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTJCLENBQUM7UUFDM0QsZUFBVSxHQUFHLElBQUksWUFBWSxFQUF5QixDQUFDO1FBQ3ZELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTJCLENBQUM7UUFDM0QsYUFBUSxHQUFHLElBQUksWUFBWSxFQUF1QixDQUFDO1FBQ25ELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFDekQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBMkIsQ0FBQztRQUMzRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUEwQixDQUFDO1FBQ3pELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFD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QUFqQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFDRyxvQkFBb0I7c0JBQTdCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFDRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQU1tQyxZQUFZO3NCQUFyRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFuaW1hdGlvbk9wdGlvbnMsXHJcbiAgTG5nTGF0Qm91bmRzTGlrZSxcclxuICBNYXAsXHJcbiAgTWFwT3B0aW9ucyxcclxuICBQb2ludExpa2UsXHJcbiAgTWFwRXZlbnRPZixcclxufSBmcm9tICdtYXBib3gtZ2wnO1xyXG5pbXBvcnQgeyBsYXN0VmFsdWVGcm9tIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UsIE1vdmluZ09wdGlvbnMgfSBmcm9tICcuL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwRXZlbnQgfSBmcm9tICcuL21hcC50eXBlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21nbC1tYXAnLFxyXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGFpbmVyPjwvZGl2PicsXHJcbiAgc3R5bGVzOiBbXHJcbiAgICBgXHJcbiAgICAgIDpob3N0IHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgfVxyXG4gICAgICBkaXYge1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgYCxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW01hcFNlcnZpY2VdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50c1xyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbWl0PE1hcE9wdGlvbnMsICdiZWFyaW5nJyB8ICdjb250YWluZXInIHwgJ3BpdGNoJyB8ICd6b29tJz4sXHJcbiAgTWFwRXZlbnQge1xyXG4gIC8qIEluaXQgaW5wdXRzICovXHJcbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBNYXBPcHRpb25zWydhY2Nlc3NUb2tlbiddO1xyXG4gIEBJbnB1dCgpIGNvbGxlY3RSZXNvdXJjZVRpbWluZz86IE1hcE9wdGlvbnNbJ2NvbGxlY3RSZXNvdXJjZVRpbWluZyddO1xyXG4gIEBJbnB1dCgpIGNyb3NzU291cmNlQ29sbGlzaW9ucz86IE1hcE9wdGlvbnNbJ2Nyb3NzU291cmNlQ29sbGlzaW9ucyddO1xyXG4gIEBJbnB1dCgpIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcclxuICBASW5wdXQoKSBmYWRlRHVyYXRpb24/OiBNYXBPcHRpb25zWydmYWRlRHVyYXRpb24nXTtcclxuICBASW5wdXQoKSBoYXNoPzogTWFwT3B0aW9uc1snaGFzaCddO1xyXG4gIEBJbnB1dCgpIHJlZnJlc2hFeHBpcmVkVGlsZXM/OiBNYXBPcHRpb25zWydyZWZyZXNoRXhwaXJlZFRpbGVzJ107XHJcbiAgQElucHV0KCkgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IE1hcE9wdGlvbnNbJ2ZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQnXTtcclxuICBASW5wdXQoKSBiZWFyaW5nU25hcD86IE1hcE9wdGlvbnNbJ2JlYXJpbmdTbmFwJ107XHJcbiAgQElucHV0KCkgaW50ZXJhY3RpdmU/OiBNYXBPcHRpb25zWydpbnRlcmFjdGl2ZSddO1xyXG4gIEBJbnB1dCgpIHBpdGNoV2l0aFJvdGF0ZT86IE1hcE9wdGlvbnNbJ3BpdGNoV2l0aFJvdGF0ZSddO1xyXG4gIEBJbnB1dCgpIGNsaWNrVG9sZXJhbmNlPzogTWFwT3B0aW9uc1snY2xpY2tUb2xlcmFuY2UnXTtcclxuICBASW5wdXQoKSBhdHRyaWJ1dGlvbkNvbnRyb2w/OiBNYXBPcHRpb25zWydhdHRyaWJ1dGlvbkNvbnRyb2wnXTtcclxuICBASW5wdXQoKSBsb2dvUG9zaXRpb24/OiBNYXBPcHRpb25zWydsb2dvUG9zaXRpb24nXTtcclxuICBASW5wdXQoKSBtYXhUaWxlQ2FjaGVTaXplPzogTWFwT3B0aW9uc1snbWF4VGlsZUNhY2hlU2l6ZSddO1xyXG4gIEBJbnB1dCgpIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseT86IE1hcE9wdGlvbnNbJ2xvY2FsSWRlb2dyYXBoRm9udEZhbWlseSddO1xyXG4gIEBJbnB1dCgpIHByZXNlcnZlRHJhd2luZ0J1ZmZlcj86IE1hcE9wdGlvbnNbJ3ByZXNlcnZlRHJhd2luZ0J1ZmZlciddO1xyXG4gIEBJbnB1dCgpIHRyYWNrUmVzaXplPzogTWFwT3B0aW9uc1sndHJhY2tSZXNpemUnXTtcclxuICBASW5wdXQoKSB0cmFuc2Zvcm1SZXF1ZXN0PzogTWFwT3B0aW9uc1sndHJhbnNmb3JtUmVxdWVzdCddO1xyXG4gIEBJbnB1dCgpIGJvdW5kcz86IE1hcE9wdGlvbnNbJ2JvdW5kcyddOyAvLyBVc2UgZml0Qm91bmRzIGZvciBkeW5hbWljIGlucHV0XHJcbiAgQElucHV0KCkgYW50aWFsaWFzPzogTWFwT3B0aW9uc1snYW50aWFsaWFzJ107XHJcbiAgQElucHV0KCkgbG9jYWxlPzogTWFwT3B0aW9uc1snbG9jYWxlJ107XHJcbiAgQElucHV0KCkgY29vcGVyYXRpdmVHZXN0dXJlcz86IE1hcE9wdGlvbnNbJ2Nvb3BlcmF0aXZlR2VzdHVyZXMnXTtcclxuXHJcbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cclxuICBASW5wdXQoKSBtaW5ab29tPzogTWFwT3B0aW9uc1snbWluWm9vbSddO1xyXG4gIEBJbnB1dCgpIG1heFpvb20/OiBNYXBPcHRpb25zWydtYXhab29tJ107XHJcbiAgQElucHV0KCkgbWluUGl0Y2g/OiBNYXBPcHRpb25zWydtaW5QaXRjaCddO1xyXG4gIEBJbnB1dCgpIG1heFBpdGNoPzogTWFwT3B0aW9uc1snbWF4UGl0Y2gnXTtcclxuICBASW5wdXQoKSBzY3JvbGxab29tPzogTWFwT3B0aW9uc1snc2Nyb2xsWm9vbSddO1xyXG4gIEBJbnB1dCgpIGRyYWdSb3RhdGU/OiBNYXBPcHRpb25zWydkcmFnUm90YXRlJ107XHJcbiAgQElucHV0KCkgdG91Y2hQaXRjaD86IE1hcE9wdGlvbnNbJ3RvdWNoUGl0Y2gnXTtcclxuICBASW5wdXQoKSB0b3VjaFpvb21Sb3RhdGU/OiBNYXBPcHRpb25zWyd0b3VjaFpvb21Sb3RhdGUnXTtcclxuICBASW5wdXQoKSBkb3VibGVDbGlja1pvb20/OiBNYXBPcHRpb25zWydkb3VibGVDbGlja1pvb20nXTtcclxuICBASW5wdXQoKSBrZXlib2FyZD86IE1hcE9wdGlvbnNbJ2tleWJvYXJkJ107XHJcbiAgQElucHV0KCkgZHJhZ1Bhbj86IE1hcE9wdGlvbnNbJ2RyYWdQYW4nXTtcclxuICBASW5wdXQoKSBib3hab29tPzogTWFwT3B0aW9uc1snYm94Wm9vbSddO1xyXG4gIEBJbnB1dCgpIHN0eWxlOiBNYXBPcHRpb25zWydzdHlsZSddO1xyXG4gIEBJbnB1dCgpIGNlbnRlcj86IE1hcE9wdGlvbnNbJ2NlbnRlciddO1xyXG4gIEBJbnB1dCgpIG1heEJvdW5kcz86IE1hcE9wdGlvbnNbJ21heEJvdW5kcyddO1xyXG4gIEBJbnB1dCgpIHpvb20/OiBNYXBPcHRpb25zWyd6b29tJ107XHJcbiAgQElucHV0KCkgYmVhcmluZz86IE1hcE9wdGlvbnNbJ2JlYXJpbmcnXTtcclxuICBASW5wdXQoKSBwaXRjaD86IE1hcE9wdGlvbnNbJ2JlYXJpbmcnXTtcclxuICAvLyBGaXJzdCB2YWx1ZSBnb2VzIHRvIG9wdGlvbnMuZml0Qm91bmRzT3B0aW9ucy4gU3Vic2VxdWVudHMgY2hhbmdlcyBhcmUgcGFzc2VkIHRvIGZpdEJvdW5kc1xyXG4gIEBJbnB1dCgpIGZpdEJvdW5kc09wdGlvbnM/OiBNYXBPcHRpb25zWydmaXRCb3VuZHNPcHRpb25zJ107XHJcbiAgQElucHV0KCkgcmVuZGVyV29ybGRDb3BpZXM/OiBNYXBPcHRpb25zWydyZW5kZXJXb3JsZENvcGllcyddO1xyXG4gIEBJbnB1dCgpIHByb2plY3Rpb24/OiBNYXBPcHRpb25zWydwcm9qZWN0aW9uJ107XHJcblxyXG4gIC8qIEFkZGVkIGJ5IG5neC1tYXBib3gtZ2wgKi9cclxuICBASW5wdXQoKSBtb3ZpbmdNZXRob2Q6ICdqdW1wVG8nIHwgJ2Vhc2VUbycgfCAnZmx5VG8nID0gJ2ZseVRvJztcclxuICBASW5wdXQoKSBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucztcclxuICAvLyA9PiBGaXJzdCB2YWx1ZSBpcyBhIGFsaWFzIHRvIGJvdW5kcyBpbnB1dCAoc2luY2UgbWFwYm94IDAuNTMuMCkuIFN1YnNlcXVlbnRzIGNoYW5nZXMgYXJlIHBhc3NlZCB0byBmaXRCb3VuZHNcclxuICBASW5wdXQoKSBmaXRCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xyXG4gIEBJbnB1dCgpIGZpdFNjcmVlbkNvb3JkaW5hdGVzPzogW1BvaW50TGlrZSwgUG9pbnRMaWtlXTtcclxuICBASW5wdXQoKSBjZW50ZXJXaXRoUGFuVG8/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHBhblRvT3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnM7XHJcbiAgQElucHV0KCkgY3Vyc29yU3R5bGU/OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBtYXBSZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3Jlc2l6ZSc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBSZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3JlbW92ZSc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J21vdXNlZG93bic+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBNb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdtb3VzZXVwJz4+KCk7XHJcbiAgQE91dHB1dCgpIG1hcE1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnbW91c2Vtb3ZlJz4+KCk7XHJcbiAgQE91dHB1dCgpIG1hcENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdjbGljayc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnZGJsY2xpY2snPj4oKTtcclxuICBAT3V0cHV0KCkgbWFwTW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdtb3VzZW92ZXInPj4oKTtcclxuICBAT3V0cHV0KCkgbWFwTW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J21vdXNlb3V0Jz4+KCk7XHJcbiAgQE91dHB1dCgpIG1hcENvbnRleHRNZW51ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdjb250ZXh0bWVudSc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBUb3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCd0b3VjaHN0YXJ0Jz4+KCk7XHJcbiAgQE91dHB1dCgpIG1hcFRvdWNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCd0b3VjaGVuZCc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBUb3VjaE1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3RvdWNobW92ZSc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBUb3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwndG91Y2hjYW5jZWwnPj4oKTtcclxuICBAT3V0cHV0KCkgbWFwV2hlZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3doZWVsJz4+KCk7XHJcbiAgQE91dHB1dCgpIG1vdmVTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnbW92ZXN0YXJ0Jz4+KCk7XHJcbiAgQE91dHB1dCgpIG1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J21vdmUnPj4oKTtcclxuICBAT3V0cHV0KCkgbW92ZUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnbW92ZWVuZCc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2RyYWdzdGFydCc+PigpO1xyXG4gIEBPdXRwdXQoKSBtYXBEcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdkcmFnJz4+KCk7XHJcbiAgQE91dHB1dCgpIG1hcERyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2RyYWdlbmQnPj4oKTtcclxuICBAT3V0cHV0KCkgem9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCd6b29tc3RhcnQnPj4oKTtcclxuICBAT3V0cHV0KCkgem9vbUV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnem9vbSc+PigpO1xyXG4gIEBPdXRwdXQoKSB6b29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCd6b29tZW5kJz4+KCk7XHJcbiAgQE91dHB1dCgpIHJvdGF0ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdyb3RhdGVzdGFydCc+PigpO1xyXG4gIEBPdXRwdXQoKSByb3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3JvdGF0ZSc+PigpO1xyXG4gIEBPdXRwdXQoKSByb3RhdGVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3JvdGF0ZWVuZCc+PigpO1xyXG4gIEBPdXRwdXQoKSBwaXRjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdwaXRjaHN0YXJ0Jz4+KCk7XHJcbiAgQE91dHB1dCgpIHBpdGNoRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdwaXRjaCc+PigpO1xyXG4gIEBPdXRwdXQoKSBwaXRjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwncGl0Y2hlbmQnPj4oKTtcclxuICBAT3V0cHV0KCkgYm94Wm9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdib3h6b29tc3RhcnQnPj4oKTtcclxuICBAT3V0cHV0KCkgYm94Wm9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnYm94em9vbWVuZCc+PigpO1xyXG4gIEBPdXRwdXQoKSBib3hab29tQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdib3h6b29tY2FuY2VsJz4+KCk7XHJcbiAgQE91dHB1dCgpIHdlYkdsQ29udGV4dExvc3QgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3dlYmdsY29udGV4dGxvc3QnPj4oKTtcclxuICBAT3V0cHV0KCkgd2ViR2xDb250ZXh0UmVzdG9yZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3dlYmdsY29udGV4dHJlc3RvcmVkJz4+KCk7XHJcbiAgQE91dHB1dCgpIG1hcExvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2xvYWQnPj4oKTtcclxuICBAT3V0cHV0KCkgbWFwQ3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXA+KCk7XHJcbiAgQE91dHB1dCgpIGlkbGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2lkbGUnPj4oKTtcclxuICBAT3V0cHV0KCkgcmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdyZW5kZXInPj4oKTtcclxuICBAT3V0cHV0KCkgbWFwRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2Vycm9yJz4+KCk7XHJcbiAgQE91dHB1dCgpIGRhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2RhdGEnPj4oKTtcclxuICBAT3V0cHV0KCkgc3R5bGVEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudE9mPCdzdHlsZWRhdGEnPj4oKTtcclxuICBAT3V0cHV0KCkgc291cmNlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnc291cmNlZGF0YSc+PigpO1xyXG4gIEBPdXRwdXQoKSBkYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnZGF0YWxvYWRpbmcnPj4oKTtcclxuICBAT3V0cHV0KCkgc3R5bGVEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnc3R5bGVkYXRhbG9hZGluZyc+PigpO1xyXG4gIEBPdXRwdXQoKSBzb3VyY2VEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRPZjwnc291cmNlZGF0YWxvYWRpbmcnPj4oKTtcclxuICBAT3V0cHV0KCkgc3R5bGVJbWFnZU1pc3NpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J3N0eWxlaW1hZ2VtaXNzaW5nJz4+KCk7XHJcbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50T2Y8J2xvYWQnPlsndGFyZ2V0J10+KCk7XHJcblxyXG4gIGdldCBtYXBJbnN0YW5jZSgpOiBNYXAge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIG1hcENvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLnNldHVwKHtcclxuICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXHJcbiAgICAgIG1hcE9wdGlvbnM6IHtcclxuICAgICAgICBjb2xsZWN0UmVzb3VyY2VUaW1pbmc6IHRoaXMuY29sbGVjdFJlc291cmNlVGltaW5nLFxyXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBDb250YWluZXIubmF0aXZlRWxlbWVudCxcclxuICAgICAgICBjcm9zc1NvdXJjZUNvbGxpc2lvbnM6IHRoaXMuY3Jvc3NTb3VyY2VDb2xsaXNpb25zLFxyXG4gICAgICAgIGZhZGVEdXJhdGlvbjogdGhpcy5mYWRlRHVyYXRpb24sXHJcbiAgICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxyXG4gICAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcclxuICAgICAgICBtaW5QaXRjaDogdGhpcy5taW5QaXRjaCxcclxuICAgICAgICBtYXhQaXRjaDogdGhpcy5tYXhQaXRjaCxcclxuICAgICAgICBzdHlsZTogdGhpcy5zdHlsZSxcclxuICAgICAgICBoYXNoOiB0aGlzLmhhc2gsXHJcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMuaW50ZXJhY3RpdmUsXHJcbiAgICAgICAgYmVhcmluZ1NuYXA6IHRoaXMuYmVhcmluZ1NuYXAsXHJcbiAgICAgICAgcGl0Y2hXaXRoUm90YXRlOiB0aGlzLnBpdGNoV2l0aFJvdGF0ZSxcclxuICAgICAgICBjbGlja1RvbGVyYW5jZTogdGhpcy5jbGlja1RvbGVyYW5jZSxcclxuICAgICAgICBhdHRyaWJ1dGlvbkNvbnRyb2w6IHRoaXMuYXR0cmlidXRpb25Db250cm9sLFxyXG4gICAgICAgIGxvZ29Qb3NpdGlvbjogdGhpcy5sb2dvUG9zaXRpb24sXHJcbiAgICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogdGhpcy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0LFxyXG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdGhpcy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIsXHJcbiAgICAgICAgcmVmcmVzaEV4cGlyZWRUaWxlczogdGhpcy5yZWZyZXNoRXhwaXJlZFRpbGVzLFxyXG4gICAgICAgIG1heEJvdW5kczogdGhpcy5tYXhCb3VuZHMsXHJcbiAgICAgICAgc2Nyb2xsWm9vbTogdGhpcy5zY3JvbGxab29tLFxyXG4gICAgICAgIGJveFpvb206IHRoaXMuYm94Wm9vbSxcclxuICAgICAgICBkcmFnUm90YXRlOiB0aGlzLmRyYWdSb3RhdGUsXHJcbiAgICAgICAgZHJhZ1BhbjogdGhpcy5kcmFnUGFuLFxyXG4gICAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxyXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogdGhpcy5kb3VibGVDbGlja1pvb20sXHJcbiAgICAgICAgdG91Y2hQaXRjaDogdGhpcy50b3VjaFBpdGNoLFxyXG4gICAgICAgIHRvdWNoWm9vbVJvdGF0ZTogdGhpcy50b3VjaFpvb21Sb3RhdGUsXHJcbiAgICAgICAgdHJhY2tSZXNpemU6IHRoaXMudHJhY2tSZXNpemUsXHJcbiAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcclxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXHJcbiAgICAgICAgYmVhcmluZzogdGhpcy5iZWFyaW5nLFxyXG4gICAgICAgIHBpdGNoOiB0aGlzLnBpdGNoLFxyXG4gICAgICAgIHJlbmRlcldvcmxkQ29waWVzOiB0aGlzLnJlbmRlcldvcmxkQ29waWVzLFxyXG4gICAgICAgIG1heFRpbGVDYWNoZVNpemU6IHRoaXMubWF4VGlsZUNhY2hlU2l6ZSxcclxuICAgICAgICBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk6IHRoaXMubG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5LFxyXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IHRoaXMudHJhbnNmb3JtUmVxdWVzdCxcclxuICAgICAgICBib3VuZHM6IHRoaXMuYm91bmRzID8gdGhpcy5ib3VuZHMgOiB0aGlzLmZpdEJvdW5kcyxcclxuICAgICAgICBmaXRCb3VuZHNPcHRpb25zOiB0aGlzLmZpdEJvdW5kc09wdGlvbnMsXHJcbiAgICAgICAgYW50aWFsaWFzOiB0aGlzLmFudGlhbGlhcyxcclxuICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxyXG4gICAgICAgIGNvb3BlcmF0aXZlR2VzdHVyZXM6IHRoaXMuY29vcGVyYXRpdmVHZXN0dXJlcyxcclxuICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLnByb2plY3Rpb24sXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcEV2ZW50czogdGhpcyxcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuY3Vyc29yU3R5bGUpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcih0aGlzLmN1cnNvclN0eWxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLmRlc3Ryb3lNYXAoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGF3YWl0IGxhc3RWYWx1ZUZyb20odGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkKTtcclxuICAgIGlmIChjaGFuZ2VzWydjdXJzb3JTdHlsZSddICYmICFjaGFuZ2VzWydjdXJzb3JTdHlsZSddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKGNoYW5nZXNbJ2N1cnNvclN0eWxlJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydwcm9qZWN0aW9uJ10gJiYgIWNoYW5nZXNbJ3Byb2plY3Rpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVByb2plY3Rpb24oY2hhbmdlc1sncHJvamVjdGlvbiddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbWluWm9vbSddICYmICFjaGFuZ2VzWydtaW5ab29tJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNaW5ab29tKGNoYW5nZXNbJ21pblpvb20nXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ21heFpvb20nXSAmJiAhY2hhbmdlc1snbWF4Wm9vbSddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWF4Wm9vbShjaGFuZ2VzWydtYXhab29tJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydtaW5QaXRjaCddICYmICFjaGFuZ2VzWydtaW5QaXRjaCddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWluUGl0Y2goY2hhbmdlc1snbWluUGl0Y2gnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ21heFBpdGNoJ10gJiYgIWNoYW5nZXNbJ21heFBpdGNoJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNYXhQaXRjaChjaGFuZ2VzWydtYXhQaXRjaCddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGNoYW5nZXNbJ3JlbmRlcldvcmxkQ29waWVzJ10gJiZcclxuICAgICAgIWNoYW5nZXNbJ3JlbmRlcldvcmxkQ29waWVzJ10uaXNGaXJzdENoYW5nZSgpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVJlbmRlcldvcmxkQ29waWVzKFxyXG4gICAgICAgIGNoYW5nZXNbJ3JlbmRlcldvcmxkQ29waWVzJ10uY3VycmVudFZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snc2Nyb2xsWm9vbSddICYmICFjaGFuZ2VzWydzY3JvbGxab29tJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVTY3JvbGxab29tKGNoYW5nZXNbJ3Njcm9sbFpvb20nXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdSb3RhdGUnXSAmJiAhY2hhbmdlc1snZHJhZ1JvdGF0ZSddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1JvdGF0ZShjaGFuZ2VzWydkcmFnUm90YXRlJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWyd0b3VjaFBpdGNoJ10gJiYgIWNoYW5nZXNbJ3RvdWNoUGl0Y2gnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVRvdWNoUGl0Y2goY2hhbmdlc1sndG91Y2hQaXRjaCddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGNoYW5nZXNbJ3RvdWNoWm9vbVJvdGF0ZSddICYmXHJcbiAgICAgICFjaGFuZ2VzWyd0b3VjaFpvb21Sb3RhdGUnXS5pc0ZpcnN0Q2hhbmdlKClcclxuICAgICkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlVG91Y2hab29tUm90YXRlKFxyXG4gICAgICAgIGNoYW5nZXNbJ3RvdWNoWm9vbVJvdGF0ZSddLmN1cnJlbnRWYWx1ZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICBjaGFuZ2VzWydkb3VibGVDbGlja1pvb20nXSAmJlxyXG4gICAgICAhY2hhbmdlc1snZG91YmxlQ2xpY2tab29tJ10uaXNGaXJzdENoYW5nZSgpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZURvdWJsZUNsaWNrWm9vbShcclxuICAgICAgICBjaGFuZ2VzWydkb3VibGVDbGlja1pvb20nXS5jdXJyZW50VmFsdWVcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydrZXlib2FyZCddICYmICFjaGFuZ2VzWydrZXlib2FyZCddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlS2V5Ym9hcmQoY2hhbmdlc1sna2V5Ym9hcmQnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdQYW4nXSAmJiAhY2hhbmdlc1snZHJhZ1BhbiddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihjaGFuZ2VzWydkcmFnUGFuJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydib3hab29tJ10gJiYgIWNoYW5nZXNbJ2JveFpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZUJveFpvb20oY2hhbmdlc1snYm94Wm9vbSddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snc3R5bGUnXSAmJiAhY2hhbmdlc1snc3R5bGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVN0eWxlKGNoYW5nZXNbJ3N0eWxlJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydtYXhCb3VuZHMnXSAmJiAhY2hhbmdlc1snbWF4Qm91bmRzJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNYXhCb3VuZHMoY2hhbmdlc1snbWF4Qm91bmRzJ10uY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgY2hhbmdlc1snZml0Qm91bmRzJ10gJiZcclxuICAgICAgY2hhbmdlc1snZml0Qm91bmRzJ10uY3VycmVudFZhbHVlICYmXHJcbiAgICAgICFjaGFuZ2VzWydmaXRCb3VuZHMnXS5pc0ZpcnN0Q2hhbmdlKClcclxuICAgICkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZml0Qm91bmRzKFxyXG4gICAgICAgIGNoYW5nZXNbJ2ZpdEJvdW5kcyddLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICB0aGlzLmZpdEJvdW5kc09wdGlvbnNcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgY2hhbmdlc1snZml0U2NyZWVuQ29vcmRpbmF0ZXMnXSAmJlxyXG4gICAgICBjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddLmN1cnJlbnRWYWx1ZVxyXG4gICAgKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAodGhpcy5jZW50ZXIgIT0gbnVsbCB8fCB0aGlzLnpvb20gIT0gbnVsbCB8fCB0aGlzLnBpdGNoICE9IG51bGwgfHwgdGhpcy5maXRCb3VuZHMgIT0gbnVsbCkgJiZcclxuICAgICAgICBjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddLmlzRmlyc3RDaGFuZ2UoKVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICAnW25neC1tYXBib3gtZ2xdIGNlbnRlciAvIHpvb20gLyBwaXRjaCAvIGZpdEJvdW5kcyBpbnB1dHMgYXJlIGJlaW5nIG92ZXJyaWRkZW4gYnkgZml0U2NyZWVuQ29vcmRpbmF0ZXMgaW5wdXQnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZml0U2NyZWVuQ29vcmRpbmF0ZXMoXHJcbiAgICAgICAgY2hhbmdlc1snZml0U2NyZWVuQ29vcmRpbmF0ZXMnXS5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgdGhpcy5iZWFyaW5nID8gdGhpcy5iZWFyaW5nIDogMCxcclxuICAgICAgICB0aGlzLm1vdmluZ09wdGlvbnNcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jZW50ZXJXaXRoUGFuVG8gJiZcclxuICAgICAgY2hhbmdlc1snY2VudGVyJ10gJiZcclxuICAgICAgIWNoYW5nZXNbJ2NlbnRlciddLmlzRmlyc3RDaGFuZ2UoKSAmJlxyXG4gICAgICAhY2hhbmdlc1snem9vbSddICYmXHJcbiAgICAgICFjaGFuZ2VzWydiZWFyaW5nJ10gJiZcclxuICAgICAgIWNoYW5nZXNbJ3BpdGNoJ11cclxuICAgICkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UucGFuVG8odGhpcy5jZW50ZXIhLCB0aGlzLnBhblRvT3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAoY2hhbmdlc1snY2VudGVyJ10gJiYgIWNoYW5nZXNbJ2NlbnRlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ3pvb20nXSAmJiAhY2hhbmdlc1snem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ2JlYXJpbmcnXSAmJlxyXG4gICAgICAgICFjaGFuZ2VzWydiZWFyaW5nJ10uaXNGaXJzdENoYW5nZSgpICYmXHJcbiAgICAgICAgIWNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10pIHx8XHJcbiAgICAgIChjaGFuZ2VzWydwaXRjaCddICYmICFjaGFuZ2VzWydwaXRjaCddLmlzRmlyc3RDaGFuZ2UoKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UubW92ZShcclxuICAgICAgICB0aGlzLm1vdmluZ01ldGhvZCxcclxuICAgICAgICB0aGlzLm1vdmluZ09wdGlvbnMsXHJcbiAgICAgICAgdGhpcy56b29tLFxyXG4gICAgICAgIHRoaXMuY2VudGVyLFxyXG4gICAgICAgIHRoaXMuYmVhcmluZyxcclxuICAgICAgICB0aGlzLnBpdGNoXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=