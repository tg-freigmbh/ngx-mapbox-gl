import { Directive, EventEmitter, Host, Input, NgZone, Optional, Output, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "../source/geojson/feature.component";
export class DraggableDirective {
    constructor(mapService, ngZone, featureComponent) {
        this.mapService = mapService;
        this.ngZone = ngZone;
        this.featureComponent = featureComponent;
        this.featureDragStart = new EventEmitter();
        this.featureDragEnd = new EventEmitter();
        this.featureDrag = new EventEmitter();
        /**
         * @deprecated Use featureDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use featureDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use featureDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
        this.sub = new Subscription();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        let enter$;
        let leave$;
        let updateCoords;
        if (this.featureComponent && this.layer) {
            enter$ = this.layer.layerMouseEnter;
            leave$ = this.layer.layerMouseLeave;
            updateCoords = this.featureComponent.updateCoordinates.bind(this.featureComponent);
            if (this.featureComponent.geometry.type !== 'Point') {
                throw new Error('mglDraggable only support point feature');
            }
        }
        else {
            throw new Error('mglDraggable can only be used on Feature (with a layer as input) or Marker');
        }
        this.handleDraggable(enter$, leave$, updateCoords);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    handleDraggable(enter$, leave$, updateCoords) {
        let moving = false;
        let inside = false;
        this.mapService.mapCreated$.subscribe(() => {
            const mouseUp$ = fromEvent(this.mapService.mapInstance, 'mouseup');
            const dragStart$ = enter$.pipe(filter(() => !moving), filter((evt) => this.filterFeature(evt)), tap(() => {
                inside = true;
                this.mapService.changeCanvasCursor('move');
                this.mapService.updateDragPan(false);
            }), switchMap(() => fromEvent(this.mapService.mapInstance, 'mousedown').pipe(takeUntil(leave$))));
            const dragging$ = dragStart$.pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'mousemove').pipe(takeUntil(mouseUp$))));
            const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
            this.sub.add(dragStart$.subscribe((evt) => {
                moving = true;
                if (this.featureDragStart.observed || this.dragStart.observed) {
                    this.ngZone.run(() => {
                        this.featureDragStart.emit(evt);
                        this.dragStart.emit(evt);
                    });
                }
            }));
            this.sub.add(dragging$.subscribe((evt) => {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (this.featureDrag.observed || this.drag.observed) {
                    this.ngZone.run(() => {
                        this.featureDrag.emit(evt);
                        this.drag.emit(evt);
                    });
                }
            }));
            this.sub.add(dragEnd$.subscribe((evt) => {
                moving = false;
                if (this.featureDragEnd.observed || this.dragEnd.observed) {
                    this.ngZone.run(() => {
                        this.featureDragEnd.emit(evt);
                        this.dragEnd.emit(evt);
                    });
                }
                if (!inside) {
                    // It's possible to dragEnd outside the target (small input lag)
                    this.mapService.changeCanvasCursor('');
                    this.mapService.updateDragPan(true);
                }
            }));
            this.sub.add(leave$
                .pipe(tap(() => (inside = false)), filter(() => !moving))
                .subscribe(() => {
                this.mapService.changeCanvasCursor('');
                this.mapService.updateDragPan(true);
            }));
        });
    }
    filterFeature(evt) {
        if (this.featureComponent && this.layer) {
            const feature = this.mapService.queryRenderedFeatures(evt.point, {
                layers: [this.layer.id],
                filter: [
                    'all',
                    ['==', '$type', 'Point'],
                    ['==', '$id', this.featureComponent.id],
                ],
            })[0];
            if (!feature) {
                return false;
            }
        }
        return true;
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, DraggableDirective.name);
        if (this.dragStart.observed) {
            dw('dragStart', 'featureDragStart');
        }
        if (this.dragEnd.observed) {
            dw('dragEnd', 'featureDragEnd');
        }
        if (this.drag.observed) {
            dw('drag', 'featureDrag');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: DraggableDirective, deps: [{ token: i1.MapService }, { token: i0.NgZone }, { token: i2.FeatureComponent, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: DraggableDirective, selector: "[mglDraggable]", inputs: { layer: ["mglDraggable", "layer"] }, outputs: { featureDragStart: "featureDragStart", featureDragEnd: "featureDragEnd", featureDrag: "featureDrag", dragStart: "dragStart", dragEnd: "dragEnd", drag: "drag" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: DraggableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglDraggable]',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i0.NgZone }, { type: i2.FeatureComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }], propDecorators: { layer: [{
                type: Input,
                args: ['mglDraggable']
            }], featureDragStart: [{
                type: Output
            }], featureDragEnd: [{
                type: Output
            }], featureDrag: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], drag: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUs5QyxNQUFNLE9BQU8sa0JBQWtCO0lBdUI3QixZQUNVLFVBQXNCLEVBQ3RCLE1BQWMsRUFDTSxnQkFBbUM7UUFGdkQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ00scUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQXRCdkQscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDckQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNuRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQzFEOztXQUVHO1FBQ08sY0FBUyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FB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UzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7MEJBMkJJLFFBQVE7OzBCQUFJLElBQUk7eUNBeEJJLEtBQUs7c0JBQTNCLEtBQUs7dUJBQUMsY0FBYztnQkFFWCxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBQ0csY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUlHLFNBQVM7c0JBQWxCLE1BQU07Z0JBSUcsT0FBTztzQkFBaEIsTUFBTTtnQkFLRyxJQUFJO3NCQUFiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcE1vdXNlRXZlbnQgfSBmcm9tICdtYXBib3gtZ2wnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5ZXIvbGF5ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVDb21wb25lbnQgfSBmcm9tICcuLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGRlcHJlY2F0aW9uV2FybmluZyB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21nbERyYWdnYWJsZV0nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdtZ2xEcmFnZ2FibGUnKSBsYXllcj86IExheWVyQ29tcG9uZW50O1xyXG5cclxuICBAT3V0cHV0KCkgZmVhdHVyZURyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcclxuICBAT3V0cHV0KCkgZmVhdHVyZURyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGZlYXR1cmVEcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIFVzZSBmZWF0dXJlRHJhZ1N0YXJ0IGluc3RlYWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIFVzZSBmZWF0dXJlRHJhZ0VuZCBpbnN0ZWFkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGZlYXR1cmVEcmFnIGluc3RlYWRcclxuICAgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcclxuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBmZWF0dXJlQ29tcG9uZW50PzogRmVhdHVyZUNvbXBvbmVudFxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLndhcm5EZXByZWNhdGVkT3V0cHV0cygpO1xyXG4gICAgbGV0IGVudGVyJDtcclxuICAgIGxldCBsZWF2ZSQ7XHJcbiAgICBsZXQgdXBkYXRlQ29vcmRzO1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZUNvbXBvbmVudCAmJiB0aGlzLmxheWVyKSB7XHJcbiAgICAgIGVudGVyJCA9IHRoaXMubGF5ZXIubGF5ZXJNb3VzZUVudGVyO1xyXG4gICAgICBsZWF2ZSQgPSB0aGlzLmxheWVyLmxheWVyTW91c2VMZWF2ZTtcclxuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5mZWF0dXJlQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQoXHJcbiAgICAgICAgdGhpcy5mZWF0dXJlQ29tcG9uZW50XHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLmZlYXR1cmVDb21wb25lbnQuZ2VvbWV0cnkudHlwZSAhPT0gJ1BvaW50Jykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWdsRHJhZ2dhYmxlIG9ubHkgc3VwcG9ydCBwb2ludCBmZWF0dXJlJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAnbWdsRHJhZ2dhYmxlIGNhbiBvbmx5IGJlIHVzZWQgb24gRmVhdHVyZSAod2l0aCBhIGxheWVyIGFzIGlucHV0KSBvciBNYXJrZXInXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oYW5kbGVEcmFnZ2FibGUoZW50ZXIkLCBsZWF2ZSQsIHVwZGF0ZUNvb3Jkcyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZURyYWdnYWJsZShcclxuICAgIGVudGVyJDogT2JzZXJ2YWJsZTxNYXBNb3VzZUV2ZW50PixcclxuICAgIGxlYXZlJDogT2JzZXJ2YWJsZTxNYXBNb3VzZUV2ZW50PixcclxuICAgIHVwZGF0ZUNvb3JkczogKGNvb3JkOiBudW1iZXJbXSkgPT4gdm9pZFxyXG4gICkge1xyXG4gICAgbGV0IG1vdmluZyA9IGZhbHNlO1xyXG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vdXNlVXAkID0gZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KFxyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSxcclxuICAgICAgICAnbW91c2V1cCdcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgZHJhZ1N0YXJ0JCA9IGVudGVyJC5waXBlKFxyXG4gICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKSxcclxuICAgICAgICBmaWx0ZXIoKGV2dCkgPT4gdGhpcy5maWx0ZXJGZWF0dXJlKGV2dCkpLFxyXG4gICAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignbW92ZScpO1xyXG4gICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4oZmFsc2UpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxyXG4gICAgICAgICAgZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KFxyXG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsXHJcbiAgICAgICAgICAgICdtb3VzZWRvd24nXHJcbiAgICAgICAgICApLnBpcGUodGFrZVVudGlsKGxlYXZlJCkpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBkcmFnZ2luZyQgPSBkcmFnU3RhcnQkLnBpcGUoXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XHJcbiAgICAgICAgICBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4oXHJcbiAgICAgICAgICAgIHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSxcclxuICAgICAgICAgICAgJ21vdXNlbW92ZSdcclxuICAgICAgICAgICkucGlwZSh0YWtlVW50aWwobW91c2VVcCQpKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgZHJhZ0VuZCQgPSBkcmFnU3RhcnQkLnBpcGUoc3dpdGNoTWFwKCgpID0+IG1vdXNlVXAkLnBpcGUodGFrZSgxKSkpKTtcclxuICAgICAgdGhpcy5zdWIuYWRkKFxyXG4gICAgICAgIGRyYWdTdGFydCQuc3Vic2NyaWJlKChldnQpID0+IHtcclxuICAgICAgICAgIG1vdmluZyA9IHRydWU7XHJcbiAgICAgICAgICBpZiAodGhpcy5mZWF0dXJlRHJhZ1N0YXJ0Lm9ic2VydmVkIHx8IHRoaXMuZHJhZ1N0YXJ0Lm9ic2VydmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlRHJhZ1N0YXJ0LmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgICB0aGlzLmRyYWdTdGFydC5lbWl0KGV2dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc3ViLmFkZChcclxuICAgICAgICBkcmFnZ2luZyQuc3Vic2NyaWJlKChldnQpID0+IHtcclxuICAgICAgICAgIHVwZGF0ZUNvb3JkcyhbZXZ0LmxuZ0xhdC5sbmcsIGV2dC5sbmdMYXQubGF0XSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5mZWF0dXJlRHJhZy5vYnNlcnZlZCB8fCB0aGlzLmRyYWcub2JzZXJ2ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmZlYXR1cmVEcmFnLmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgICB0aGlzLmRyYWcuZW1pdChldnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnN1Yi5hZGQoXHJcbiAgICAgICAgZHJhZ0VuZCQuc3Vic2NyaWJlKChldnQpID0+IHtcclxuICAgICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgaWYgKHRoaXMuZmVhdHVyZURyYWdFbmQub2JzZXJ2ZWQgfHwgdGhpcy5kcmFnRW5kLm9ic2VydmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlRHJhZ0VuZC5lbWl0KGV2dCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIWluc2lkZSkge1xyXG4gICAgICAgICAgICAvLyBJdCdzIHBvc3NpYmxlIHRvIGRyYWdFbmQgb3V0c2lkZSB0aGUgdGFyZ2V0IChzbWFsbCBpbnB1dCBsYWcpXHJcbiAgICAgICAgICAgIHRoaXMubWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnN1Yi5hZGQoXHJcbiAgICAgICAgbGVhdmUkXHJcbiAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgdGFwKCgpID0+IChpbnNpZGUgPSBmYWxzZSkpLFxyXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIW1vdmluZylcclxuICAgICAgICAgIClcclxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCcnKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4odHJ1ZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbHRlckZlYXR1cmUoZXZ0OiBNYXBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlQ29tcG9uZW50ICYmIHRoaXMubGF5ZXIpIHtcclxuICAgICAgY29uc3QgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPGFueT4gPVxyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoZXZ0LnBvaW50LCB7XHJcbiAgICAgICAgICBsYXllcnM6IFt0aGlzLmxheWVyLmlkXSxcclxuICAgICAgICAgIGZpbHRlcjogW1xyXG4gICAgICAgICAgICAnYWxsJyxcclxuICAgICAgICAgICAgWyc9PScsICckdHlwZScsICdQb2ludCddLFxyXG4gICAgICAgICAgICBbJz09JywgJyRpZCcsIHRoaXMuZmVhdHVyZUNvbXBvbmVudC5pZF0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0pWzBdO1xyXG4gICAgICBpZiAoIWZlYXR1cmUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XHJcbiAgICBjb25zdCBkdyA9IGRlcHJlY2F0aW9uV2FybmluZy5iaW5kKHVuZGVmaW5lZCwgRHJhZ2dhYmxlRGlyZWN0aXZlLm5hbWUpO1xyXG4gICAgaWYgKHRoaXMuZHJhZ1N0YXJ0Lm9ic2VydmVkKSB7XHJcbiAgICAgIGR3KCdkcmFnU3RhcnQnLCAnZmVhdHVyZURyYWdTdGFydCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZHJhZ0VuZC5vYnNlcnZlZCkge1xyXG4gICAgICBkdygnZHJhZ0VuZCcsICdmZWF0dXJlRHJhZ0VuZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZHJhZy5vYnNlcnZlZCkge1xyXG4gICAgICBkdygnZHJhZycsICdmZWF0dXJlRHJhZycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=