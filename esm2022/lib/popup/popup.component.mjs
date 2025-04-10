import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class PopupComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.popupClose = new EventEmitter();
        this.popupOpen = new EventEmitter();
        /**
         * @deprecated Use popupClose instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.close = new EventEmitter();
        /**
         * @deprecated Use popupOpen instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.open = new EventEmitter();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        if ((this.lngLat && this.marker) ||
            (this.feature && this.lngLat) ||
            (this.feature && this.marker)) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if ((changes['lngLat'] && !changes['lngLat'].isFirstChange()) ||
            (changes['feature'] && !changes['feature'].isFirstChange())) {
            const newlngLat = changes['lngLat']
                ? this.lngLat
                : this.feature.geometry.coordinates;
            this.mapService.removePopupFromMap(this.popupInstance, true);
            const popupInstanceTmp = this.createPopup();
            this.mapService.addPopupToMap(popupInstanceTmp, newlngLat, this.popupInstance.isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes['marker'] && !changes['marker'].isFirstChange()) {
            const previousMarker = changes['marker'].previousValue;
            if (previousMarker.markerInstance) {
                this.mapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.mapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
        if (changes['offset'] &&
            !changes['offset'].isFirstChange() &&
            this.popupInstance) {
            this.popupInstance.setOffset(this.offset);
        }
    }
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat || this.feature) {
                this.mapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.mapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    createPopup() {
        return this.mapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton,
                closeOnClick: this.closeOnClick,
                closeOnMove: this.closeOnMove,
                focusAfterOpen: this.focusAfterOpen,
                anchor: this.anchor,
                offset: this.offset,
                className: this.className,
                maxWidth: this.maxWidth,
            },
            popupEvents: {
                open: this.open,
                close: this.close,
                popupOpen: this.popupOpen,
                popupClose: this.popupClose,
            },
        }, this.content.nativeElement);
    }
    addPopup(popup) {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.lngLat || this.feature) {
                this.mapService.addPopupToMap(popup, this.lngLat
                    ? this.lngLat
                    : this.feature.geometry.coordinates);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.mapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, PopupComponent.name);
        if (this.close.observed) {
            dw('close', 'popupClose');
        }
        if (this.open.observed) {
            dw('open', 'popupOpen');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: PopupComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: PopupComponent, selector: "mgl-popup", inputs: { closeButton: "closeButton", closeOnClick: "closeOnClick", closeOnMove: "closeOnMove", focusAfterOpen: "focusAfterOpen", anchor: "anchor", className: "className", maxWidth: "maxWidth", feature: "feature", lngLat: "lngLat", marker: "marker", offset: "offset" }, outputs: { popupClose: "popupClose", popupOpen: "popupOpen", close: "close", open: "open" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { closeButton: [{
                type: Input
            }], closeOnClick: [{
                type: Input
            }], closeOnMove: [{
                type: Input
            }], focusAfterOpen: [{
                type: Input
            }], anchor: [{
                type: Input
            }], className: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], feature: [{
                type: Input
            }], lngLat: [{
                type: Input
            }], marker: [{
                type: Input
            }], offset: [{
                type: Input
            }], popupClose: [{
                type: Output
            }], popupOpen: [{
                type: Output
            }], close: [{
                type: Output
            }], open: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvcG9wdXAvcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQU85QyxNQUFNLE9BQU8sY0FBYztJQW1DekIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWpCaEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdEMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDL0M7O1dBRUc7UUFDSCw0REFBNEQ7UUFDbEQsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDM0M7O1dBRUc7UUFDSCw0REFBNEQ7UUFDbEQsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFNRyxDQUFDO0lBRTlDLFFBQVE7UUFDTixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUNFLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVCLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQzdCLENBQUM7WUFDRCxNQUFNLElBQUksS0FBSyxD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LFNBQVM7c0JBQWxCLE1BQU07Z0JBS0csS0FBSztzQkFBZCxNQUFNO2dCQUtHLElBQUk7c0JBQWIsTUFBTTtnQkFFaUMsT0FBTztzQkFBOUMsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExuZ0xhdExpa2UsIFBvaW50TGlrZSwgUG9wdXAsIFBvcHVwT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGRlcHJlY2F0aW9uV2FybmluZyB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWdsLXBvcHVwJyxcclxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdFxyXG57XHJcbiAgLyogSW5pdCBpbnB1dCAqL1xyXG4gIEBJbnB1dCgpIGNsb3NlQnV0dG9uPzogUG9wdXBPcHRpb25zWydjbG9zZUJ1dHRvbiddO1xyXG4gIEBJbnB1dCgpIGNsb3NlT25DbGljaz86IFBvcHVwT3B0aW9uc1snY2xvc2VPbkNsaWNrJ107XHJcbiAgQElucHV0KCkgY2xvc2VPbk1vdmU/OiBQb3B1cE9wdGlvbnNbJ2Nsb3NlT25Nb3ZlJ107XHJcbiAgQElucHV0KCkgZm9jdXNBZnRlck9wZW4/OiBQb3B1cE9wdGlvbnNbJ2ZvY3VzQWZ0ZXJPcGVuJ107XHJcbiAgQElucHV0KCkgYW5jaG9yPzogUG9wdXBPcHRpb25zWydhbmNob3InXTtcclxuICBASW5wdXQoKSBjbGFzc05hbWU/OiBQb3B1cE9wdGlvbnNbJ2NsYXNzTmFtZSddO1xyXG4gIEBJbnB1dCgpIG1heFdpZHRoPzogUG9wdXBPcHRpb25zWydtYXhXaWR0aCddO1xyXG5cclxuICAvKiBEeW5hbWljIGlucHV0ICovXHJcbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcclxuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xyXG4gIEBJbnB1dCgpIG1hcmtlcj86IE1hcmtlckNvbXBvbmVudDtcclxuICBASW5wdXQoKSBvZmZzZXQ/OiBudW1iZXIgfCBQb2ludExpa2UgfCB7IFthbmNob3I6IHN0cmluZ106IFtudW1iZXIsIG51bWJlcl0gfTtcclxuXHJcbiAgQE91dHB1dCgpIHBvcHVwQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgQE91dHB1dCgpIHBvcHVwT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCBVc2UgcG9wdXBDbG9zZSBpbnN0ZWFkXHJcbiAgICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXHJcbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIFVzZSBwb3B1cE9wZW4gaW5zdGVhZFxyXG4gICAqL1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxyXG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgY29udGVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgcG9wdXBJbnN0YW5jZT86IFBvcHVwO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy53YXJuRGVwcmVjYXRlZE91dHB1dHMoKTtcclxuICAgIGlmIChcclxuICAgICAgKHRoaXMubG5nTGF0ICYmIHRoaXMubWFya2VyKSB8fFxyXG4gICAgICAodGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0KSB8fFxyXG4gICAgICAodGhpcy5mZWF0dXJlICYmIHRoaXMubWFya2VyKVxyXG4gICAgKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFya2VyLCBsbmdMYXQsIGZlYXR1cmUgaW5wdXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKFxyXG4gICAgICAoY2hhbmdlc1snbG5nTGF0J10gJiYgIWNoYW5nZXNbJ2xuZ0xhdCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ2ZlYXR1cmUnXSAmJiAhY2hhbmdlc1snZmVhdHVyZSddLmlzRmlyc3RDaGFuZ2UoKSlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBuZXdsbmdMYXQgPSBjaGFuZ2VzWydsbmdMYXQnXVxyXG4gICAgICAgID8gdGhpcy5sbmdMYXQhXHJcbiAgICAgICAgOiAodGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhIGFzIFtudW1iZXIsIG51bWJlcl0pO1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSEsIHRydWUpO1xyXG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlVG1wID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChcclxuICAgICAgICBwb3B1cEluc3RhbmNlVG1wLFxyXG4gICAgICAgIG5ld2xuZ0xhdCxcclxuICAgICAgICB0aGlzLnBvcHVwSW5zdGFuY2UhLmlzT3BlbigpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHBvcHVwSW5zdGFuY2VUbXA7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbWFya2VyJ10gJiYgIWNoYW5nZXNbJ21hcmtlciddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICBjb25zdCBwcmV2aW91c01hcmtlcjogTWFya2VyQ29tcG9uZW50ID0gY2hhbmdlc1snbWFya2VyJ10ucHJldmlvdXNWYWx1ZTtcclxuICAgICAgaWYgKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcihwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlICYmIHRoaXMucG9wdXBJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKFxyXG4gICAgICAgICAgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsXHJcbiAgICAgICAgICB0aGlzLnBvcHVwSW5zdGFuY2VcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGNoYW5nZXNbJ29mZnNldCddICYmXHJcbiAgICAgICFjaGFuZ2VzWydvZmZzZXQnXS5pc0ZpcnN0Q2hhbmdlKCkgJiZcclxuICAgICAgdGhpcy5wb3B1cEluc3RhbmNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5wb3B1cEluc3RhbmNlLnNldE9mZnNldCh0aGlzLm9mZnNldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XHJcbiAgICB0aGlzLmFkZFBvcHVwKHRoaXMucG9wdXBJbnN0YW5jZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnBvcHVwSW5zdGFuY2UpIHtcclxuICAgICAgaWYgKHRoaXMubG5nTGF0IHx8IHRoaXMuZmVhdHVyZSkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBvcHVwKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU2VydmljZS5jcmVhdGVQb3B1cChcclxuICAgICAge1xyXG4gICAgICAgIHBvcHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgY2xvc2VCdXR0b246IHRoaXMuY2xvc2VCdXR0b24sXHJcbiAgICAgICAgICBjbG9zZU9uQ2xpY2s6IHRoaXMuY2xvc2VPbkNsaWNrLFxyXG4gICAgICAgICAgY2xvc2VPbk1vdmU6IHRoaXMuY2xvc2VPbk1vdmUsXHJcbiAgICAgICAgICBmb2N1c0FmdGVyT3BlbjogdGhpcy5mb2N1c0FmdGVyT3BlbixcclxuICAgICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXHJcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNsYXNzTmFtZSxcclxuICAgICAgICAgIG1heFdpZHRoOiB0aGlzLm1heFdpZHRoLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9wdXBFdmVudHM6IHtcclxuICAgICAgICAgIG9wZW46IHRoaXMub3BlbixcclxuICAgICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlLFxyXG4gICAgICAgICAgcG9wdXBPcGVuOiB0aGlzLnBvcHVwT3BlbixcclxuICAgICAgICAgIHBvcHVwQ2xvc2U6IHRoaXMucG9wdXBDbG9zZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkUG9wdXAocG9wdXA6IFBvcHVwKSB7XHJcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubG5nTGF0IHx8IHRoaXMuZmVhdHVyZSkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKFxyXG4gICAgICAgICAgcG9wdXAsXHJcbiAgICAgICAgICB0aGlzLmxuZ0xhdFxyXG4gICAgICAgICAgICA/IHRoaXMubG5nTGF0XHJcbiAgICAgICAgICAgIDogKHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzISBhcyBbbnVtYmVyLCBudW1iZXJdKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgcG9wdXApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdtZ2wtcG9wdXAgbmVlZCBlaXRoZXIgbG5nTGF0L21hcmtlci9mZWF0dXJlIHRvIGJlIHNldCdcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgd2FybkRlcHJlY2F0ZWRPdXRwdXRzKCkge1xyXG4gICAgY29uc3QgZHcgPSBkZXByZWNhdGlvbldhcm5pbmcuYmluZCh1bmRlZmluZWQsIFBvcHVwQ29tcG9uZW50Lm5hbWUpO1xyXG4gICAgaWYgKHRoaXMuY2xvc2Uub2JzZXJ2ZWQpIHtcclxuICAgICAgZHcoJ2Nsb3NlJywgJ3BvcHVwQ2xvc2UnKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wZW4ub2JzZXJ2ZWQpIHtcclxuICAgICAgZHcoJ29wZW4nLCAncG9wdXBPcGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==