import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class CanvasSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.sourceAdded = false;
        this.sub = new Subscription();
        throw new Error('mgl-canvas-source is not implemented, as CanvasSource does not appear to be supported by mapbox-gl v3');
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['canvas'] && !changes['canvas'].isFirstChange()) ||
            (changes['animate'] && !changes['animate'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        /*
        const source: CanvasSourceRaw = {
          type: 'canvas',
          coordinates: this.coordinates,
          canvas: this.canvas,
          animate: this.animate,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
        */
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: CanvasSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: CanvasSourceComponent, selector: "mgl-canvas-source", inputs: { id: "id", coordinates: "coordinates", canvas: "canvas", animate: "animate" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: CanvasSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-canvas-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { id: [{
                type: Input
            }], coordinates: [{
                type: Input
            }], canvas: [{
                type: Input
            }], animate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvY2FudmFzLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxHQUtOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQVFoRCxNQUFNLE9BQU8scUJBQXFCO0lBY2hDLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFIbEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsUUFBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1R0FBdUcsQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2lCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNuRSxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEIsT0FBTztRQUNULENBQUM7UUFDRCxJQUNFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3pELENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQzNELENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7YUFBTSxJQUNMLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDdEIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQ3ZDLENBQUM7WUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBZSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3pCLE9BQU87WUFDVCxDQUFDO1lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFTyxJQUFJO1FBQ1Y7Ozs7Ozs7OztVQVNFO0lBQ0osQ0FBQzs4R0F4RVUscUJBQXFCO2tHQUFyQixxQkFBcUIsc0tBSHRCLEVBQUU7OzJGQUdELHFCQUFxQjtrQkFMakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7K0VBS1UsRUFBRTtzQkFBVixLQUFLO2dCQUdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhbnZhc1NvdXJjZSB9IGZyb20gJ21hcGJveC1nbCc7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IENhbnZhc1NvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWdsLWNhbnZhcy1zb3VyY2UnLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbnZhc1NvdXJjZUNvbXBvbmVudFxyXG5cclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIENhbnZhc1NvdXJjZU9wdGlvbnMge1xyXG4gIC8qIEluaXQgaW5wdXRzICovXHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuXHJcbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cclxuICBASW5wdXQoKSBjb29yZGluYXRlczogQ2FudmFzU291cmNlT3B0aW9uc1snY29vcmRpbmF0ZXMnXTtcclxuICBASW5wdXQoKSBjYW52YXM6IENhbnZhc1NvdXJjZU9wdGlvbnNbJ2NhbnZhcyddO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGU/OiBDYW52YXNTb3VyY2VPcHRpb25zWydhbmltYXRlJ107XHJcblxyXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbC1jYW52YXMtc291cmNlIGlzIG5vdCBpbXBsZW1lbnRlZCwgYXMgQ2FudmFzU291cmNlIGRvZXMgbm90IGFwcGVhciB0byBiZSBzdXBwb3J0ZWQgYnkgbWFwYm94LWdsIHYzJyk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IHN1YjEgPSB0aGlzLm1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXHJcbiAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+ICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0U291cmNlKHRoaXMuaWQpKSlcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWIuYWRkKHN1YjEpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgKGNoYW5nZXNbJ2NhbnZhcyddICYmICFjaGFuZ2VzWydjYW52YXMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydhbmltYXRlJ10gJiYgIWNoYW5nZXNbJ2FuaW1hdGUnXS5pc0ZpcnN0Q2hhbmdlKCkpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBjaGFuZ2VzWydjb29yZGluYXRlcyddICYmXHJcbiAgICAgICFjaGFuZ2VzWydjb29yZGluYXRlcyddLmlzRmlyc3RDaGFuZ2UoKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8Q2FudmFzU291cmNlPih0aGlzLmlkKTtcclxuICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZS5zZXRDb29yZGluYXRlcyh0aGlzLmNvb3JkaW5hdGVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XHJcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpIHtcclxuICAgIC8qXHJcbiAgICBjb25zdCBzb3VyY2U6IENhbnZhc1NvdXJjZVJhdyA9IHtcclxuICAgICAgdHlwZTogJ2NhbnZhcycsXHJcbiAgICAgIGNvb3JkaW5hdGVzOiB0aGlzLmNvb3JkaW5hdGVzLFxyXG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxyXG4gICAgICBhbmltYXRlOiB0aGlzLmFuaW1hdGUsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xyXG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XHJcbiAgICAqL1xyXG4gIH1cclxufVxyXG4iXX0=