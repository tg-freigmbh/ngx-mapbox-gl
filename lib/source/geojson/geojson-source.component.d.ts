import { NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { MapService } from '../../map/map.service';
import { GeoJSONSourceOptions } from '../../map/map.types';
import * as i0 from "@angular/core";
export declare class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges, GeoJSONSourceOptions {
    private mapService;
    private zone;
    id: string;
    data?: GeoJSONSourceOptions['data'];
    maxzoom?: GeoJSONSourceOptions['maxzoom'];
    attribution?: GeoJSONSourceOptions['attribution'];
    buffer?: GeoJSONSourceOptions['buffer'];
    tolerance?: GeoJSONSourceOptions['tolerance'];
    cluster?: GeoJSONSourceOptions['cluster'];
    clusterRadius?: GeoJSONSourceOptions['clusterRadius'];
    clusterMaxZoom?: GeoJSONSourceOptions['clusterMaxZoom'];
    clusterMinPoints?: GeoJSONSourceOptions['clusterMinPoints'];
    clusterProperties?: GeoJSONSourceOptions['clusterProperties'];
    lineMetrics?: GeoJSONSourceOptions['lineMetrics'];
    generateId?: GeoJSONSourceOptions['generateId'];
    promoteId?: GeoJSONSourceOptions['promoteId'];
    filter?: GeoJSONSourceOptions['filter'];
    updateFeatureData: Subject<unknown>;
    private sub;
    private sourceAdded;
    private featureIdCounter;
    constructor(mapService: MapService, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    getClusterExpansionZoom(clusterId: number): Promise<number>;
    /**
     * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    getClusterChildren(clusterId: number): Promise<import("geojson").Feature<import("geojson").Geometry, import("geojson").GeoJsonProperties>[]>;
    /**
     * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     * @param limit The maximum number of features to return.
     * @param offset The number of features to skip (e.g. for pagination).
     */
    getClusterLeaves(clusterId: number, limit: number, offset: number): Promise<import("geojson").Feature<import("geojson").Geometry, import("geojson").GeoJsonProperties>[]>;
    _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>): void;
    _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>): void;
    _getNewFeatureId(): number;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeoJSONSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GeoJSONSourceComponent, "mgl-geojson-source", never, { "id": { "alias": "id"; "required": false; }; "data": { "alias": "data"; "required": false; }; "maxzoom": { "alias": "maxzoom"; "required": false; }; "attribution": { "alias": "attribution"; "required": false; }; "buffer": { "alias": "buffer"; "required": false; }; "tolerance": { "alias": "tolerance"; "required": false; }; "cluster": { "alias": "cluster"; "required": false; }; "clusterRadius": { "alias": "clusterRadius"; "required": false; }; "clusterMaxZoom": { "alias": "clusterMaxZoom"; "required": false; }; "clusterMinPoints": { "alias": "clusterMinPoints"; "required": false; }; "clusterProperties": { "alias": "clusterProperties"; "required": false; }; "lineMetrics": { "alias": "lineMetrics"; "required": false; }; "generateId": { "alias": "generateId"; "required": false; }; "promoteId": { "alias": "promoteId"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; }, {}, never, never, false, never>;
}
