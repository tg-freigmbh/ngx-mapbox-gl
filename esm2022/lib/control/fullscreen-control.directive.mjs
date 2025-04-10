import { Directive, Host, HostListener, Input, } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
export class FullscreenControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    onFullscreen() {
        this.mapService.mapInstance.resize();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            this.controlComponent.control = new FullscreenControl({
                container: this.container,
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: FullscreenControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: FullscreenControlDirective, selector: "[mglFullscreen]", inputs: { container: "container" }, host: { listeners: { "window:webkitfullscreenchange": "onFullscreen($event.target)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: FullscreenControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglFullscreen]',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }], propDecorators: { container: [{
                type: Input
            }], onFullscreen: [{
                type: HostListener,
                args: ['window:webkitfullscreenchange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2NvbnRyb2wvZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULElBQUksRUFDSixZQUFZLEVBQ1osS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLdkQsTUFBTSxPQUFPLDBCQUEwQjtJQUlyQyxZQUNVLFVBQXNCLEVBQ2QsZ0JBQXFEO1FBRDdELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFDO0lBQ3BFLENBQUM7SUFHSixZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztnQkFDcEQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUMvQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTNCVSwwQkFBMEI7a0dBQTFCLDBCQUEwQjs7MkZBQTFCLDBCQUEwQjtrQkFIdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7MEJBT0ksSUFBSTt5Q0FKRSxTQUFTO3NCQUFqQixLQUFLO2dCQVFOLFlBQVk7c0JBRFgsWUFBWTt1QkFBQywrQkFBK0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgSG9zdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21nbEZ1bGxzY3JlZW5dJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyogSW5pdCBpbnB1dHMgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBASG9zdCgpIHByaXZhdGUgY29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudDxGdWxsc2NyZWVuQ29udHJvbD5cclxuICApIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzp3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgb25GdWxsc2NyZWVuKCkge1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLnJlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBGdWxsc2NyZWVuQ29udHJvbCh7XHJcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5hZGRDb250cm9sKFxyXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sLFxyXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvblxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==