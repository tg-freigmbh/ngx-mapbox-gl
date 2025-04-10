import { Directive, Host, Input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
export class NavigationControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            if (this.showCompass !== undefined) {
                options.showCompass = this.showCompass;
            }
            if (this.showZoom !== undefined) {
                options.showZoom = this.showZoom;
            }
            this.controlComponent.control = new NavigationControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: NavigationControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: NavigationControlDirective, selector: "[mglNavigation]", inputs: { showCompass: "showCompass", showZoom: "showZoom" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: NavigationControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglNavigation]',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }], propDecorators: { showCompass: [{
                type: Input
            }], showZoom: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLdkQsTUFBTSxPQUFPLDBCQUEwQjtJQUtyQyxZQUNVLFVBQXNCLEVBQ2QsZ0JBQXFEO1FBRDdELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFDO0lBQ3BFLENBQUM7SUFFSixrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFDRCxNQUFNLE9BQU8sR0FBa0QsRUFBRSxDQUFDO1lBQ2xFLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUMvQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTVCVSwwQkFBMEI7a0dBQTFCLDBCQUEwQjs7MkZBQTFCLDBCQUEwQjtrQkFIdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7MEJBUUksSUFBSTt5Q0FMRSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBEaXJlY3RpdmUsIEhvc3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21nbE5hdmlnYXRpb25dJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyogSW5pdCBpbnB1dHMgKi9cclxuICBASW5wdXQoKSBzaG93Q29tcGFzcz86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd1pvb20/OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIEBIb3N0KCkgcHJpdmF0ZSBjb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50PE5hdmlnYXRpb25Db250cm9sPlxyXG4gICkge31cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvcHRpb25zOiB7IHNob3dDb21wYXNzPzogYm9vbGVhbjsgc2hvd1pvb20/OiBib29sZWFuIH0gPSB7fTtcclxuICAgICAgaWYgKHRoaXMuc2hvd0NvbXBhc3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9wdGlvbnMuc2hvd0NvbXBhc3MgPSB0aGlzLnNob3dDb21wYXNzO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnNob3dab29tICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvcHRpb25zLnNob3dab29tID0gdGhpcy5zaG93Wm9vbTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBOYXZpZ2F0aW9uQ29udHJvbChvcHRpb25zKTtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZENvbnRyb2woXHJcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wsXHJcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LnBvc2l0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19