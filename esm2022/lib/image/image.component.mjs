import { Component, EventEmitter, Input, NgZone, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class ImageComponent {
    constructor(mapService, zone) {
        this.mapService = mapService;
        this.zone = zone;
        this.imageError = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        /**
         * @deprecated Use imageError instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.error = new EventEmitter();
        /**
         * @deprecated Use imageLoaded instead
         */
        this.loaded = new EventEmitter();
        this.isAdded = false;
        this.isAdding = false;
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(startWith(undefined), filter(() => !this.isAdding && !this.mapService.mapInstance.hasImage(this.id)))))
            .subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if ((changes['data'] && !changes['data'].isFirstChange()) ||
            (changes['options'] && !changes['options'].isFirstChange()) ||
            (changes['url'] && !changes['url'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    ngOnDestroy() {
        if (this.isAdded) {
            this.mapService.removeImage(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    async init() {
        this.isAdding = true;
        if (this.data) {
            this.mapService.addImage(this.id, this.data, this.options);
            this.isAdded = true;
            this.isAdding = false;
        }
        else if (this.url) {
            try {
                await this.mapService.loadAndAddImage(this.id, this.url, this.options);
                this.isAdded = true;
                this.isAdding = false;
                this.zone.run(() => {
                    this.imageLoaded.emit();
                    this.loaded.emit();
                });
            }
            catch (error) {
                this.zone.run(() => {
                    this.imageError.emit(error);
                    this.error.emit(error);
                });
            }
        }
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, ImageComponent.name);
        if (this.error.observed) {
            dw('error', 'imageError');
        }
        if (this.loaded.observed) {
            dw('loaded', 'imageLoaded');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ImageComponent, deps: [{ token: i1.MapService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: ImageComponent, selector: "mgl-image", inputs: { id: "id", data: "data", options: "options", url: "url" }, outputs: { imageError: "imageError", imageLoaded: "imageLoaded", error: "error", loaded: "loaded" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image',
                    template: '',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i0.NgZone }], propDecorators: { id: [{
                type: Input
            }], data: [{
                type: Input
            }], options: [{
                type: Input
            }], url: [{
                type: Input
            }], imageError: [{
                type: Output
            }], imageLoaded: [{
                type: Output
            }], error: [{
                type: Output
            }], loaded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQU05QyxNQUFNLE9BQU8sY0FBYztJQXlCekIsWUFBb0IsVUFBc0IsRUFBVSxJQUFZO1FBQTVDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBaEJ0RCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDcEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pEOztXQUVHO1FBQ0gsNERBQTREO1FBQ2xELFVBQUssR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUN6RDs7V0FFRztRQUNPLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXBDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUcwQyxDQUFDO0lBRXBFLFFBQVE7UUFDTixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTthQUNsQyxJQUFJLENBQ0gsU0FBUyxD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QjtRQUMzQixNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7OEdBaEdVLGNBQWM7a0dBQWQsY0FBYywrT0FGZixFQUFFOzsyRkFFRCxjQUFjO2tCQUoxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsRUFBRTtpQkFDYjtvR0FHVSxFQUFFO3NCQUFWLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUtHLEtBQUs7c0JBQWQsTUFBTTtnQkFJRyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcclxuaW1wb3J0IHsgZGVwcmVjYXRpb25XYXJuaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2UnLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgLyogSW5pdCBpbnB1dHMgKi9cclxuICBASW5wdXQoKSBpZDogc3RyaW5nO1xyXG5cclxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xyXG4gIEBJbnB1dCgpIGRhdGE/OiBNYXBJbWFnZURhdGE7XHJcbiAgQElucHV0KCkgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucztcclxuICBASW5wdXQoKSB1cmw/OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBpbWFnZUVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjx7IHN0YXR1czogbnVtYmVyIH0+KCk7XHJcbiAgQE91dHB1dCgpIGltYWdlTG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIFVzZSBpbWFnZUVycm9yIGluc3RlYWRcclxuICAgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3RhdHVzOiBudW1iZXIgfT4oKTtcclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCBVc2UgaW1hZ2VMb2FkZWQgaW5zdGVhZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIHByaXZhdGUgaXNBZGRlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgaXNBZGRpbmcgPSBmYWxzZTtcclxuICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMud2FybkRlcHJlY2F0ZWRPdXRwdXRzKCk7XHJcbiAgICB0aGlzLnN1YiA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxyXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXHJcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICBmaWx0ZXIoXHJcbiAgICAgICAgICAgICAgKCkgPT5cclxuICAgICAgICAgICAgICAgICF0aGlzLmlzQWRkaW5nICYmICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuaGFzSW1hZ2UodGhpcy5pZClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaW5pdCgpKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChcclxuICAgICAgKGNoYW5nZXNbJ2RhdGEnXSAmJiAhY2hhbmdlc1snZGF0YSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ29wdGlvbnMnXSAmJiAhY2hhbmdlc1snb3B0aW9ucyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ3VybCddICYmICFjaGFuZ2VzWyd1cmwnXS5pc0ZpcnN0Q2hhbmdlKCkpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLmlzQWRkZWQpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZUltYWdlKHRoaXMuaWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3ViKSB7XHJcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGluaXQoKSB7XHJcbiAgICB0aGlzLmlzQWRkaW5nID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmRhdGEpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZEltYWdlKHRoaXMuaWQsIHRoaXMuZGF0YSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgdGhpcy5pc0FkZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnVybCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMubWFwU2VydmljZS5sb2FkQW5kQWRkSW1hZ2UodGhpcy5pZCwgdGhpcy51cmwsIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5pc0FkZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzQWRkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmltYWdlTG9hZGVkLmVtaXQoKTtcclxuICAgICAgICAgIHRoaXMubG9hZGVkLmVtaXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pbWFnZUVycm9yLmVtaXQoZXJyb3IpO1xyXG4gICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XHJcbiAgICBjb25zdCBkdyA9IGRlcHJlY2F0aW9uV2FybmluZy5iaW5kKHVuZGVmaW5lZCwgSW1hZ2VDb21wb25lbnQubmFtZSk7XHJcbiAgICBpZiAodGhpcy5lcnJvci5vYnNlcnZlZCkge1xyXG4gICAgICBkdygnZXJyb3InLCAnaW1hZ2VFcnJvcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubG9hZGVkLm9ic2VydmVkKSB7XHJcbiAgICAgIGR3KCdsb2FkZWQnLCAnaW1hZ2VMb2FkZWQnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19