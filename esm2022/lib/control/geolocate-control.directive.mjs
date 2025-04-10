import { Directive, EventEmitter, Host, Input, Output, } from '@angular/core';
import { GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
export class GeolocateControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
        this.geolocate = new EventEmitter();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {
                positionOptions: this.positionOptions,
                fitBoundsOptions: this.fitBoundsOptions,
                trackUserLocation: this.trackUserLocation,
                showUserLocation: this.showUserLocation,
                showUserHeading: this.showUserHeading,
            };
            Object.keys(options).forEach((key) => {
                const tkey = key;
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.controlComponent.control = new GeolocateControl(options);
            this.controlComponent.control.on('geolocate', (data) => {
                this.geolocate.emit(data);
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: GeolocateControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: GeolocateControlDirective, selector: "[mglGeolocate]", inputs: { positionOptions: "positionOptions", fitBoundsOptions: "fitBoundsOptions", trackUserLocation: "trackUserLocation", showUserLocation: "showUserLocation", showUserHeading: "showUserHeading" }, outputs: { geolocate: "geolocate" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: GeolocateControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglGeolocate]',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }], propDecorators: { positionOptions: [{
                type: Input
            }], fitBoundsOptions: [{
                type: Input
            }], trackUserLocation: [{
                type: Input
            }], showUserLocation: [{
                type: Input
            }], showUserHeading: [{
                type: Input
            }], geolocate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osSUFBSSxFQUNKLEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFvQixnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLdkQsTUFBTSxPQUFPLHlCQUF5QjtJQVdwQyxZQUNVLFVBQXNCLEVBQ2QsZ0JBQW9EO1FBRDVELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9DO1FBSnRFLGNBQVMsR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQztJQUs5RCxDQUFDO0lBRUosa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztZQUNyRSxDQUFDO1lBQ0QsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUN6QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUN2QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7YUFDdEMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sSUFBSSxHQUFHLEdBQTJCLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO29CQUNoQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFnQixDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0E1Q1UseUJBQXlCO2tHQUF6Qix5QkFBeUI7OzJGQUF6Qix5QkFBeUI7a0JBSHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7OzBCQWNJLElBQUk7eUNBWEUsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3QsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGaXRCb3VuZHNPcHRpb25zLCBHZW9sb2NhdGVDb250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XHJcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21nbEdlb2xvY2F0ZV0nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG4gIC8qIEluaXQgaW5wdXRzICovXHJcbiAgQElucHV0KCkgcG9zaXRpb25PcHRpb25zPzogUG9zaXRpb25PcHRpb25zO1xyXG4gIEBJbnB1dCgpIGZpdEJvdW5kc09wdGlvbnM/OiBGaXRCb3VuZHNPcHRpb25zO1xyXG4gIEBJbnB1dCgpIHRyYWNrVXNlckxvY2F0aW9uPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzaG93VXNlckxvY2F0aW9uPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzaG93VXNlckhlYWRpbmc/OiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBnZW9sb2NhdGU6IEV2ZW50RW1pdHRlcjxQb3NpdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvc2l0aW9uPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIEBIb3N0KCkgcHJpdmF0ZSBjb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50PEdlb2xvY2F0ZUNvbnRyb2w+XHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgcG9zaXRpb25PcHRpb25zOiB0aGlzLnBvc2l0aW9uT3B0aW9ucyxcclxuICAgICAgICBmaXRCb3VuZHNPcHRpb25zOiB0aGlzLmZpdEJvdW5kc09wdGlvbnMsXHJcbiAgICAgICAgdHJhY2tVc2VyTG9jYXRpb246IHRoaXMudHJhY2tVc2VyTG9jYXRpb24sXHJcbiAgICAgICAgc2hvd1VzZXJMb2NhdGlvbjogdGhpcy5zaG93VXNlckxvY2F0aW9uLFxyXG4gICAgICAgIHNob3dVc2VySGVhZGluZzogdGhpcy5zaG93VXNlckhlYWRpbmcsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRrZXkgPSBrZXkgYXMga2V5b2YgdHlwZW9mIG9wdGlvbnM7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgR2VvbG9jYXRlQ29udHJvbChvcHRpb25zKTtcclxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wub24oJ2dlb2xvY2F0ZScsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nZW9sb2NhdGUuZW1pdChkYXRhIGFzIFBvc2l0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5hZGRDb250cm9sKFxyXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sLFxyXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvblxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==