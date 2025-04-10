import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class RasterSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.type = 'raster';
        this.sourceAdded = false;
        this.sub = new Subscription();
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
        if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange()) ||
            (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['tileSize'] && !changes['tileSize'].isFirstChange()) ||
            (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
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
        const source = {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            tileSize: this.tileSize,
            scheme: this.scheme,
            attribution: this.attribution,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: RasterSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: RasterSourceComponent, selector: "mgl-raster-source", inputs: { id: "id", url: "url", tiles: "tiles", bounds: "bounds", minzoom: "minzoom", maxzoom: "maxzoom", tileSize: "tileSize", scheme: "scheme", attribution: "attribution" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: RasterSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-raster-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }], propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], tiles: [{
                type: Input
            }], bounds: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], tileSize: [{
                type: Input
            }], scheme: [{
                type: Input
            }], attribution: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFzdGVyLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvcmFzdGVyLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxHQUtOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQVFoRCxNQUFNLE9BQU8scUJBQXFCO0lBb0JoQyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTGpDLFNBQUksR0FBeUIsUUFBUSxDQUFDO1FBRXZDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFFBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWEsQ0FBQztJQUUvQyxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2lCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNuRSxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJLEVB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VixLQUFLO2dCQUdHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IFJhc3RlclNvdXJjZSB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZ2wtcmFzdGVyLXNvdXJjZScsXHJcbiAgdGVtcGxhdGU6ICcnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFzdGVyU291cmNlQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBSYXN0ZXJTb3VyY2Uge1xyXG4gIC8qIEluaXQgaW5wdXRzICovXHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuXHJcbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cclxuICBASW5wdXQoKSB1cmw/OiBSYXN0ZXJTb3VyY2VbJ3VybCddO1xyXG4gIEBJbnB1dCgpIHRpbGVzPzogUmFzdGVyU291cmNlWyd0aWxlcyddO1xyXG4gIEBJbnB1dCgpIGJvdW5kcz86IFJhc3RlclNvdXJjZVsnYm91bmRzJ107XHJcbiAgQElucHV0KCkgbWluem9vbT86IFJhc3RlclNvdXJjZVsnbWluem9vbSddO1xyXG4gIEBJbnB1dCgpIG1heHpvb20/OiBSYXN0ZXJTb3VyY2VbJ21heHpvb20nXTtcclxuICBASW5wdXQoKSB0aWxlU2l6ZT86IFJhc3RlclNvdXJjZVsndGlsZVNpemUnXTtcclxuICBASW5wdXQoKSBzY2hlbWU/OiBSYXN0ZXJTb3VyY2VbJ3NjaGVtZSddO1xyXG4gIEBJbnB1dCgpIGF0dHJpYnV0aW9uPzogUmFzdGVyU291cmNlWydhdHRyaWJ1dGlvbiddO1xyXG5cclxuICByZWFkb25seSB0eXBlOiBSYXN0ZXJTb3VyY2VbJ3R5cGUnXSA9ICdyYXN0ZXInO1xyXG5cclxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3Qgc3ViMSA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICBjb25zdCBzdWIgPSBmcm9tRXZlbnQodGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJylcclxuICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1Yi5hZGQoc3ViMSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICAoY2hhbmdlc1sndXJsJ10gJiYgIWNoYW5nZXNbJ3VybCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ3RpbGVzJ10gJiYgIWNoYW5nZXNbJ3RpbGVzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlc1snYm91bmRzJ10gJiYgIWNoYW5nZXNbJ2JvdW5kcyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ21pbnpvb20nXSAmJiAhY2hhbmdlc1snbWluem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ21heHpvb20nXSAmJiAhY2hhbmdlc1snbWF4em9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ3RpbGVTaXplJ10gJiYgIWNoYW5nZXNbJ3RpbGVTaXplJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlc1snc2NoZW1lJ10gJiYgIWNoYW5nZXNbJ3NjaGVtZSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ2F0dHJpYnV0aW9uJ10gJiYgIWNoYW5nZXNbJ2F0dHJpYnV0aW9uJ10uaXNGaXJzdENoYW5nZSgpKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcclxuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgY29uc3Qgc291cmNlOiBSYXN0ZXJTb3VyY2UgPSB7XHJcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgdXJsOiB0aGlzLnVybCxcclxuICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXHJcbiAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMsXHJcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcclxuICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxyXG4gICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZSxcclxuICAgICAgc2NoZW1lOiB0aGlzLnNjaGVtZSxcclxuICAgICAgYXR0cmlidXRpb246IHRoaXMuYXR0cmlidXRpb24sXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xyXG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==