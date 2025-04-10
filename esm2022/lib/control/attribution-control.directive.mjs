import { Directive, Host, Input } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
export class AttributionControlDirective {
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
            if (this.compact !== undefined) {
                options.compact = this.compact;
            }
            if (this.customAttribution !== undefined) {
                options.customAttribution = this.customAttribution;
            }
            this.controlComponent.control = new AttributionControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: AttributionControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: AttributionControlDirective, selector: "[mglAttribution]", inputs: { compact: "compact", customAttribution: "customAttribution" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: AttributionControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglAttribution]',
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }], propDecorators: { compact: [{
                type: Input
            }], customAttribution: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUt2RCxNQUFNLE9BQU8sMkJBQTJCO0lBS3RDLFlBQ1UsVUFBc0IsRUFDZCxnQkFBc0Q7UUFEOUQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNkLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0M7SUFDckUsQ0FBQztJQUVKLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUdULEVBQUUsQ0FBQztZQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDekMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUMvQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQS9CVSwyQkFBMkI7a0dBQTNCLDJCQUEyQjs7MkZBQTNCLDJCQUEyQjtrQkFIdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2lCQUM3Qjs7MEJBUUksSUFBSTt5Q0FMRSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWdsQXR0cmlidXRpb25dJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG4gIC8qIEluaXQgaW5wdXRzICovXHJcbiAgQElucHV0KCkgY29tcGFjdD86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgY3VzdG9tQXR0cmlidXRpb24/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBASG9zdCgpIHByaXZhdGUgY29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudDxBdHRyaWJ1dGlvbkNvbnRyb2w+XHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9wdGlvbnM6IHtcclxuICAgICAgICBjb21wYWN0PzogYm9vbGVhbjtcclxuICAgICAgICBjdXN0b21BdHRyaWJ1dGlvbj86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gICAgICB9ID0ge307XHJcbiAgICAgIGlmICh0aGlzLmNvbXBhY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9wdGlvbnMuY29tcGFjdCA9IHRoaXMuY29tcGFjdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jdXN0b21BdHRyaWJ1dGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb3B0aW9ucy5jdXN0b21BdHRyaWJ1dGlvbiA9IHRoaXMuY3VzdG9tQXR0cmlidXRpb247XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgQXR0cmlidXRpb25Db250cm9sKG9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbChcclxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCxcclxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQucG9zaXRpb25cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=