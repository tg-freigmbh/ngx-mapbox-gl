import { ChangeDetectionStrategy, Component, Input, NgZone, } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../../map/map.service";
export class GeoJSONSourceComponent {
    constructor(mapService, zone) {
        this.mapService = mapService;
        this.zone = zone;
        this.updateFeatureData = new Subject();
        this.sub = new Subscription();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    ngOnInit() {
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: [],
            };
        }
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
        if ((changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['buffer'] && !changes['buffer'].isFirstChange()) ||
            (changes['tolerance'] && !changes['tolerance'].isFirstChange()) ||
            (changes['cluster'] && !changes['cluster'].isFirstChange()) ||
            (changes['clusterRadius'] && !changes['clusterRadius'].isFirstChange()) ||
            (changes['clusterMaxZoom'] &&
                !changes['clusterMaxZoom'].isFirstChange()) ||
            (changes['clusterMinPoints'] &&
                !changes['clusterMinPoints'].isFirstChange()) ||
            (changes['clusterProperties'] &&
                !changes['clusterProperties'].isFirstChange()) ||
            (changes['lineMetrics'] && !changes['lineMetrics'].isFirstChange()) ||
            (changes['generateId'] && !changes['generateId'].isFirstChange()) ||
            (changes['promoteId'] && !changes['promoteId'].isFirstChange()) ||
            (changes['filter'] && !changes['filter'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        if (changes['data'] && !changes['data'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setData(this.data);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterExpansionZoom(clusterId) {
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterExpansionZoom(clusterId, (error, zoom) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(zoom);
                }
            });
        }));
    }
    /**
     * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterChildren(clusterId) {
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterChildren(clusterId, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features);
                }
            });
        }));
    }
    /**
     * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     * @param limit The maximum number of features to return.
     * @param offset The number of features to skip (e.g. for pagination).
     */
    async getClusterLeaves(clusterId, limit, offset) {
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterLeaves(clusterId, limit, offset, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features);
                }
            });
        }));
    }
    _addFeature(feature) {
        const collection = this
            .data;
        collection.features.push(feature);
        this.updateFeatureData.next(null);
    }
    _removeFeature(feature) {
        const collection = this
            .data;
        const index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next(null);
    }
    _getNewFeatureId() {
        return ++this.featureIdCounter;
    }
    init() {
        const source = {
            type: 'geojson',
            data: this.data,
            maxzoom: this.maxzoom,
            attribution: this.attribution,
            buffer: this.buffer,
            tolerance: this.tolerance,
            cluster: this.cluster,
            clusterRadius: this.clusterRadius,
            clusterMaxZoom: this.clusterMaxZoom,
            clusterMinPoints: this.clusterMinPoints,
            clusterProperties: this.clusterProperties,
            lineMetrics: this.lineMetrics,
            generateId: this.generateId,
            promoteId: this.promoteId,
            filter: this.filter,
        };
        this.mapService.addSource(this.id, source);
        const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setData(this.data);
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: GeoJSONSourceComponent, deps: [{ token: i1.MapService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: GeoJSONSourceComponent, selector: "mgl-geojson-source", inputs: { id: "id", data: "data", maxzoom: "maxzoom", attribution: "attribution", buffer: "buffer", tolerance: "tolerance", cluster: "cluster", clusterRadius: "clusterRadius", clusterMaxZoom: "clusterMaxZoom", clusterMinPoints: "clusterMinPoints", clusterProperties: "clusterProperties", lineMetrics: "lineMetrics", generateId: "generateId", promoteId: "promoteId", filter: "filter" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: GeoJSONSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i0.NgZone }], propDecorators: { id: [{
                type: Input
            }], data: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], attribution: [{
                type: Input
            }], buffer: [{
                type: Input
            }], tolerance: [{
                type: Input
            }], cluster: [{
                type: Input
            }], clusterRadius: [{
                type: Input
            }], clusterMaxZoom: [{
                type: Input
            }], clusterMinPoints: [{
                type: Input
            }], clusterProperties: [{
                type: Input
            }], lineMetrics: [{
                type: Input
            }], generateId: [{
                type: Input
            }], promoteId: [{
                type: Input
            }], filter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvc291cmNlL2dlb2pzb24vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEdBS1AsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFRbkQsTUFBTSxPQUFPLHNCQUFzQjtJQTJCakMsWUFBb0IsVUFBc0IsRUFBVSxJQUFZO1FBQTVDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBTmhFLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFMUIsUUFBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBRXVDLENBQUM7SUFFckUsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHO2dCQUNWLElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLFFBQVEsRUFBRSxFQUFFO2FBQ2IsQ0FBQztRQUNKLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3JELElBQUksQ0FBQyxJQUFJ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c0JBQWQsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBHZW9KU09OU291cmNlLFxyXG4gIEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uXHJcbn0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9KU09OU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL21hcC9tYXAudHlwZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZ2wtZ2VvanNvbi1zb3VyY2UnLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdlb0pTT05Tb3VyY2VDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zIHtcclxuICAvKiBJbml0IGlucHV0cyAqL1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcblxyXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXHJcbiAgQElucHV0KCkgZGF0YT86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydkYXRhJ107XHJcbiAgQElucHV0KCkgbWF4em9vbT86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydtYXh6b29tJ107XHJcbiAgQElucHV0KCkgYXR0cmlidXRpb24/OiBHZW9KU09OU291cmNlT3B0aW9uc1snYXR0cmlidXRpb24nXTtcclxuICBASW5wdXQoKSBidWZmZXI/OiBHZW9KU09OU291cmNlT3B0aW9uc1snYnVmZmVyJ107XHJcbiAgQElucHV0KCkgdG9sZXJhbmNlPzogR2VvSlNPTlNvdXJjZU9wdGlvbnNbJ3RvbGVyYW5jZSddO1xyXG4gIEBJbnB1dCgpIGNsdXN0ZXI/OiBHZW9KU09OU291cmNlT3B0aW9uc1snY2x1c3RlciddO1xyXG4gIEBJbnB1dCgpIGNsdXN0ZXJSYWRpdXM/OiBHZW9KU09OU291cmNlT3B0aW9uc1snY2x1c3RlclJhZGl1cyddO1xyXG4gIEBJbnB1dCgpIGNsdXN0ZXJNYXhab29tPzogR2VvSlNPTlNvdXJjZU9wdGlvbnNbJ2NsdXN0ZXJNYXhab29tJ107XHJcbiAgQElucHV0KCkgY2x1c3Rlck1pblBvaW50cz86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydjbHVzdGVyTWluUG9pbnRzJ107XHJcbiAgQElucHV0KCkgY2x1c3RlclByb3BlcnRpZXM/OiBHZW9KU09OU291cmNlT3B0aW9uc1snY2x1c3RlclByb3BlcnRpZXMnXTtcclxuICBASW5wdXQoKSBsaW5lTWV0cmljcz86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydsaW5lTWV0cmljcyddO1xyXG4gIEBJbnB1dCgpIGdlbmVyYXRlSWQ/OiBHZW9KU09OU291cmNlT3B0aW9uc1snZ2VuZXJhdGVJZCddO1xyXG4gIEBJbnB1dCgpIHByb21vdGVJZD86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydwcm9tb3RlSWQnXTtcclxuICBASW5wdXQoKSBmaWx0ZXI/OiBHZW9KU09OU291cmNlT3B0aW9uc1snZmlsdGVyJ107XHJcblxyXG4gIHVwZGF0ZUZlYXR1cmVEYXRhID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgZmVhdHVyZUlkQ291bnRlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5kYXRhKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxyXG4gICAgICAgIGZlYXR1cmVzOiBbXSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN1YjEgPSB0aGlzLm1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXHJcbiAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+ICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0U291cmNlKHRoaXMuaWQpKSlcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWIuYWRkKHN1YjEpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgKGNoYW5nZXNbJ21heHpvb20nXSAmJiAhY2hhbmdlc1snbWF4em9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ2F0dHJpYnV0aW9uJ10gJiYgIWNoYW5nZXNbJ2F0dHJpYnV0aW9uJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlc1snYnVmZmVyJ10gJiYgIWNoYW5nZXNbJ2J1ZmZlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXNbJ3RvbGVyYW5jZSddICYmICFjaGFuZ2VzWyd0b2xlcmFuY2UnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydjbHVzdGVyJ10gJiYgIWNoYW5nZXNbJ2NsdXN0ZXInXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydjbHVzdGVyUmFkaXVzJ10gJiYgIWNoYW5nZXNbJ2NsdXN0ZXJSYWRpdXMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydjbHVzdGVyTWF4Wm9vbSddICYmXHJcbiAgICAgICAgIWNoYW5nZXNbJ2NsdXN0ZXJNYXhab29tJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlc1snY2x1c3Rlck1pblBvaW50cyddICYmXHJcbiAgICAgICAgIWNoYW5nZXNbJ2NsdXN0ZXJNaW5Qb2ludHMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydjbHVzdGVyUHJvcGVydGllcyddICYmXHJcbiAgICAgICAgIWNoYW5nZXNbJ2NsdXN0ZXJQcm9wZXJ0aWVzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlc1snbGluZU1ldHJpY3MnXSAmJiAhY2hhbmdlc1snbGluZU1ldHJpY3MnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydnZW5lcmF0ZUlkJ10gJiYgIWNoYW5nZXNbJ2dlbmVyYXRlSWQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XHJcbiAgICAgIChjaGFuZ2VzWydwcm9tb3RlSWQnXSAmJiAhY2hhbmdlc1sncHJvbW90ZUlkJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlc1snZmlsdGVyJ10gJiYgIWNoYW5nZXNbJ2ZpbHRlciddLmlzRmlyc3RDaGFuZ2UoKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydkYXRhJ10gJiYgIWNoYW5nZXNbJ2RhdGEnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcclxuICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZS5zZXREYXRhKHRoaXMuZGF0YSEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcclxuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9yIGNsdXN0ZXJlZCBzb3VyY2VzLCBmZXRjaGVzIHRoZSB6b29tIGF0IHdoaWNoIHRoZSBnaXZlbiBjbHVzdGVyIGV4cGFuZHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY2x1c3RlcklkIFRoZSB2YWx1ZSBvZiB0aGUgY2x1c3RlcidzIGNsdXN0ZXJfaWQgcHJvcGVydHkuXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb20oY2x1c3RlcklkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bihcclxuICAgICAgYXN5bmMgKCkgPT5cclxuICAgICAgICBuZXcgUHJvbWlzZTxudW1iZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgIHNvdXJjZS5nZXRDbHVzdGVyRXhwYW5zaW9uWm9vbShjbHVzdGVySWQsIChlcnJvciwgem9vbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoem9vbSEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvciBjbHVzdGVyZWQgc291cmNlcywgZmV0Y2hlcyB0aGUgY2hpbGRyZW4gb2YgdGhlIGdpdmVuIGNsdXN0ZXIgb24gdGhlIG5leHQgem9vbSBsZXZlbCAoYXMgYW4gYXJyYXkgb2YgR2VvSlNPTiBmZWF0dXJlcykuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY2x1c3RlcklkIFRoZSB2YWx1ZSBvZiB0aGUgY2x1c3RlcidzIGNsdXN0ZXJfaWQgcHJvcGVydHkuXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0Q2x1c3RlckNoaWxkcmVuKGNsdXN0ZXJJZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPEdlb0pTT05Tb3VyY2U+KHRoaXMuaWQpO1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW4oXHJcbiAgICAgIGFzeW5jICgpID0+XHJcbiAgICAgICAgbmV3IFByb21pc2U8R2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnk+W10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgIHNvdXJjZS5nZXRDbHVzdGVyQ2hpbGRyZW4oY2x1c3RlcklkLCAoZXJyb3IsIGZlYXR1cmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvciBjbHVzdGVyZWQgc291cmNlcywgZmV0Y2hlcyB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoYXQgYmVsb25nIHRvIHRoZSBjbHVzdGVyIChhcyBhbiBhcnJheSBvZiBHZW9KU09OIGZlYXR1cmVzKS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjbHVzdGVySWQgVGhlIHZhbHVlIG9mIHRoZSBjbHVzdGVyJ3MgY2x1c3Rlcl9pZCBwcm9wZXJ0eS5cclxuICAgKiBAcGFyYW0gbGltaXQgVGhlIG1heGltdW0gbnVtYmVyIG9mIGZlYXR1cmVzIHRvIHJldHVybi5cclxuICAgKiBAcGFyYW0gb2Zmc2V0IFRoZSBudW1iZXIgb2YgZmVhdHVyZXMgdG8gc2tpcCAoZS5nLiBmb3IgcGFnaW5hdGlvbikuXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0Q2x1c3RlckxlYXZlcyhjbHVzdGVySWQ6IG51bWJlciwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bihcclxuICAgICAgYXN5bmMgKCkgPT5cclxuICAgICAgICBuZXcgUHJvbWlzZTxHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeT5bXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgc291cmNlLmdldENsdXN0ZXJMZWF2ZXMoXHJcbiAgICAgICAgICAgIGNsdXN0ZXJJZCxcclxuICAgICAgICAgICAgbGltaXQsXHJcbiAgICAgICAgICAgIG9mZnNldCxcclxuICAgICAgICAgICAgKGVycm9yLCBmZWF0dXJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIF9hZGRGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXNcclxuICAgICAgLmRhdGEgYXMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcclxuICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcclxuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dChudWxsKTtcclxuICB9XHJcblxyXG4gIF9yZW1vdmVGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXNcclxuICAgICAgLmRhdGEgYXMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcclxuICAgIGNvbnN0IGluZGV4ID0gY29sbGVjdGlvbi5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUpO1xyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgY29sbGVjdGlvbi5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KG51bGwpO1xyXG4gIH1cclxuXHJcbiAgX2dldE5ld0ZlYXR1cmVJZCgpIHtcclxuICAgIHJldHVybiArK3RoaXMuZmVhdHVyZUlkQ291bnRlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpIHtcclxuICAgIGNvbnN0IHNvdXJjZTogR2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb24gPSB7XHJcbiAgICAgIHR5cGU6ICdnZW9qc29uJyxcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXHJcbiAgICAgIGF0dHJpYnV0aW9uOiB0aGlzLmF0dHJpYnV0aW9uLFxyXG4gICAgICBidWZmZXI6IHRoaXMuYnVmZmVyLFxyXG4gICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxyXG4gICAgICBjbHVzdGVyOiB0aGlzLmNsdXN0ZXIsXHJcbiAgICAgIGNsdXN0ZXJSYWRpdXM6IHRoaXMuY2x1c3RlclJhZGl1cyxcclxuICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXHJcbiAgICAgIGNsdXN0ZXJNaW5Qb2ludHM6IHRoaXMuY2x1c3Rlck1pblBvaW50cyxcclxuICAgICAgY2x1c3RlclByb3BlcnRpZXM6IHRoaXMuY2x1c3RlclByb3BlcnRpZXMsXHJcbiAgICAgIGxpbmVNZXRyaWNzOiB0aGlzLmxpbmVNZXRyaWNzLFxyXG4gICAgICBnZW5lcmF0ZUlkOiB0aGlzLmdlbmVyYXRlSWQsXHJcbiAgICAgIHByb21vdGVJZDogdGhpcy5wcm9tb3RlSWQsXHJcbiAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xyXG4gICAgY29uc3Qgc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKGRlYm91bmNlVGltZSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcclxuICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZS5zZXREYXRhKHRoaXMuZGF0YSEpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcclxuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=