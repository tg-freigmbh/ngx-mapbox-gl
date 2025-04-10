import { ChangeDetectionStrategy, Component, Inject, Input, forwardRef, } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
import * as i0 from "@angular/core";
import * as i1 from "./geojson-source.component";
export class FeatureComponent {
    constructor(GeoJSONSourceComponent) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent;
        this.type = 'Feature';
    }
    ngOnInit() {
        if (!this.id) {
            this.id = this.GeoJSONSourceComponent._getNewFeatureId();
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry,
            properties: this.properties ? this.properties : {},
        };
        this.feature.id = this.id;
        this.GeoJSONSourceComponent._addFeature(this.feature);
    }
    ngOnDestroy() {
        this.GeoJSONSourceComponent._removeFeature(this.feature);
    }
    updateCoordinates(coordinates) {
        this.feature.geometry.coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: FeatureComponent, deps: [{ token: forwardRef(() => GeoJSONSourceComponent) }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: FeatureComponent, selector: "mgl-feature", inputs: { id: "id", geometry: "geometry", properties: "properties" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: FeatureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.GeoJSONSourceComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => GeoJSONSourceComponent)]
                }] }], propDecorators: { id: [{
                type: Input
            }], geometry: [{
                type: Input
            }], properties: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUdMLFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBT3BFLE1BQU0sT0FBTyxnQkFBZ0I7SUFXM0IsWUFFVSxzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQU54RCxTQUFJLEdBQUcsU0FBa0IsQ0FBQztJQU92QixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzNELENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ25ELENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQXFCO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBMEIsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25FLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs4R0FwQ1UsZ0JBQWdCLGtCQVlqQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7a0dBWnZDLGdCQUFnQix5SEFIakIsRUFBRTs7MkZBR0QsZ0JBQWdCO2tCQUw1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQWFJLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO3lDQVJ6QyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgZm9yd2FyZFJlZixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWdsLWZlYXR1cmUnLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD5cclxue1xyXG4gIC8qIEluaXQgaW5wdXRzICovXHJcbiAgQElucHV0KCkgaWQ/OiBudW1iZXI7IC8vIEZJWE1FIG51bWJlciBvbmx5IGZvciBub3cgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzI3MTZcclxuICBASW5wdXQoKSBnZW9tZXRyeTogR2VvSlNPTi5HZW9tZXRyeU9iamVjdDtcclxuICBASW5wdXQoKSBwcm9wZXJ0aWVzOiBhbnk7XHJcbiAgdHlwZSA9ICdGZWF0dXJlJyBhcyBjb25zdDtcclxuXHJcbiAgcHJpdmF0ZSBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEdlb0pTT05Tb3VyY2VDb21wb25lbnQpKVxyXG4gICAgcHJpdmF0ZSBHZW9KU09OU291cmNlQ29tcG9uZW50OiBHZW9KU09OU291cmNlQ29tcG9uZW50XHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5pZCkge1xyXG4gICAgICB0aGlzLmlkID0gdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50Ll9nZXROZXdGZWF0dXJlSWQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmVhdHVyZSA9IHtcclxuICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSxcclxuICAgICAgcHJvcGVydGllczogdGhpcy5wcm9wZXJ0aWVzID8gdGhpcy5wcm9wZXJ0aWVzIDoge30sXHJcbiAgICB9O1xyXG4gICAgdGhpcy5mZWF0dXJlLmlkID0gdGhpcy5pZDtcclxuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5fYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuX3JlbW92ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xyXG4gICAgKHRoaXMuZmVhdHVyZS5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50KS5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xyXG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQobnVsbCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==