import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class ImageSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
    }
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if (this.sourceId === undefined) {
            return;
        }
        const source = this.mapService.getSource(this.sourceId);
        if (source === undefined) {
            return;
        }
        const url = ((changes['url'] === undefined ? undefined : this.url) ?? source.url);
        if (url !== null) {
            source.updateImage({
                url,
                coordinates: changes['coordinates'] === undefined ? undefined : this.coordinates,
            });
        }
    }
    ngOnDestroy() {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
        if (this.sourceId !== undefined) {
            this.mapService.removeSource(this.sourceId);
            this.sourceId = undefined;
        }
    }
    init() {
        const imageSource = {
            type: 'image',
            url: this.url,
            coordinates: this.coordinates,
        };
        this.mapService.addSource(this.id, imageSource);
        this.sourceId = this.id;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ImageSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: ImageSourceComponent, selector: "mgl-image-source", inputs: { id: "id", url: "url", coordinates: "coordinates" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ImageSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], coordinates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQVFoRCxNQUFNLE9BQU8sb0JBQW9CO0lBWS9CLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLFFBQVE7UUFDTixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN6QixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFXLENBQUM7UUFFNUYsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDakIsR0FBRztnQkFDSCxXQUFXLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVzthQUNqRixDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVPLElBQUk7UUFDVixNQUFNLFdBQVcsR0FBNkI7WUFDNUMsSUFBSSxFQUFFLE9BQU87WUFDYixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzFCLENBQUM7OEdBM0RVLG9CQUFvQjtrR0FBcEIsb0JBQW9CLDJJQUhyQixFQUFFOzsyRkFHRCxvQkFBb0I7a0JBTGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOytFQUlVLEVBQUU7c0JBQVYsS0FBSztnQkFHRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEltYWdlU291cmNlLCBJbWFnZVNvdXJjZVNwZWNpZmljYXRpb24gfSBmcm9tICdtYXBib3gtZ2wnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEltYWdlU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2Utc291cmNlJyxcclxuICB0ZW1wbGF0ZTogJycsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbWFnZVNvdXJjZUNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgSW1hZ2VTb3VyY2VPcHRpb25zIHtcclxuICAvKiBJbml0IGlucHV0cyAqL1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcblxyXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXHJcbiAgQElucHV0KCkgdXJsOiBJbWFnZVNvdXJjZU9wdGlvbnNbJ3VybCddO1xyXG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBJbWFnZVNvdXJjZU9wdGlvbnNbJ2Nvb3JkaW5hdGVzJ107XHJcblxyXG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzb3VyY2VJZD86IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YiA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmluaXQoKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAodGhpcy5zb3VyY2VJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPEltYWdlU291cmNlPih0aGlzLnNvdXJjZUlkKTtcclxuXHJcbiAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVybCA9ICgoY2hhbmdlc1sndXJsJ10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHRoaXMudXJsKSA/PyBzb3VyY2UudXJsKSBhcyBzdHJpbmc7XHJcblxyXG4gICAgaWYgKHVybCAhPT0gbnVsbCkge1xyXG4gICAgICBzb3VyY2UudXBkYXRlSW1hZ2Uoe1xyXG4gICAgICAgIHVybCxcclxuICAgICAgICBjb29yZGluYXRlczogY2hhbmdlc1snY29vcmRpbmF0ZXMnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogdGhpcy5jb29yZGluYXRlcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnN1YiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc291cmNlSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuc291cmNlSWQpO1xyXG4gICAgICB0aGlzLnNvdXJjZUlkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgY29uc3QgaW1hZ2VTb3VyY2U6IEltYWdlU291cmNlU3BlY2lmaWNhdGlvbiA9IHtcclxuICAgICAgdHlwZTogJ2ltYWdlJyxcclxuICAgICAgdXJsOiB0aGlzLnVybCxcclxuICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuY29vcmRpbmF0ZXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgaW1hZ2VTb3VyY2UpO1xyXG4gICAgdGhpcy5zb3VyY2VJZCA9IHRoaXMuaWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==