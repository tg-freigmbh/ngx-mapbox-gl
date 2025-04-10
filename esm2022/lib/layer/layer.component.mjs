import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, mapTo, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class LayerComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.layerClick = new EventEmitter();
        this.layerDblClick = new EventEmitter();
        this.layerMouseDown = new EventEmitter();
        this.layerMouseUp = new EventEmitter();
        this.layerMouseEnter = new EventEmitter();
        this.layerMouseLeave = new EventEmitter();
        this.layerMouseMove = new EventEmitter();
        this.layerMouseOver = new EventEmitter();
        this.layerMouseOut = new EventEmitter();
        this.layerContextMenu = new EventEmitter();
        this.layerTouchStart = new EventEmitter();
        this.layerTouchEnd = new EventEmitter();
        this.layerTouchCancel = new EventEmitter();
        this.layerAdded = false;
    }
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(mapTo(false), filter(() => !this.mapService.mapInstance.getLayer(this.id)), startWith(true))))
            .subscribe((bindEvents) => this.init(bindEvents));
    }
    ngOnChanges(changes) {
        if (!this.layerAdded) {
            return;
        }
        if (changes['paint'] && !changes['paint'].isFirstChange()) {
            this.mapService.setAllLayerPaintProperty(this.id, changes['paint'].currentValue);
        }
        if (changes['layout'] && !changes['layout'].isFirstChange()) {
            this.mapService.setAllLayerLayoutProperty(this.id, changes['layout'].currentValue);
        }
        if (changes['filter'] && !changes['filter'].isFirstChange()) {
            this.mapService.setLayerFilter(this.id, changes['filter'].currentValue);
        }
        if (changes['before'] && !changes['before'].isFirstChange()) {
            this.mapService.setLayerBefore(this.id, changes['before'].currentValue);
        }
        if ((changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())) {
            this.mapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
        }
    }
    ngOnDestroy() {
        if (this.layerAdded) {
            this.mapService.removeLayer(this.id);
            const inlineLayerSourceId = `${this.id}___source___`;
            const inlineLayerSource = this.mapService.getSource(inlineLayerSourceId);
            if (inlineLayerSource) {
                this.mapService.removeSource(inlineLayerSourceId);
            }
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    get inlineLayerSourceId() {
        return `${this.id}___source___`;
    }
    init(bindEvents) {
        let source;
        if (typeof this.source === 'object') {
            const tempSourceId = `${this.id}___source___`;
            this.mapService.addSource(tempSourceId, this.source);
            source = tempSourceId;
        }
        else {
            source = this.source;
        }
        const layer = {
            layerOptions: {
                id: this.id,
                type: this.type,
                source,
                metadata: this.metadata,
                'source-layer': this.sourceLayer,
                minzoom: this.minzoom,
                maxzoom: this.maxzoom,
                filter: this.filter,
                layout: this.layout,
                paint: this.paint,
            },
            layerEvents: {
                layerClick: this.layerClick,
                layerDblClick: this.layerDblClick,
                layerMouseDown: this.layerMouseDown,
                layerMouseUp: this.layerMouseUp,
                layerMouseEnter: this.layerMouseEnter,
                layerMouseLeave: this.layerMouseLeave,
                layerMouseMove: this.layerMouseMove,
                layerMouseOver: this.layerMouseOver,
                layerMouseOut: this.layerMouseOut,
                layerContextMenu: this.layerContextMenu,
                layerTouchStart: this.layerTouchStart,
                layerTouchEnd: this.layerTouchEnd,
                layerTouchCancel: this.layerTouchCancel
            },
        };
        this.mapService.addLayer(layer, bindEvents, this.before);
        this.layerAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LayerComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: LayerComponent, selector: "mgl-layer", inputs: { id: "id", source: "source", type: "type", metadata: "metadata", sourceLayer: "sourceLayer", filter: "filter", layout: "layout", paint: "paint", before: "before", minzoom: "minzoom", maxzoom: "maxzoom" }, outputs: { layerClick: "layerClick", layerDblClick: "layerDblClick", layerMouseDown: "layerMouseDown", layerMouseUp: "layerMouseUp", layerMouseEnter: "layerMouseEnter", layerMouseLeave: "layerMouseLeave", layerMouseMove: "layerMouseMove", layerMouseOver: "layerMouseOver", layerMouseOut: "layerMouseOut", layerContextMenu: "layerContextMenu", layerTouchStart: "layerTouchStart", layerTouchEnd: "layerTouchEnd", layerTouchCancel: "layerTouchCancel" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LayerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-layer',
                    template: '',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { id: [{
                type: Input
            }], source: [{
                type: Input
            }], type: [{
                type: Input
            }], metadata: [{
                type: Input
            }], sourceLayer: [{
                type: Input
            }], filter: [{
                type: Input
            }], layout: [{
                type: Input
            }], paint: [{
                type: Input
            }], before: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], layerClick: [{
                type: Output
            }], layerDblClick: [{
                type: Output
            }], layerMouseDown: [{
                type: Output
            }], layerMouseUp: [{
                type: Output
            }], layerMouseEnter: [{
                type: Output
            }], layerMouseLeave: [{
                type: Output
            }], layerMouseMove: [{
                type: Output
            }], layerMouseOver: [{
                type: Output
            }], layerMouseOut: [{
                type: Output
            }], layerContextMenu: [{
                type: Output
            }], layerTouchStart: [{
                type: Output
            }], layerTouchEnd: [{
                type: Output
            }], layerTouchCancel: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvbGF5ZXIvbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFPdkIsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBTzVELE1BQU0sT0FBTyxjQUFjO0lBbUN6QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBakJoQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNsRCxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ25ELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDakQsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNwRCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDbkQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNuRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2xELHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ3JELG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDcEQsa0JBQWEsR0FBRyxJQUFJ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O2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxnQkFBZ0I7c0JBQXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTGF5ZXIsXHJcbiAgTWFwTW91c2VFdmVudCxcclxuICBNYXBUb3VjaEV2ZW50LFxyXG4gIFNvdXJjZVNwZWNpZmljYXRpb24sXHJcbn0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBtYXBUbywgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UsIFNldHVwTGF5ZXIgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllckV2ZW50cyB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZ2wtbGF5ZXInLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbWl0PExheWVyLCAnc291cmNlJz4sIExheWVyRXZlbnRzIHtcclxuXHJcbiAgLyogSW5pdCBpbnB1dHMgKi9cclxuICBASW5wdXQoKSBpZDogTGF5ZXJbJ2lkJ107XHJcbiAgQElucHV0KCkgc291cmNlPzogU291cmNlU3BlY2lmaWNhdGlvbiB8IExheWVyWydzb3VyY2UnXTtcclxuICBASW5wdXQoKSB0eXBlOiBMYXllclsndHlwZSddO1xyXG4gIEBJbnB1dCgpIG1ldGFkYXRhPzogTGF5ZXJbJ21ldGFkYXRhJ107XHJcbiAgQElucHV0KCkgc291cmNlTGF5ZXI/OiBMYXllclsnc291cmNlLWxheWVyJ107XHJcblxyXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXHJcbiAgQElucHV0KCkgZmlsdGVyPzogTGF5ZXJbJ2ZpbHRlciddO1xyXG4gIEBJbnB1dCgpIGxheW91dD86IExheWVyWydsYXlvdXQnXTtcclxuICBASW5wdXQoKSBwYWludD86IExheWVyWydwYWludCddO1xyXG4gIEBJbnB1dCgpIGJlZm9yZT86IHN0cmluZztcclxuICBASW5wdXQoKSBtaW56b29tPzogTGF5ZXJbJ21pbnpvb20nXTtcclxuICBASW5wdXQoKSBtYXh6b29tPzogTGF5ZXJbJ21heHpvb20nXTtcclxuXHJcbiAgQE91dHB1dCgpIGxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGxheWVyRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGxheWVyTW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xyXG4gIEBPdXRwdXQoKSBsYXllck1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGxheWVyTW91c2VFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcclxuICBAT3V0cHV0KCkgbGF5ZXJNb3VzZUxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xyXG4gIEBPdXRwdXQoKSBsYXllck1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcclxuICBAT3V0cHV0KCkgbGF5ZXJNb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGxheWVyTW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGxheWVyQ29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGxheWVyVG91Y2hTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcclxuICBAT3V0cHV0KCkgbGF5ZXJUb3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcclxuICBAT3V0cHV0KCkgbGF5ZXJUb3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllckFkZGVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YiA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxyXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcFRvKGZhbHNlKSxcclxuICAgICAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0TGF5ZXIodGhpcy5pZCkpLFxyXG4gICAgICAgICAgICBzdGFydFdpdGgodHJ1ZSlcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoYmluZEV2ZW50czogYm9vbGVhbikgPT4gdGhpcy5pbml0KGJpbmRFdmVudHMpKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICghdGhpcy5sYXllckFkZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydwYWludCddICYmICFjaGFuZ2VzWydwYWludCddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KFxyXG4gICAgICAgIHRoaXMuaWQsXHJcbiAgICAgICAgY2hhbmdlc1sncGFpbnQnXS5jdXJyZW50VmFsdWUhXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbGF5b3V0J10gJiYgIWNoYW5nZXNbJ2xheW91dCddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJMYXlvdXRQcm9wZXJ0eShcclxuICAgICAgICB0aGlzLmlkLFxyXG4gICAgICAgIGNoYW5nZXNbJ2xheW91dCddLmN1cnJlbnRWYWx1ZSFcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydmaWx0ZXInXSAmJiAhY2hhbmdlc1snZmlsdGVyJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRMYXllckZpbHRlcih0aGlzLmlkLCBjaGFuZ2VzWydmaWx0ZXInXS5jdXJyZW50VmFsdWUhKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydiZWZvcmUnXSAmJiAhY2hhbmdlc1snYmVmb3JlJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRMYXllckJlZm9yZSh0aGlzLmlkLCBjaGFuZ2VzWydiZWZvcmUnXS5jdXJyZW50VmFsdWUhKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgKGNoYW5nZXNbJ21pbnpvb20nXSAmJiAhY2hhbmdlc1snbWluem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ21heHpvb20nXSAmJiAhY2hhbmdlc1snbWF4em9vbSddLmlzRmlyc3RDaGFuZ2UoKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0TGF5ZXJab29tUmFuZ2UodGhpcy5pZCwgdGhpcy5taW56b29tLCB0aGlzLm1heHpvb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5sYXllckFkZGVkKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVMYXllcih0aGlzLmlkKTtcclxuXHJcbiAgICAgIGNvbnN0IGlubGluZUxheWVyU291cmNlSWQgPSBgJHt0aGlzLmlkfV9fX3NvdXJjZV9fX2A7XHJcbiAgICAgIGNvbnN0IGlubGluZUxheWVyU291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZShpbmxpbmVMYXllclNvdXJjZUlkKTtcclxuXHJcbiAgICAgIGlmIChpbmxpbmVMYXllclNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVTb3VyY2UoaW5saW5lTGF5ZXJTb3VyY2VJZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1Yikge1xyXG4gICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGlubGluZUxheWVyU291cmNlSWQoKSB7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5pZH1fX19zb3VyY2VfX19gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KGJpbmRFdmVudHM6IGJvb2xlYW4pIHtcclxuICAgIGxldCBzb3VyY2U6IExheWVyWydzb3VyY2UnXTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuc291cmNlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBjb25zdCB0ZW1wU291cmNlSWQgPSBgJHt0aGlzLmlkfV9fX3NvdXJjZV9fX2A7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5hZGRTb3VyY2UodGVtcFNvdXJjZUlkLCB0aGlzLnNvdXJjZSk7XHJcbiAgICAgIHNvdXJjZSA9IHRlbXBTb3VyY2VJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNvdXJjZSA9IHRoaXMuc291cmNlITtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllcjogU2V0dXBMYXllciA9IHtcclxuICAgICAgbGF5ZXJPcHRpb25zOiB7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgdHlwZTogdGhpcy50eXBlIGFzIGFueSxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGEsXHJcbiAgICAgICAgJ3NvdXJjZS1sYXllcic6IHRoaXMuc291cmNlTGF5ZXIsXHJcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxyXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcclxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxyXG4gICAgICAgIGxheW91dDogdGhpcy5sYXlvdXQsXHJcbiAgICAgICAgcGFpbnQ6IHRoaXMucGFpbnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGxheWVyRXZlbnRzOiB7XHJcbiAgICAgICAgbGF5ZXJDbGljazogdGhpcy5sYXllckNsaWNrLFxyXG4gICAgICAgIGxheWVyRGJsQ2xpY2s6IHRoaXMubGF5ZXJEYmxDbGljayxcclxuICAgICAgICBsYXllck1vdXNlRG93bjogdGhpcy5sYXllck1vdXNlRG93bixcclxuICAgICAgICBsYXllck1vdXNlVXA6IHRoaXMubGF5ZXJNb3VzZVVwLFxyXG4gICAgICAgIGxheWVyTW91c2VFbnRlcjogdGhpcy5sYXllck1vdXNlRW50ZXIsXHJcbiAgICAgICAgbGF5ZXJNb3VzZUxlYXZlOiB0aGlzLmxheWVyTW91c2VMZWF2ZSxcclxuICAgICAgICBsYXllck1vdXNlTW92ZTogdGhpcy5sYXllck1vdXNlTW92ZSxcclxuICAgICAgICBsYXllck1vdXNlT3ZlcjogdGhpcy5sYXllck1vdXNlT3ZlcixcclxuICAgICAgICBsYXllck1vdXNlT3V0OiB0aGlzLmxheWVyTW91c2VPdXQsXHJcbiAgICAgICAgbGF5ZXJDb250ZXh0TWVudTogdGhpcy5sYXllckNvbnRleHRNZW51LFxyXG4gICAgICAgIGxheWVyVG91Y2hTdGFydDogdGhpcy5sYXllclRvdWNoU3RhcnQsXHJcbiAgICAgICAgbGF5ZXJUb3VjaEVuZDogdGhpcy5sYXllclRvdWNoRW5kLFxyXG4gICAgICAgIGxheWVyVG91Y2hDYW5jZWw6IHRoaXMubGF5ZXJUb3VjaENhbmNlbFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm1hcFNlcnZpY2UuYWRkTGF5ZXIobGF5ZXIsIGJpbmRFdmVudHMsIHRoaXMuYmVmb3JlKTtcclxuICAgIHRoaXMubGF5ZXJBZGRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=