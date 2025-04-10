import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, NgZone, TemplateRef, } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "@angular/common";
import * as i3 from "../layer/layer.component";
import * as i4 from "../marker/marker.component";
export class PointDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: PointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: PointDirective, selector: "ng-template[mglPoint]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: PointDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[mglPoint]' }]
        }] });
export class ClusterPointDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ClusterPointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.2", type: ClusterPointDirective, selector: "ng-template[mglClusterPoint]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ClusterPointDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[mglClusterPoint]' }]
        }] });
let uniqId = 0;
export class MarkersForClustersComponent {
    constructor(mapService, ChangeDetectorRef, zone) {
        this.mapService = mapService;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.zone = zone;
        this.layerId = `mgl-markers-for-clusters-${uniqId++}`;
        this.sub = new Subscription();
    }
    ngAfterContentInit() {
        const clusterDataUpdate = () => fromEvent(this.mapService.mapInstance, 'data').pipe(filter((e) => e.sourceId === this.source &&
            e.sourceDataType !== 'metadata' &&
            this.mapService.mapInstance.isSourceLoaded(this.source)));
        const sub = this.mapService.mapCreated$
            .pipe(switchMap(clusterDataUpdate), switchMap(() => merge(fromEvent(this.mapService.mapInstance, 'move'), fromEvent(this.mapService.mapInstance, 'moveend')).pipe(startWith(undefined))))
            .subscribe(() => {
            this.zone.run(() => {
                this.updateCluster();
            });
        });
        this.sub.add(sub);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    trackByClusterPoint(_index, clusterPoint) {
        return clusterPoint.id;
    }
    updateCluster() {
        // Invalid queryRenderedFeatures typing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = { layers: [this.layerId] };
        if (!this.pointTpl) {
            params.filter = ['==', 'cluster', true];
        }
        this.clusterPoints =
            this.mapService.mapInstance.queryRenderedFeatures(params);
        this.ChangeDetectorRef.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MarkersForClustersComponent, deps: [{ token: i1.MapService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: MarkersForClustersComponent, selector: "mgl-markers-for-clusters", inputs: { source: "source" }, queries: [{ propertyName: "pointTpl", first: true, predicate: PointDirective, descendants: true, read: TemplateRef }, { propertyName: "clusterPointTpl", first: true, predicate: ClusterPointDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="pointTpl!; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.LayerComponent, selector: "mgl-layer", inputs: ["id", "source", "type", "metadata", "sourceLayer", "filter", "layout", "paint", "before", "minzoom", "maxzoom"], outputs: ["layerClick", "layerDblClick", "layerMouseDown", "layerMouseUp", "layerMouseEnter", "layerMouseLeave", "layerMouseMove", "layerMouseOver", "layerMouseOut", "layerContextMenu", "layerTouchStart", "layerTouchEnd", "layerTouchCancel"] }, { kind: "component", type: i4.MarkerComponent, selector: "mgl-marker", inputs: ["offset", "anchor", "clickTolerance", "feature", "lngLat", "draggable", "popupShown", "className", "pitchAlignment", "rotationAlignment"], outputs: ["markerDragStart", "markerDragEnd", "markerDrag"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MarkersForClustersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-markers-for-clusters',
                    template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="pointTpl!; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                }]
        }], ctorParameters: () => [{ type: i1.MapService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], propDecorators: { source: [{
                type: Input
            }], pointTpl: [{
                type: ContentChild,
                args: [PointDirective, { read: TemplateRef, static: false }]
            }], clusterPointTpl: [{
                type: ContentChild,
                args: [ClusterPointDirective, { read: TemplateRef, static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvbWFya2Vycy1mb3ItY2x1c3RlcnMvbWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUdoRCxNQUFNLE9BQU8sY0FBYzs4R0FBZCxjQUFjO2tHQUFkLGNBQWM7OzJGQUFkLGNBQWM7a0JBRDFCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUU7O0FBSWhELE1BQU0sT0FBTyxxQkFBcUI7OEdBQXJCLHFCQUFxQjtrR0FBckIscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQURqQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDhCQUE4QixFQUFFOztBQUd2RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFpQ2YsTUFBTSxPQUFPLDJCQUEyQjtJQWdCdEMsWUFDVSxVQUFzQixFQUN0QixpQkFBb0MsRUFDcEMsSUFBWTtRQUZaLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBUHRCLFlBQU8s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LElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBib3hHZW9KU09ORmVhdHVyZSwgTWFwU291cmNlRGF0YUV2ZW50IH0gZnJvbSAnbWFwYm94LWdsJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWdsUG9pbnRdJyB9KVxyXG5leHBvcnQgY2xhc3MgUG9pbnREaXJlY3RpdmUge31cclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbENsdXN0ZXJQb2ludF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDbHVzdGVyUG9pbnREaXJlY3RpdmUge31cclxuXHJcbmxldCB1bmlxSWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZ2wtbWFya2Vycy1mb3ItY2x1c3RlcnMnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bWdsLWxheWVyXHJcbiAgICAgIFtpZF09XCJsYXllcklkXCJcclxuICAgICAgW3NvdXJjZV09XCJzb3VyY2VcIlxyXG4gICAgICB0eXBlPVwiY2lyY2xlXCJcclxuICAgICAgW3BhaW50XT1cInsgJ2NpcmNsZS1yYWRpdXMnOiAwIH1cIlxyXG4gICAgPjwvbWdsLWxheWVyPlxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAqbmdGb3I9XCJsZXQgZmVhdHVyZSBvZiBjbHVzdGVyUG9pbnRzOyB0cmFja0J5OiB0cmFja0J5Q2x1c3RlclBvaW50XCJcclxuICAgID5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZlYXR1cmUucHJvcGVydGllcyFbJ2NsdXN0ZXInXVwiPlxyXG4gICAgICAgIDxtZ2wtbWFya2VyIFtmZWF0dXJlXT1cIiRhbnkoZmVhdHVyZSlcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbHVzdGVyUG9pbnRUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIlxyXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbWdsLW1hcmtlcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZmVhdHVyZS5wcm9wZXJ0aWVzIVsnY2x1c3RlciddXCI+XHJcbiAgICAgICAgPG1nbC1tYXJrZXIgW2ZlYXR1cmVdPVwiJGFueShmZWF0dXJlKVwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cInBvaW50VHBsITsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZlYXR1cmUgfVwiXHJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9tZ2wtbWFya2VyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXJrZXJzRm9yQ2x1c3RlcnNDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdFxyXG57XHJcbiAgLyogSW5pdCBpbnB1dCAqL1xyXG4gIEBJbnB1dCgpIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICBAQ29udGVudENoaWxkKFBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgcG9pbnRUcGw/OiBUZW1wbGF0ZVJlZjx1bmtub3duPjtcclxuICBAQ29udGVudENoaWxkKENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiBmYWxzZSB9KVxyXG4gIGNsdXN0ZXJQb2ludFRwbDogVGVtcGxhdGVSZWY8dW5rbm93bj47XHJcblxyXG4gIGNsdXN0ZXJQb2ludHMhOiBNYXBib3hHZW9KU09ORmVhdHVyZVtdOyAvLyBJbmNvcnJlY3QgdHlwaW5nc1xyXG4gIGxheWVySWQgPSBgbWdsLW1hcmtlcnMtZm9yLWNsdXN0ZXJzLSR7dW5pcUlkKyt9YDtcclxuXHJcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBDaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgY29uc3QgY2x1c3RlckRhdGFVcGRhdGUgPSAoKSA9PlxyXG4gICAgICBmcm9tRXZlbnQ8TWFwU291cmNlRGF0YUV2ZW50Pih0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdkYXRhJykucGlwZShcclxuICAgICAgICBmaWx0ZXIoXHJcbiAgICAgICAgICAoZSkgPT5cclxuICAgICAgICAgICAgZS5zb3VyY2VJZCA9PT0gdGhpcy5zb3VyY2UgJiZcclxuICAgICAgICAgICAgZS5zb3VyY2VEYXRhVHlwZSAhPT0gJ21ldGFkYXRhJyAmJlxyXG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuaXNTb3VyY2VMb2FkZWQodGhpcy5zb3VyY2UpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgY29uc3Qgc3ViID0gdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcChjbHVzdGVyRGF0YVVwZGF0ZSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XHJcbiAgICAgICAgICBtZXJnZShcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdmUnKSxcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdmVlbmQnKVxyXG4gICAgICAgICAgKS5waXBlKHN0YXJ0V2l0aCh1bmRlZmluZWQpKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlQ2x1c3RlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuc3ViLmFkZChzdWIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUNsdXN0ZXJQb2ludChfaW5kZXg6IG51bWJlciwgY2x1c3RlclBvaW50OiBNYXBib3hHZW9KU09ORmVhdHVyZSkge1xyXG4gICAgcmV0dXJuIGNsdXN0ZXJQb2ludC5pZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlQ2x1c3RlcigpIHtcclxuICAgIC8vIEludmFsaWQgcXVlcnlSZW5kZXJlZEZlYXR1cmVzIHR5cGluZ1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGNvbnN0IHBhcmFtczogYW55ID0geyBsYXllcnM6IFt0aGlzLmxheWVySWRdIH07XHJcbiAgICBpZiAoIXRoaXMucG9pbnRUcGwpIHtcclxuICAgICAgcGFyYW1zLmZpbHRlciA9IFsnPT0nLCAnY2x1c3RlcicsIHRydWVdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbHVzdGVyUG9pbnRzID1cclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwYXJhbXMpO1xyXG4gICAgdGhpcy5DaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcbn1cclxuIl19