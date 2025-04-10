import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MapService } from '../map/map.service';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class MarkerComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.markerDragStart = new EventEmitter();
        this.markerDragEnd = new EventEmitter();
        this.markerDrag = new EventEmitter();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
            this.markerInstance.setLngLat(this.lngLat);
        }
        if (changes['feature'] && !changes['feature'].isFirstChange()) {
            this.markerInstance.setLngLat(this.feature.geometry.coordinates);
        }
        if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
            this.markerInstance.setDraggable(!!this.draggable);
        }
        if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
            changes['popupShown'].currentValue
                ? this.markerInstance?.getPopup()?.addTo(this.mapService.mapInstance)
                : this.markerInstance?.getPopup()?.remove();
        }
        if (changes['pitchAlignment'] &&
            !changes['pitchAlignment'].isFirstChange()) {
            this.markerInstance.setPitchAlignment(changes['pitchAlignment'].currentValue);
        }
        if (changes['rotationAlignment'] &&
            !changes['rotationAlignment'].isFirstChange()) {
            this.markerInstance.setRotationAlignment(changes['rotationAlignment'].currentValue);
        }
    }
    ngAfterViewInit() {
        this.mapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.mapService.addMarker({
                markersOptions: {
                    offset: this.offset,
                    anchor: this.anchor,
                    pitchAlignment: this.pitchAlignment,
                    rotationAlignment: this.rotationAlignment,
                    draggable: !!this.draggable,
                    element: this.content.nativeElement,
                    feature: this.feature,
                    lngLat: this.lngLat,
                    clickTolerance: this.clickTolerance,
                },
                markersEvents: {
                    markerDragStart: this.markerDragStart,
                    markerDrag: this.markerDrag,
                    markerDragEnd: this.markerDragEnd
                },
            });
        });
    }
    ngOnDestroy() {
        this.mapService.removeMarker(this.markerInstance);
        this.markerInstance = undefined;
    }
    togglePopup() {
        this.markerInstance.togglePopup();
    }
    updateCoordinates(coordinates) {
        this.markerInstance.setLngLat(coordinates);
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, MarkerComponent.name);
        if (this.markerDragStart.observed) {
            dw('dragStart', 'markerDragStart');
        }
        if (this.markerDragEnd.observed) {
            dw('dragEnd', 'markerDragEnd');
        }
        if (this.markerDrag.observed) {
            dw('drag', 'markerDrag');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MarkerComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: MarkerComponent, selector: "mgl-marker", inputs: { offset: "offset", anchor: "anchor", clickTolerance: "clickTolerance", feature: "feature", lngLat: "lngLat", draggable: "draggable", popupShown: "popupShown", className: "className", pitchAlignment: "pitchAlignment", rotationAlignment: "rotationAlignment" }, outputs: { markerDragStart: "markerDragStart", markerDragEnd: "markerDragEnd", markerDrag: "markerDrag" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div [class]="className" #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MarkerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-marker',
                    template: '<div [class]="className" #content><ng-content></ng-content></div>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { offset: [{
                type: Input
            }], anchor: [{
                type: Input
            }], clickTolerance: [{
                type: Input
            }], feature: [{
                type: Input
            }], lngLat: [{
                type: Input
            }], draggable: [{
                type: Input
            }], popupShown: [{
                type: Input
            }], className: [{
                type: Input
            }], pitchAlignment: [{
                type: Input
            }], rotationAlignment: [{
                type: Input
            }], markerDragStart: [{
                type: Output
            }], markerDragEnd: [{
                type: Output
            }], markerDrag: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcmtlci9tYXJrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQVE5QyxNQUFNLE9BQU8sZUFBZTtJQXdCMUIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVJoQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0Msa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBTUosQ0FBQztJQUUvQyxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDckUsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztZQUM1RCxJQUFJLENBQUMsY0FBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQztR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QUFLO2dCQUVJLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUVpQyxPQUFPO3NCQUE5QyxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTG5nTGF0TGlrZSwgTWFya2VyLCBNYXJrZXJPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IGRlcHJlY2F0aW9uV2FybmluZyB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcicsXHJcbiAgdGVtcGxhdGU6ICc8ZGl2IFtjbGFzc109XCJjbGFzc05hbWVcIiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICAvKiBJbml0IGlucHV0ICovXHJcbiAgQElucHV0KCkgb2Zmc2V0PzogTWFya2VyT3B0aW9uc1snb2Zmc2V0J107XHJcbiAgQElucHV0KCkgYW5jaG9yPzogTWFya2VyT3B0aW9uc1snYW5jaG9yJ107XHJcbiAgQElucHV0KCkgY2xpY2tUb2xlcmFuY2U/OiBNYXJrZXJPcHRpb25zWydjbGlja1RvbGVyYW5jZSddO1xyXG5cclxuICAvKiBEeW5hbWljIGlucHV0ICovXHJcbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcclxuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xyXG4gIEBJbnB1dCgpIGRyYWdnYWJsZT86IE1hcmtlck9wdGlvbnNbJ2RyYWdnYWJsZSddO1xyXG4gIEBJbnB1dCgpIHBvcHVwU2hvd24/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBpdGNoQWxpZ25tZW50PzogTWFya2VyT3B0aW9uc1sncGl0Y2hBbGlnbm1lbnQnXTtcclxuICBASW5wdXQoKSByb3RhdGlvbkFsaWdubWVudD86IE1hcmtlck9wdGlvbnNbJ3JvdGF0aW9uQWxpZ25tZW50J107XHJcblxyXG4gIEBPdXRwdXQoKSBtYXJrZXJEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcclxuICBAT3V0cHV0KCkgbWFya2VyRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xyXG4gIEBPdXRwdXQoKSBtYXJrZXJEcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50OiBFbGVtZW50UmVmO1xyXG5cclxuICBtYXJrZXJJbnN0YW5jZT86IE1hcmtlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLndhcm5EZXByZWNhdGVkT3V0cHV0cygpO1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZSAmJiB0aGlzLmxuZ0xhdCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZlYXR1cmUgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1snbG5nTGF0J10gJiYgIWNoYW5nZXNbJ2xuZ0xhdCddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5sbmdMYXQhKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydmZWF0dXJlJ10gJiYgIWNoYW5nZXNbJ2ZlYXR1cmUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KFxyXG4gICAgICAgIHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzIGFzIFtudW1iZXIsIG51bWJlcl1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSAmJiAhY2hhbmdlc1snZHJhZ2dhYmxlJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldERyYWdnYWJsZSghIXRoaXMuZHJhZ2dhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sncG9wdXBTaG93biddICYmICFjaGFuZ2VzWydwb3B1cFNob3duJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIGNoYW5nZXNbJ3BvcHVwU2hvd24nXS5jdXJyZW50VmFsdWVcclxuICAgICAgICA/IHRoaXMubWFya2VySW5zdGFuY2U/LmdldFBvcHVwKCk/LmFkZFRvKHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSlcclxuICAgICAgICA6IHRoaXMubWFya2VySW5zdGFuY2U/LmdldFBvcHVwKCk/LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICBjaGFuZ2VzWydwaXRjaEFsaWdubWVudCddICYmXHJcbiAgICAgICFjaGFuZ2VzWydwaXRjaEFsaWdubWVudCddLmlzRmlyc3RDaGFuZ2UoKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldFBpdGNoQWxpZ25tZW50KFxyXG4gICAgICAgIGNoYW5nZXNbJ3BpdGNoQWxpZ25tZW50J10uY3VycmVudFZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGNoYW5nZXNbJ3JvdGF0aW9uQWxpZ25tZW50J10gJiZcclxuICAgICAgIWNoYW5nZXNbJ3JvdGF0aW9uQWxpZ25tZW50J10uaXNGaXJzdENoYW5nZSgpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0Um90YXRpb25BbGlnbm1lbnQoXHJcbiAgICAgICAgY2hhbmdlc1sncm90YXRpb25BbGlnbm1lbnQnXS5jdXJyZW50VmFsdWVcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdGhpcy5tYXBTZXJ2aWNlLmFkZE1hcmtlcih7XHJcbiAgICAgICAgbWFya2Vyc09wdGlvbnM6IHtcclxuICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXHJcbiAgICAgICAgICBhbmNob3I6IHRoaXMuYW5jaG9yLFxyXG4gICAgICAgICAgcGl0Y2hBbGlnbm1lbnQ6IHRoaXMucGl0Y2hBbGlnbm1lbnQsXHJcbiAgICAgICAgICByb3RhdGlvbkFsaWdubWVudDogdGhpcy5yb3RhdGlvbkFsaWdubWVudCxcclxuICAgICAgICAgIGRyYWdnYWJsZTogISF0aGlzLmRyYWdnYWJsZSxcclxuICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5mZWF0dXJlLFxyXG4gICAgICAgICAgbG5nTGF0OiB0aGlzLmxuZ0xhdCxcclxuICAgICAgICAgIGNsaWNrVG9sZXJhbmNlOiB0aGlzLmNsaWNrVG9sZXJhbmNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFya2Vyc0V2ZW50czoge1xyXG4gICAgICAgICAgbWFya2VyRHJhZ1N0YXJ0OiB0aGlzLm1hcmtlckRyYWdTdGFydCxcclxuICAgICAgICAgIG1hcmtlckRyYWc6IHRoaXMubWFya2VyRHJhZyxcclxuICAgICAgICAgIG1hcmtlckRyYWdFbmQ6IHRoaXMubWFya2VyRHJhZ0VuZFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVNYXJrZXIodGhpcy5tYXJrZXJJbnN0YW5jZSEpO1xyXG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVBvcHVwKCkge1xyXG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEudG9nZ2xlUG9wdXAoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xyXG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KGNvb3JkaW5hdGVzIGFzIFtudW1iZXIsIG51bWJlcl0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XHJcbiAgICBjb25zdCBkdyA9IGRlcHJlY2F0aW9uV2FybmluZy5iaW5kKHVuZGVmaW5lZCwgTWFya2VyQ29tcG9uZW50Lm5hbWUpO1xyXG4gICAgaWYgKHRoaXMubWFya2VyRHJhZ1N0YXJ0Lm9ic2VydmVkKSB7XHJcbiAgICAgIGR3KCdkcmFnU3RhcnQnLCAnbWFya2VyRHJhZ1N0YXJ0Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5tYXJrZXJEcmFnRW5kLm9ic2VydmVkKSB7XHJcbiAgICAgIGR3KCdkcmFnRW5kJywgJ21hcmtlckRyYWdFbmQnKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1hcmtlckRyYWcub2JzZXJ2ZWQpIHtcclxuICAgICAgZHcoJ2RyYWcnLCAnbWFya2VyRHJhZycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=