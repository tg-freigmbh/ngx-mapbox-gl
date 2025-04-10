import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributionControlDirective } from './control/attribution-control.directive';
import { ControlComponent } from './control/control.component';
import { FullscreenControlDirective } from './control/fullscreen-control.directive';
import { GeolocateControlDirective } from './control/geolocate-control.directive';
import { NavigationControlDirective } from './control/navigation-control.directive';
import { ScaleControlDirective } from './control/scale-control.directive';
import { DraggableDirective } from './draggable/draggable.directive';
import { ImageComponent } from './image/image.component';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { MarkerComponent } from './marker/marker.component';
import { ClusterPointDirective, MarkersForClustersComponent, PointDirective, } from './markers-for-clusters/markers-for-clusters.component';
import { PopupComponent } from './popup/popup.component';
import { CanvasSourceComponent } from './source/canvas-source.component';
import { FeatureComponent } from './source/geojson/feature.component';
import { GeoJSONSourceComponent } from './source/geojson/geojson-source.component';
import { ImageSourceComponent } from './source/image-source.component';
import { RasterDemSourceComponent } from './source/raster-dem-source.component';
import { RasterSourceComponent } from './source/raster-source.component';
import { VectorSourceComponent } from './source/vector-source.component';
import { VideoSourceComponent } from './source/video-source.component';
import * as i0 from "@angular/core";
export class NgxMapboxGLModule {
    static withConfig(config) {
        return {
            ngModule: NgxMapboxGLModule,
            providers: [
                {
                    provide: MAPBOX_API_KEY,
                    useValue: config.accessToken,
                },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: NgxMapboxGLModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.2", ngImport: i0, type: NgxMapboxGLModule, declarations: [MapComponent,
            LayerComponent,
            DraggableDirective,
            ImageComponent,
            VectorSourceComponent,
            GeoJSONSourceComponent,
            RasterDemSourceComponent,
            RasterSourceComponent,
            ImageSourceComponent,
            VideoSourceComponent,
            CanvasSourceComponent,
            FeatureComponent,
            MarkerComponent,
            PopupComponent,
            ControlComponent,
            FullscreenControlDirective,
            NavigationControlDirective,
            GeolocateControlDirective,
            AttributionControlDirective,
            ScaleControlDirective,
            PointDirective,
            ClusterPointDirective,
            MarkersForClustersComponent], imports: [CommonModule], exports: [MapComponent,
            LayerComponent,
            DraggableDirective,
            ImageComponent,
            VectorSourceComponent,
            GeoJSONSourceComponent,
            RasterDemSourceComponent,
            RasterSourceComponent,
            ImageSourceComponent,
            VideoSourceComponent,
            CanvasSourceComponent,
            FeatureComponent,
            MarkerComponent,
            PopupComponent,
            ControlComponent,
            FullscreenControlDirective,
            NavigationControlDirective,
            GeolocateControlDirective,
            AttributionControlDirective,
            ScaleControlDirective,
            PointDirective,
            ClusterPointDirective,
            MarkersForClustersComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: NgxMapboxGLModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: NgxMapboxGLModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MapComponent,
                        LayerComponent,
                        DraggableDirective,
                        ImageComponent,
                        VectorSourceComponent,
                        GeoJSONSourceComponent,
                        RasterDemSourceComponent,
                        RasterSourceComponent,
                        ImageSourceComponent,
                        VideoSourceComponent,
                        CanvasSourceComponent,
                        FeatureComponent,
                        MarkerComponent,
                        PopupComponent,
                        ControlComponent,
                        FullscreenControlDirective,
                        NavigationControlDirective,
                        GeolocateControlDirective,
                        AttributionControlDirective,
                        ScaleControlDirective,
                        PointDirective,
                        ClusterPointDirective,
                        MarkersForClustersComponent,
                    ],
                    exports: [
                        MapComponent,
                        LayerComponent,
                        DraggableDirective,
                        ImageComponent,
                        VectorSourceComponent,
                        GeoJSONSourceComponent,
                        RasterDemSourceComponent,
                        RasterSourceComponent,
                        ImageSourceComponent,
                        VideoSourceComponent,
                        CanvasSourceComponent,
                        FeatureComponent,
                        MarkerComponent,
                        PopupComponent,
                        ControlComponent,
                        FullscreenControlDirective,
                        NavigationControlDirective,
                        GeolocateControlDirective,
                        AttributionControlDirective,
                        ScaleControlDirective,
                        PointDirective,
                        ClusterPointDirective,
                        MarkersForClustersComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9uZ3gtbWFwYm94LWdsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUMzQixjQUFjLEdBQ2YsTUFBTSx1REFBdUQsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FB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MEJBQTBCO3dCQUMxQix5QkFBeUI7d0JBQ3pCLDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQixjQUFjO3dCQUNkLHFCQUFxQjt3QkFDckIsMkJBQTJCO3FCQUM1QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9hdHRyaWJ1dGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wvY29udHJvbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9mdWxsc2NyZWVuLWNvbnRyb2wuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU2NhbGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL3NjYWxlLWNvbnRyb2wuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnZ2FibGUvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS9pbWFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMYXllckNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXIvbGF5ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAvbWFwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1BUEJPWF9BUElfS0VZIH0gZnJvbSAnLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXHJcbiAgTWFya2Vyc0ZvckNsdXN0ZXJzQ29tcG9uZW50LFxyXG4gIFBvaW50RGlyZWN0aXZlLFxyXG59IGZyb20gJy4vbWFya2Vycy1mb3ItY2x1c3RlcnMvbWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbnZhc1NvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2NhbnZhcy1zb3VyY2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2ltYWdlLXNvdXJjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSYXN0ZXJEZW1Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9yYXN0ZXItZGVtLXNvdXJjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZlY3RvclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZlY3Rvci1zb3VyY2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlkZW9Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNYXBDb21wb25lbnQsXHJcbiAgICBMYXllckNvbXBvbmVudCxcclxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcclxuICAgIEltYWdlQ29tcG9uZW50LFxyXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxyXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcclxuICAgIFJhc3RlckRlbVNvdXJjZUNvbXBvbmVudCxcclxuICAgIFJhc3RlclNvdXJjZUNvbXBvbmVudCxcclxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxyXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXHJcbiAgICBDYW52YXNTb3VyY2VDb21wb25lbnQsXHJcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxyXG4gICAgTWFya2VyQ29tcG9uZW50LFxyXG4gICAgUG9wdXBDb21wb25lbnQsXHJcbiAgICBDb250cm9sQ29tcG9uZW50LFxyXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXHJcbiAgICBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSxcclxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXHJcbiAgICBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUsXHJcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXHJcbiAgICBQb2ludERpcmVjdGl2ZSxcclxuICAgIENsdXN0ZXJQb2ludERpcmVjdGl2ZSxcclxuICAgIE1hcmtlcnNGb3JDbHVzdGVyc0NvbXBvbmVudCxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hcENvbXBvbmVudCxcclxuICAgIExheWVyQ29tcG9uZW50LFxyXG4gICAgRHJhZ2dhYmxlRGlyZWN0aXZlLFxyXG4gICAgSW1hZ2VDb21wb25lbnQsXHJcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXHJcbiAgICBHZW9KU09OU291cmNlQ29tcG9uZW50LFxyXG4gICAgUmFzdGVyRGVtU291cmNlQ29tcG9uZW50LFxyXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxyXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXHJcbiAgICBWaWRlb1NvdXJjZUNvbXBvbmVudCxcclxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcclxuICAgIEZlYXR1cmVDb21wb25lbnQsXHJcbiAgICBNYXJrZXJDb21wb25lbnQsXHJcbiAgICBQb3B1cENvbXBvbmVudCxcclxuICAgIENvbnRyb2xDb21wb25lbnQsXHJcbiAgICBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSxcclxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxyXG4gICAgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSxcclxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcclxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcclxuICAgIFBvaW50RGlyZWN0aXZlLFxyXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxyXG4gICAgTWFya2Vyc0ZvckNsdXN0ZXJzQ29tcG9uZW50LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXBib3hHTE1vZHVsZSB7XHJcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiB7XHJcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG4gIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neE1hcGJveEdMTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4TWFwYm94R0xNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9BUElfS0VZLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5hY2Nlc3NUb2tlbixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19