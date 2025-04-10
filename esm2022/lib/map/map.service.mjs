import { Inject, Injectable, InjectionToken, NgZone, Optional, } from '@angular/core';
import { AsyncSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Map, Marker, Popup } from 'mapbox-gl';
import * as i0 from "@angular/core";
export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
export class MapService {
    constructor(zone, MAPBOX_API_KEY) {
        this.zone = zone;
        this.MAPBOX_API_KEY = MAPBOX_API_KEY;
        this.mapCreated = new AsyncSubject();
        this.mapLoaded = new AsyncSubject();
        this.markersToRemove = [];
        this.popupsToRemove = [];
        this.imageIdsToRemove = [];
        this.subscription = new Subscription();
        this.mapCreated$ = this.mapCreated.asObservable();
        this.mapLoaded$ = this.mapLoaded.asObservable();
    }
    setup(options) {
        // Need onStable to wait for a potential @angular/route transition to end
        this.zone.onStable.pipe(first()).subscribe(() => {
            // Workaround rollup issue
            // this.assign(
            //   MapboxGl,
            //   'accessToken',
            //   options.accessToken || this.MAPBOX_API_KEY
            // );
            this.createMap({
                ...options.mapOptions,
                accessToken: options.accessToken || this.MAPBOX_API_KEY || '',
            });
            this.hookEvents(options.mapEvents);
            this.mapEvents = options.mapEvents;
            this.mapCreated.next(undefined);
            this.mapCreated.complete();
            // Intentionnaly emit mapCreate after internal mapCreated event
            if (options.mapEvents.mapCreate.observed) {
                this.zone.run(() => {
                    options.mapEvents.mapCreate.emit(this.mapInstance);
                });
            }
        });
    }
    destroyMap() {
        if (this.mapInstance) {
            this.subscription.unsubscribe();
            this.mapInstance.remove();
        }
    }
    updateProjection(projection) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setProjection(projection);
        });
    }
    updateMinZoom(minZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinZoom(minZoom);
        });
    }
    updateMaxZoom(maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxZoom(maxZoom);
        });
    }
    updateMinPitch(minPitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinPitch(minPitch);
        });
    }
    updateMaxPitch(maxPitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxPitch(maxPitch);
        });
    }
    updateRenderWorldCopies(status) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setRenderWorldCopies(status);
        });
    }
    updateScrollZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.scrollZoom.enable()
                : this.mapInstance.scrollZoom.disable();
        });
    }
    updateDragRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.dragRotate.enable()
                : this.mapInstance.dragRotate.disable();
        });
    }
    updateTouchPitch(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.touchPitch.enable()
                : this.mapInstance.touchPitch.disable();
        });
    }
    updateTouchZoomRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.touchZoomRotate.enable()
                : this.mapInstance.touchZoomRotate.disable();
        });
    }
    updateDoubleClickZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.doubleClickZoom.enable()
                : this.mapInstance.doubleClickZoom.disable();
        });
    }
    updateKeyboard(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.keyboard.enable()
                : this.mapInstance.keyboard.disable();
        });
    }
    updateDragPan(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.dragPan.enable()
                : this.mapInstance.dragPan.disable();
        });
    }
    updateBoxZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.boxZoom.enable()
                : this.mapInstance.boxZoom.disable();
        });
    }
    updateStyle(style) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setStyle(style);
        });
    }
    updateMaxBounds(maxBounds) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxBounds(maxBounds);
        });
    }
    changeCanvasCursor(cursor) {
        const canvas = this.mapInstance.getCanvasContainer();
        canvas.style.cursor = cursor;
    }
    queryRenderedFeatures(pointOrBox, parameters) {
        return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
    }
    panTo(center, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.panTo(center, options);
        });
    }
    move(movingMethod, movingOptions, zoom, center, bearing, pitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance[movingMethod]({
                ...movingOptions,
                zoom: zoom != null ? zoom : this.mapInstance.getZoom(),
                center: center != null ? center : this.mapInstance.getCenter(),
                bearing: bearing != null ? bearing : this.mapInstance.getBearing(),
                pitch: pitch != null ? pitch : this.mapInstance.getPitch(),
            });
        });
    }
    addLayer(layer, bindEvents, before) {
        this.zone.runOutsideAngular(() => {
            Object.keys(layer.layerOptions).forEach((key) => {
                const tkey = key;
                if (layer.layerOptions[tkey] === undefined) {
                    delete layer.layerOptions[tkey];
                }
            });
            this.mapInstance.addLayer(layer.layerOptions, before);
            if (bindEvents) {
                if (layer.layerEvents.layerClick.observed) {
                    this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerClick.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerDblClick.observed) {
                    this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerDblClick.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseDown.observed) {
                    this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseDown.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseUp.observed) {
                    this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseUp.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseEnter.observed) {
                    this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseEnter.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseLeave.observed) {
                    this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseLeave.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseMove.observed) {
                    this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseMove.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOver.observed) {
                    this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOver.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOut.observed) {
                    this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOut.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerContextMenu.observed) {
                    this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerContextMenu.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchStart.observed) {
                    this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchStart.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchEnd.observed) {
                    this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchEnd.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchCancel.observed) {
                    this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchCancel.emit(evt);
                        });
                    });
                }
            }
        });
    }
    removeLayer(layerId) {
        this.zone.runOutsideAngular(() => {
            if (this.mapInstance.getLayer(layerId) != null) {
                this.mapInstance.removeLayer(layerId);
            }
        });
    }
    addMarker(marker) {
        const options = {
            offset: marker.markersOptions.offset,
            anchor: marker.markersOptions.anchor,
            draggable: !!marker.markersOptions.draggable,
            rotationAlignment: marker.markersOptions.rotationAlignment,
            pitchAlignment: marker.markersOptions.pitchAlignment,
            clickTolerance: marker.markersOptions.clickTolerance,
        };
        if (marker.markersOptions?.element?.childNodes.length) {
            options.element = marker.markersOptions.element;
        }
        const markerInstance = new Marker(options);
        if (marker.markersEvents.markerDragStart.observed) {
            markerInstance.on('dragstart', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragStart.emit(target);
                    });
                }
            });
        }
        if (marker.markersEvents.markerDrag.observed) {
            markerInstance.on('drag', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDrag.emit(target);
                    });
                }
            });
        }
        if (marker.markersEvents.markerDragEnd.observed) {
            markerInstance.on('dragend', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragEnd.emit(target);
                    });
                }
            });
        }
        const lngLat = marker.markersOptions.feature
            ? marker.markersOptions.feature.geometry.coordinates
            : marker.markersOptions.lngLat;
        markerInstance.setLngLat(lngLat);
        return this.zone.runOutsideAngular(() => {
            markerInstance.addTo(this.mapInstance);
            return markerInstance;
        });
    }
    removeMarker(marker) {
        this.markersToRemove.push(marker);
    }
    createPopup(popup, element) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(popup.popupOptions).forEach((key) => popup.popupOptions[key] === undefined &&
                delete popup.popupOptions[key]);
            const popupInstance = new Popup(popup.popupOptions);
            popupInstance.setDOMContent(element);
            if (popup.popupEvents.popupClose.observed ||
                popup.popupEvents.close.observed) {
                popupInstance.on('close', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupClose.emit();
                        popup.popupEvents.close.emit();
                    });
                });
            }
            if (popup.popupEvents.popupOpen.observed ||
                popup.popupEvents.open.observed) {
                popupInstance.on('open', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupOpen.emit();
                        popup.popupEvents.open.emit();
                    });
                });
            }
            return popupInstance;
        });
    }
    addPopupToMap(popup, lngLat, skipOpenEvent = false) {
        return this.zone.runOutsideAngular(() => {
            if (skipOpenEvent && popup._listeners) {
                delete popup._listeners['open'];
            }
            popup.setLngLat(lngLat);
            popup.addTo(this.mapInstance);
        });
    }
    addPopupToMarker(marker, popup) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(popup);
        });
    }
    removePopupFromMap(popup, skipCloseEvent = false) {
        if (skipCloseEvent && popup._listeners) {
            delete popup._listeners['close'];
        }
        this.popupsToRemove.push(popup);
    }
    removePopupFromMarker(marker) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(undefined);
        });
    }
    addControl(control, position) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addControl(control, position);
        });
    }
    removeControl(control) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.removeControl(control);
        });
    }
    async loadAndAddImage(imageId, url, options) {
        return this.zone.runOutsideAngular(() => new Promise((resolve, reject) => {
            this.mapInstance.loadImage(url, (error, image) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.addImage(imageId, image, options);
                resolve();
            });
        }));
    }
    addImage(imageId, data, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addImage(imageId, data, options);
        });
    }
    removeImage(imageId) {
        this.imageIdsToRemove.push(imageId);
    }
    addSource(sourceId, source) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(source).forEach((key) => source[key] === undefined && delete source[key]);
            this.mapInstance.addSource(sourceId, source);
        });
    }
    getSource(sourceId) {
        return this.mapInstance.getSource(sourceId);
    }
    removeSource(sourceId) {
        this.zone.runOutsideAngular(() => {
            this.findLayersBySourceId(sourceId).forEach((layer) => this.mapInstance.removeLayer(layer.id));
            this.mapInstance.removeSource(sourceId);
        });
    }
    setAllLayerPaintProperty(layerId, paint) {
        return this.zone.runOutsideAngular(() => {
            if (paint != null) {
                Object.keys(paint).forEach((key) => {
                    // TODO Check for perf, setPaintProperty only on changed paint props maybe
                    this.mapInstance.setPaintProperty(layerId, key, paint[key]);
                });
            }
        });
    }
    setAllLayerLayoutProperty(layerId, layout) {
        return this.zone.runOutsideAngular(() => {
            if (layout != null) {
                Object.keys(layout).forEach((key) => {
                    // TODO Check for perf, setPaintProperty only on changed paint props maybe
                    this.mapInstance.setLayoutProperty(layerId, key, layout[key]);
                });
            }
        });
    }
    setLayerFilter(layerId, filter) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setFilter(layerId, filter);
        });
    }
    setLayerBefore(layerId, beforeId) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.moveLayer(layerId, beforeId);
        });
    }
    setLayerZoomRange(layerId, minZoom, maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setLayerZoomRange(layerId, minZoom ? minZoom : 0, maxZoom ? maxZoom : 20);
        });
    }
    fitBounds(bounds, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitBounds(bounds, options);
        });
    }
    fitScreenCoordinates(points, bearing, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitScreenCoordinates(points[0], points[1], bearing, options);
        });
    }
    applyChanges() {
        this.zone.runOutsideAngular(() => {
            this.removeMarkers();
            this.removePopups();
            this.removeImages();
        });
    }
    createMap(optionsWithAccessToken) {
        NgZone.assertNotInAngularZone();
        Object.keys(optionsWithAccessToken).forEach((key) => {
            const tkey = key;
            if (optionsWithAccessToken[tkey] === undefined) {
                delete optionsWithAccessToken[tkey];
            }
        });
        this.mapInstance = new Map(optionsWithAccessToken);
        const isIEorEdge = window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        if (isIEorEdge) {
            this.mapInstance.setStyle(optionsWithAccessToken.style);
        }
        this.subscription.add(this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges()));
    }
    removeMarkers() {
        for (const marker of this.markersToRemove) {
            marker.remove();
        }
        this.markersToRemove = [];
    }
    removePopups() {
        for (const popup of this.popupsToRemove) {
            popup.remove();
        }
        this.popupsToRemove = [];
    }
    removeImages() {
        for (const imageId of this.imageIdsToRemove) {
            this.mapInstance.removeImage(imageId);
        }
        this.imageIdsToRemove = [];
    }
    findLayersBySourceId(sourceId) {
        const layers = this.mapInstance.getStyle()?.layers;
        if (layers == null) {
            return [];
        }
        return layers.filter((l) => 'source' in l ? l.source === sourceId : false);
    }
    hookEvents(events) {
        this.mapInstance.on('load', (evt) => {
            this.mapLoaded.next(undefined);
            this.mapLoaded.complete();
            this.zone.run(() => {
                events.mapLoad.emit(evt);
                events.load.emit(evt.target);
            });
        });
        if (events.mapResize.observed) {
            this.mapInstance.on('resize', (evt) => this.zone.run(() => {
                events.mapResize.emit(evt);
            }));
        }
        if (events.mapRemove.observed) {
            this.mapInstance.on('remove', (evt) => this.zone.run(() => {
                events.mapRemove.emit(evt);
            }));
        }
        if (events.mapMouseDown.observed) {
            this.mapInstance.on('mousedown', (evt) => this.zone.run(() => {
                events.mapMouseDown.emit(evt);
            }));
        }
        if (events.mapMouseUp.observed) {
            this.mapInstance.on('mouseup', (evt) => this.zone.run(() => {
                events.mapMouseUp.emit(evt);
            }));
        }
        if (events.mapMouseMove.observed) {
            this.mapInstance.on('mousemove', (evt) => this.zone.run(() => {
                events.mapMouseMove.emit(evt);
            }));
        }
        if (events.mapClick.observed) {
            this.mapInstance.on('click', (evt) => this.zone.run(() => {
                events.mapClick.emit(evt);
            }));
        }
        if (events.mapDblClick.observed) {
            this.mapInstance.on('dblclick', (evt) => this.zone.run(() => {
                events.mapDblClick.emit(evt);
            }));
        }
        if (events.mapMouseOver.observed) {
            this.mapInstance.on('mouseover', (evt) => this.zone.run(() => {
                events.mapMouseOver.emit(evt);
            }));
        }
        if (events.mapMouseOut.observed) {
            this.mapInstance.on('mouseout', (evt) => this.zone.run(() => {
                events.mapMouseOut.emit(evt);
            }));
        }
        if (events.mapContextMenu.observed) {
            this.mapInstance.on('contextmenu', (evt) => this.zone.run(() => {
                events.mapContextMenu.emit(evt);
            }));
        }
        if (events.mapTouchStart.observed) {
            this.mapInstance.on('touchstart', (evt) => this.zone.run(() => {
                events.mapTouchStart.emit(evt);
            }));
        }
        if (events.mapTouchEnd.observed) {
            this.mapInstance.on('touchend', (evt) => this.zone.run(() => {
                events.mapTouchEnd.emit(evt);
            }));
        }
        if (events.mapTouchMove.observed) {
            this.mapInstance.on('touchmove', (evt) => this.zone.run(() => {
                events.mapTouchMove.emit(evt);
            }));
        }
        if (events.mapTouchCancel.observed) {
            this.mapInstance.on('touchcancel', (evt) => this.zone.run(() => {
                events.mapTouchCancel.emit(evt);
            }));
        }
        if (events.mapWheel.observed) {
            this.mapInstance.on('wheel', (evt) => this.zone.run(() => {
                events.mapWheel.emit(evt);
            }));
        }
        if (events.moveStart.observed) {
            this.mapInstance.on('movestart', (evt) => this.zone.run(() => events.moveStart.emit(evt)));
        }
        if (events.move.observed) {
            this.mapInstance.on('move', (evt) => this.zone.run(() => events.move.emit(evt)));
        }
        if (events.moveEnd.observed) {
            this.mapInstance.on('moveend', (evt) => this.zone.run(() => events.moveEnd.emit(evt)));
        }
        if (events.mapDragStart.observed) {
            this.mapInstance.on('dragstart', (evt) => this.zone.run(() => {
                events.mapDragStart.emit(evt);
            }));
        }
        if (events.mapDrag.observed) {
            this.mapInstance.on('drag', (evt) => this.zone.run(() => {
                events.mapDrag.emit(evt);
            }));
        }
        if (events.mapDragEnd.observed) {
            this.mapInstance.on('dragend', (evt) => this.zone.run(() => {
                events.mapDragEnd.emit(evt);
            }));
        }
        if (events.zoomStart.observed) {
            this.mapInstance.on('zoomstart', (evt) => this.zone.run(() => events.zoomStart.emit(evt)));
        }
        if (events.zoomEvt.observed) {
            this.mapInstance.on('zoom', (evt) => this.zone.run(() => events.zoomEvt.emit(evt)));
        }
        if (events.zoomEnd.observed) {
            this.mapInstance.on('zoomend', (evt) => this.zone.run(() => events.zoomEnd.emit(evt)));
        }
        if (events.rotateStart.observed) {
            this.mapInstance.on('rotatestart', (evt) => this.zone.run(() => events.rotateStart.emit(evt)));
        }
        if (events.rotate.observed) {
            this.mapInstance.on('rotate', (evt) => this.zone.run(() => events.rotate.emit(evt)));
        }
        if (events.rotateEnd.observed) {
            this.mapInstance.on('rotateend', (evt) => this.zone.run(() => events.rotateEnd.emit(evt)));
        }
        if (events.pitchStart.observed) {
            this.mapInstance.on('pitchstart', (evt) => this.zone.run(() => events.pitchStart.emit(evt)));
        }
        if (events.pitchEvt.observed) {
            this.mapInstance.on('pitch', (evt) => this.zone.run(() => events.pitchEvt.emit(evt)));
        }
        if (events.pitchEnd.observed) {
            this.mapInstance.on('pitchend', (evt) => this.zone.run(() => events.pitchEnd.emit(evt)));
        }
        if (events.boxZoomStart.observed) {
            this.mapInstance.on('boxzoomstart', (evt) => this.zone.run(() => events.boxZoomStart.emit(evt)));
        }
        if (events.boxZoomEnd.observed) {
            this.mapInstance.on('boxzoomend', (evt) => this.zone.run(() => events.boxZoomEnd.emit(evt)));
        }
        if (events.boxZoomCancel.observed) {
            this.mapInstance.on('boxzoomcancel', (evt) => this.zone.run(() => events.boxZoomCancel.emit(evt)));
        }
        if (events.webGlContextLost.observed) {
            this.mapInstance.on('webglcontextlost', (evt) => this.zone.run(() => events.webGlContextLost.emit(evt)));
        }
        if (events.webGlContextRestored.observed) {
            this.mapInstance.on('webglcontextrestored', (evt) => this.zone.run(() => events.webGlContextRestored.emit(evt)));
        }
        if (events.render.observed) {
            this.mapInstance.on('render', (evt) => this.zone.run(() => events.render.emit(evt)));
        }
        if (events.mapError.observed) {
            this.mapInstance.on('error', (evt) => this.zone.run(() => events.mapError.emit(evt)));
        }
        if (events.data.observed) {
            this.mapInstance.on('data', (evt) => this.zone.run(() => events.data.emit(evt)));
        }
        if (events.styleData.observed) {
            this.mapInstance.on('styledata', (evt) => this.zone.run(() => events.styleData.emit(evt)));
        }
        if (events.sourceData.observed) {
            this.mapInstance.on('sourcedata', (evt) => this.zone.run(() => events.sourceData.emit(evt)));
        }
        if (events.dataLoading.observed) {
            this.mapInstance.on('dataloading', (evt) => this.zone.run(() => events.dataLoading.emit(evt)));
        }
        if (events.styleDataLoading.observed) {
            this.mapInstance.on('styledataloading', (evt) => this.zone.run(() => events.styleDataLoading.emit(evt)));
        }
        if (events.sourceDataLoading.observed) {
            this.mapInstance.on('sourcedataloading', (evt) => this.zone.run(() => events.sourceDataLoading.emit(evt)));
        }
        if (events.styleImageMissing.observed) {
            this.mapInstance.on('styleimagemissing', (evt) => this.zone.run(() => events.styleImageMissing.emit(evt)));
        }
        if (events.idle.observed) {
            this.mapInstance.on('idle', (evt) => this.zone.run(() => events.idle.emit(evt)));
        }
    }
    // TODO move this elsewhere
    assign(obj, prop, value) {
        if (typeof prop === 'string') {
            // eslint-disable-next-line no-param-reassign
            prop = prop.split('.');
        }
        if (prop.length > 1) {
            const e = prop.shift();
            this.assign((obj[e] =
                Object.prototype.toString.call(obj[e]) === '[object Object]'
                    ? obj[e]
                    : {}), prop, value);
        }
        else {
            obj[prop[0]] = value;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MapService, deps: [{ token: i0.NgZone }, { token: MAPBOX_API_KEY, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MapService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MapService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAPBOX_API_KEY]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9tYXAvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLE1BQU0sRUFDTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVXZDLE9BQU8sRUFBRSxHQUFHLEVBQW9PLE1BQU0sRUFBNEIsS0FBSyxFQUE0VixNQUFNLFdBQVcsQ0FBQzs7QUFFcm9CLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQTZDakUsTUFBTSxPQUFPLFVBQVU7SUFhckIsWUFDVSxJQUFZLEVBR0gsY0FBNkI7UUFIdEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUdILG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBWHhDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3RDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3JDLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBQy9CLG1CQUFjLEdBQVksRUFBRSxDQUFDO1FBQzdCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFReEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQWlC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QUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDbEQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDN0MsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDaEQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDakQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDL0MsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDL0MsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDbkQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDakQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDcEQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDdkQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDM0QsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDN0MsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDL0MsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDM0MsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDaEQsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENB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a0hBaEJiLFVBQVU7OzJGQUFWLFVBQVU7a0JBRHRCLFVBQVU7OzBCQWdCTixRQUFROzswQkFDUixNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBOZ1pvbmUsXHJcbiAgT3B0aW9uYWwsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFzeW5jU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gIEZseVRvT3B0aW9ucyxcclxuICBMYXllckV2ZW50cyxcclxuICBMYXllclNwZWNpZmljYXRpb25MYXlvdXQsXHJcbiAgTGF5ZXJTcGVjaWZpY2F0aW9uUGFpbnQsXHJcbiAgTWFwRXZlbnQsXHJcbiAgTWFwSW1hZ2VEYXRhLFxyXG4gIE1hcEltYWdlT3B0aW9ucyxcclxufSBmcm9tICcuL21hcC50eXBlcyc7XHJcbmltcG9ydCB7IE1hcCwgQW5pbWF0aW9uT3B0aW9ucywgU291cmNlU3BlY2lmaWNhdGlvbiwgU291cmNlLCBDYW1lcmFPcHRpb25zLCBGaWxsRXh0cnVzaW9uTGF5b3V0LCBGaWxsRXh0cnVzaW9uUGFpbnQsIEZpbGxMYXlvdXQsIEZpbGxQYWludCwgRml0Qm91bmRzT3B0aW9ucywgSUNvbnRyb2wsIExheWVyLCBMaW5lTGF5b3V0LCBMaW5lUGFpbnQsIExuZ0xhdEJvdW5kc0xpa2UsIExuZ0xhdExpa2UsIE1hcE9wdGlvbnMsIE1hcmtlciwgTWFya2VyT3B0aW9ucywgUG9pbnRMaWtlLCBQb3B1cCwgUG9wdXBPcHRpb25zLCBSYXN0ZXJMYXlvdXQsIFJhc3RlclBhaW50LCBTdHlsZSwgU3ltYm9sTGF5b3V0LCBTeW1ib2xQYWludCwgQmFja2dyb3VuZExheW91dCwgQmFja2dyb3VuZExheWVyU3BlY2lmaWNhdGlvbiwgQmFja2dyb3VuZFBhaW50LCBGaWxsRXh0cnVzaW9uTGF5ZXJTcGVjaWZpY2F0aW9uLCBGaWxsTGF5ZXJTcGVjaWZpY2F0aW9uLCBMaW5lTGF5ZXJTcGVjaWZpY2F0aW9uLCBSYXN0ZXJMYXllclNwZWNpZmljYXRpb24sIFN5bWJvbExheWVyU3BlY2lmaWNhdGlvbiwgQ2lyY2xlTGF5ZXJTcGVjaWZpY2F0aW9uLCBBbnlMYXllciwgTGF5ZXJTcGVjaWZpY2F0aW9uLCBDb250cm9sUG9zaXRpb24gfSBmcm9tICdtYXBib3gtZ2wnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1BUEJPWF9BUElfS0VZID0gbmV3IEluamVjdGlvblRva2VuKCdNYXBib3hBcGlLZXknKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXAge1xyXG4gIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xyXG4gIG1hcE9wdGlvbnM6IE1hcE9wdGlvbnM7XHJcbiAgbWFwRXZlbnRzOiBNYXBFdmVudDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXR1cExheWVyIHtcclxuICBsYXllck9wdGlvbnM6IExheWVyO1xyXG4gIGxheWVyRXZlbnRzOiBMYXllckV2ZW50cztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXR1cFBvcHVwIHtcclxuICBwb3B1cE9wdGlvbnM6IFBvcHVwT3B0aW9ucztcclxuICBwb3B1cEV2ZW50czoge1xyXG4gICAgb3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xyXG4gICAgY2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPjtcclxuICAgIHBvcHVwT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xyXG4gICAgcG9wdXBDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXJrZXIge1xyXG4gIG1hcmtlcnNPcHRpb25zOiBNYXJrZXJPcHRpb25zICYge1xyXG4gICAgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcclxuICAgIGxuZ0xhdD86IExuZ0xhdExpa2U7XHJcbiAgfTtcclxuICBtYXJrZXJzRXZlbnRzOiB7XHJcbiAgICBtYXJrZXJEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNYXJrZXI+O1xyXG4gICAgbWFya2VyRHJhZzogRXZlbnRFbWl0dGVyPE1hcmtlcj47XHJcbiAgICBtYXJrZXJEcmFnRW5kOiBFdmVudEVtaXR0ZXI8TWFya2VyPjtcclxuICB9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTWFwYm94T3B0aW9uc1dpdGhBY2Nlc3NUb2tlbiBleHRlbmRzIE1hcE9wdGlvbnMge1xyXG4gIGFjY2Vzc1Rva2VuOiBNYXBPcHRpb25zWydhY2Nlc3NUb2tlbiddO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNb3ZpbmdPcHRpb25zID1cclxuICB8IEZseVRvT3B0aW9uc1xyXG4gIHwgKEFuaW1hdGlvbk9wdGlvbnMgJiBDYW1lcmFPcHRpb25zKVxyXG4gIHwgQ2FtZXJhT3B0aW9ucztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1hcFNlcnZpY2Uge1xyXG4gIG1hcEluc3RhbmNlOiBNYXA7XHJcbiAgbWFwQ3JlYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XHJcbiAgbWFwTG9hZGVkJDogT2JzZXJ2YWJsZTx2b2lkPjtcclxuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xyXG5cclxuICBwcml2YXRlIG1hcENyZWF0ZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBtYXBMb2FkZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBtYXJrZXJzVG9SZW1vdmU6IE1hcmtlcltdID0gW107XHJcbiAgcHJpdmF0ZSBwb3B1cHNUb1JlbW92ZTogUG9wdXBbXSA9IFtdO1xyXG4gIHByaXZhdGUgaW1hZ2VJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KE1BUEJPWF9BUElfS0VZKVxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBNQVBCT1hfQVBJX0tFWTogc3RyaW5nIHwgbnVsbFxyXG4gICkge1xyXG4gICAgdGhpcy5tYXBDcmVhdGVkJCA9IHRoaXMubWFwQ3JlYXRlZC5hc09ic2VydmFibGUoKTtcclxuICAgIHRoaXMubWFwTG9hZGVkJCA9IHRoaXMubWFwTG9hZGVkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgc2V0dXAob3B0aW9uczogU2V0dXBNYXApIHtcclxuXHJcbiAgICAvLyBOZWVkIG9uU3RhYmxlIHRvIHdhaXQgZm9yIGEgcG90ZW50aWFsIEBhbmd1bGFyL3JvdXRlIHRyYW5zaXRpb24gdG8gZW5kXHJcbiAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAvLyBXb3JrYXJvdW5kIHJvbGx1cCBpc3N1ZVxyXG4gICAgICAvLyB0aGlzLmFzc2lnbihcclxuICAgICAgLy8gICBNYXBib3hHbCxcclxuICAgICAgLy8gICAnYWNjZXNzVG9rZW4nLFxyXG4gICAgICAvLyAgIG9wdGlvbnMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfQVBJX0tFWVxyXG4gICAgICAvLyApO1xyXG5cclxuICAgICAgdGhpcy5jcmVhdGVNYXAoe1xyXG4gICAgICAgIC4uLm9wdGlvbnMubWFwT3B0aW9ucyxcclxuICAgICAgICBhY2Nlc3NUb2tlbjogb3B0aW9ucy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9BUElfS0VZIHx8ICcnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuaG9va0V2ZW50cyhvcHRpb25zLm1hcEV2ZW50cyk7XHJcbiAgICAgIHRoaXMubWFwRXZlbnRzID0gb3B0aW9ucy5tYXBFdmVudHM7XHJcbiAgICAgIHRoaXMubWFwQ3JlYXRlZC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMubWFwQ3JlYXRlZC5jb21wbGV0ZSgpO1xyXG4gICAgICAvLyBJbnRlbnRpb25uYWx5IGVtaXQgbWFwQ3JlYXRlIGFmdGVyIGludGVybmFsIG1hcENyZWF0ZWQgZXZlbnRcclxuICAgICAgaWYgKG9wdGlvbnMubWFwRXZlbnRzLm1hcENyZWF0ZS5vYnNlcnZlZCkge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgb3B0aW9ucy5tYXBFdmVudHMubWFwQ3JlYXRlLmVtaXQodGhpcy5tYXBJbnN0YW5jZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveU1hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcEluc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm9qZWN0aW9uKHByb2plY3Rpb246IE1hcE9wdGlvbnNbJ3Byb2plY3Rpb24nXSkge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICh0aGlzLm1hcEluc3RhbmNlIGFzIGFueSkuc2V0UHJvamVjdGlvbihwcm9qZWN0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWluWm9vbShtaW5ab29tOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblpvb20obWluWm9vbSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1heFpvb20obWF4Wm9vbTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhab29tKG1heFpvb20pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNaW5QaXRjaChtaW5QaXRjaDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNaW5QaXRjaChtaW5QaXRjaCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1heFBpdGNoKG1heFBpdGNoOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1heFBpdGNoKG1heFBpdGNoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVyV29ybGRDb3BpZXMoc3RhdHVzOiBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRSZW5kZXJXb3JsZENvcGllcyhzdGF0dXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTY3JvbGxab29tKHN0YXR1czogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHN0YXR1c1xyXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5zY3JvbGxab29tLmVuYWJsZSgpXHJcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEcmFnUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHN0YXR1c1xyXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmVuYWJsZSgpXHJcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdSb3RhdGUuZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUb3VjaFBpdGNoKHN0YXR1czogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHN0YXR1c1xyXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS50b3VjaFBpdGNoLmVuYWJsZSgpXHJcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLnRvdWNoUGl0Y2guZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUb3VjaFpvb21Sb3RhdGUoc3RhdHVzOiBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgc3RhdHVzXHJcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLnRvdWNoWm9vbVJvdGF0ZS5lbmFibGUoKVxyXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEb3VibGVDbGlja1pvb20oc3RhdHVzOiBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgc3RhdHVzXHJcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5lbmFibGUoKVxyXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBzdGF0dXNcclxuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKClcclxuICAgICAgICA6IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEcmFnUGFuKHN0YXR1czogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHN0YXR1c1xyXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmVuYWJsZSgpXHJcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVCb3hab29tKHN0YXR1czogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHN0YXR1c1xyXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5ib3hab29tLmVuYWJsZSgpXHJcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZGlzYWJsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdHlsZShzdHlsZTogU3R5bGUpIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFN0eWxlKHN0eWxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWF4Qm91bmRzKG1heEJvdW5kczogTG5nTGF0Qm91bmRzTGlrZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Qm91bmRzKG1heEJvdW5kcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUNhbnZhc0N1cnNvcihjdXJzb3I6IHN0cmluZykge1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tYXBJbnN0YW5jZS5nZXRDYW52YXNDb250YWluZXIoKTtcclxuICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7XHJcbiAgfVxyXG5cclxuICBxdWVyeVJlbmRlcmVkRmVhdHVyZXMoXHJcbiAgICBwb2ludE9yQm94OiBQb2ludExpa2UgfCBbUG9pbnRMaWtlLCBQb2ludExpa2VdLFxyXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW107IGZpbHRlcj86IGFueVtdIH1cclxuICApOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMocG9pbnRPckJveCwgcGFyYW1ldGVycyk7XHJcbiAgfVxyXG5cclxuICBwYW5UbyhjZW50ZXI6IExuZ0xhdExpa2UsIG9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5wYW5UbyhjZW50ZXIsIG9wdGlvbnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKFxyXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcclxuICAgIG1vdmluZ09wdGlvbnM/OiBNb3ZpbmdPcHRpb25zLFxyXG4gICAgem9vbT86IG51bWJlcixcclxuICAgIGNlbnRlcj86IExuZ0xhdExpa2UsXHJcbiAgICBiZWFyaW5nPzogbnVtYmVyLFxyXG4gICAgcGl0Y2g/OiBudW1iZXJcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAodGhpcy5tYXBJbnN0YW5jZVttb3ZpbmdNZXRob2RdIGFzIGFueSkoe1xyXG4gICAgICAgIC4uLm1vdmluZ09wdGlvbnMsXHJcbiAgICAgICAgem9vbTogem9vbSAhPSBudWxsID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxyXG4gICAgICAgIGNlbnRlcjogY2VudGVyICE9IG51bGwgPyBjZW50ZXIgOiB0aGlzLm1hcEluc3RhbmNlLmdldENlbnRlcigpLFxyXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgIT0gbnVsbCA/IGJlYXJpbmcgOiB0aGlzLm1hcEluc3RhbmNlLmdldEJlYXJpbmcoKSxcclxuICAgICAgICBwaXRjaDogcGl0Y2ggIT0gbnVsbCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkTGF5ZXIobGF5ZXI6IFNldHVwTGF5ZXIsIGJpbmRFdmVudHM6IGJvb2xlYW4sIGJlZm9yZT86IHN0cmluZykge1xyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMobGF5ZXIubGF5ZXJPcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRrZXkgPSBrZXkgYXMga2V5b2YgTGF5ZXJTcGVjaWZpY2F0aW9uO1xyXG4gICAgICAgIGlmIChsYXllci5sYXllck9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZGVsZXRlIGxheWVyLmxheWVyT3B0aW9uc1t0a2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRMYXllcihcclxuICAgICAgICBsYXllci5sYXllck9wdGlvbnMsXHJcbiAgICAgICAgYmVmb3JlXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoYmluZEV2ZW50cykge1xyXG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5sYXllckNsaWNrLm9ic2VydmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjbGljaycsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllckNsaWNrLmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmxheWVyRGJsQ2xpY2sub2JzZXJ2ZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RibGNsaWNrJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyRGJsQ2xpY2suZW1pdChldnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZURvd24ub2JzZXJ2ZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZG93bicsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlRG93bi5lbWl0KGV2dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlVXAub2JzZXJ2ZWQpIHtcclxuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNldXAnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZVVwLmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VFbnRlci5vYnNlcnZlZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VlbnRlcicsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlRW50ZXIuZW1pdChldnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZUxlYXZlLm9ic2VydmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWxlYXZlJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VMZWF2ZS5lbWl0KGV2dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlTW92ZS5vYnNlcnZlZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VNb3ZlLmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VPdmVyLm9ic2VydmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW92ZXInLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU92ZXIuZW1pdChldnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU91dC5vYnNlcnZlZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdXQnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU91dC5lbWl0KGV2dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5sYXllckNvbnRleHRNZW51Lm9ic2VydmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjb250ZXh0bWVudScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllckNvbnRleHRNZW51LmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmxheWVyVG91Y2hTdGFydC5vYnNlcnZlZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hzdGFydCcsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoU3RhcnQuZW1pdChldnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaEVuZC5vYnNlcnZlZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hlbmQnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaEVuZC5lbWl0KGV2dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoQ2FuY2VsLm9ic2VydmVkKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGNhbmNlbCcsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoQ2FuY2VsLmVtaXQoZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlTGF5ZXIobGF5ZXJJZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5tYXBJbnN0YW5jZS5nZXRMYXllcihsYXllcklkKSAhPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVMYXllcihsYXllcklkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRNYXJrZXIobWFya2VyOiBTZXR1cE1hcmtlcikge1xyXG4gICAgY29uc3Qgb3B0aW9uczogTWFya2VyT3B0aW9ucyA9IHtcclxuICAgICAgb2Zmc2V0OiBtYXJrZXIubWFya2Vyc09wdGlvbnMub2Zmc2V0LFxyXG4gICAgICBhbmNob3I6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5hbmNob3IsXHJcbiAgICAgIGRyYWdnYWJsZTogISFtYXJrZXIubWFya2Vyc09wdGlvbnMuZHJhZ2dhYmxlLFxyXG4gICAgICByb3RhdGlvbkFsaWdubWVudDogbWFya2VyLm1hcmtlcnNPcHRpb25zLnJvdGF0aW9uQWxpZ25tZW50LFxyXG4gICAgICBwaXRjaEFsaWdubWVudDogbWFya2VyLm1hcmtlcnNPcHRpb25zLnBpdGNoQWxpZ25tZW50LFxyXG4gICAgICBjbGlja1RvbGVyYW5jZTogbWFya2VyLm1hcmtlcnNPcHRpb25zLmNsaWNrVG9sZXJhbmNlLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAobWFya2VyLm1hcmtlcnNPcHRpb25zPy5lbGVtZW50Py5jaGlsZE5vZGVzLmxlbmd0aCkge1xyXG4gICAgICBvcHRpb25zLmVsZW1lbnQgPSBtYXJrZXIubWFya2Vyc09wdGlvbnMuZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXJrZXJJbnN0YW5jZSA9IG5ldyBNYXJrZXIob3B0aW9ucyk7XHJcbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZ1N0YXJ0Lm9ic2VydmVkKSB7XHJcbiAgICAgIG1hcmtlckluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudCBhcyB7IHRhcmdldDogTWFya2VyIH07XHJcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZ1N0YXJ0LmVtaXQodGFyZ2V0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLm1hcmtlckRyYWcub2JzZXJ2ZWQpIHtcclxuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudCBhcyB7IHRhcmdldDogTWFya2VyIH07XHJcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZy5lbWl0KHRhcmdldCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtYXJrZXIubWFya2Vyc0V2ZW50cy5tYXJrZXJEcmFnRW5kLm9ic2VydmVkKSB7XHJcbiAgICAgIG1hcmtlckluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQgYXMgeyB0YXJnZXQ6IE1hcmtlciB9O1xyXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIG1hcmtlci5tYXJrZXJzRXZlbnRzLm1hcmtlckRyYWdFbmQuZW1pdCh0YXJnZXQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsbmdMYXQ6IExuZ0xhdExpa2UgPSBtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZVxyXG4gICAgICA/IChtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcyBhcyBbXHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIG51bWJlclxyXG4gICAgICBdKVxyXG4gICAgICA6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5sbmdMYXQhO1xyXG4gICAgbWFya2VySW5zdGFuY2Uuc2V0TG5nTGF0KGxuZ0xhdCk7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgbWFya2VySW5zdGFuY2UuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XHJcbiAgICAgIHJldHVybiBtYXJrZXJJbnN0YW5jZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyKSB7XHJcbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZS5wdXNoKG1hcmtlcik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQb3B1cChwb3B1cDogU2V0dXBQb3B1cCwgZWxlbWVudDogTm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBvcHVwLnBvcHVwT3B0aW9ucykuZm9yRWFjaChcclxuICAgICAgICAoa2V5KSA9PlxyXG4gICAgICAgICAgKHBvcHVwLnBvcHVwT3B0aW9ucyBhcyBhbnkpW2tleV0gPT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgZGVsZXRlIChwb3B1cC5wb3B1cE9wdGlvbnMgYXMgYW55KVtrZXldXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2UgPSBuZXcgUG9wdXAocG9wdXAucG9wdXBPcHRpb25zKTtcclxuICAgICAgcG9wdXBJbnN0YW5jZS5zZXRET01Db250ZW50KGVsZW1lbnQpO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgcG9wdXAucG9wdXBFdmVudHMucG9wdXBDbG9zZS5vYnNlcnZlZCB8fFxyXG4gICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLmNsb3NlLm9ic2VydmVkXHJcbiAgICAgICkge1xyXG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLnBvcHVwQ2xvc2UuZW1pdCgpO1xyXG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5lbWl0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgcG9wdXAucG9wdXBFdmVudHMucG9wdXBPcGVuLm9ic2VydmVkIHx8XHJcbiAgICAgICAgcG9wdXAucG9wdXBFdmVudHMub3Blbi5vYnNlcnZlZFxyXG4gICAgICApIHtcclxuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdvcGVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLnBvcHVwT3Blbi5lbWl0KCk7XHJcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4uZW1pdCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHBvcHVwSW5zdGFuY2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFBvcHVwVG9NYXAoXHJcbiAgICBwb3B1cDogUG9wdXAsXHJcbiAgICBsbmdMYXQ6IExuZ0xhdExpa2UsXHJcbiAgICBza2lwT3BlbkV2ZW50ID0gZmFsc2VcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBpZiAoc2tpcE9wZW5FdmVudCAmJiAocG9wdXAgYXMgYW55KS5fbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgZGVsZXRlIChwb3B1cCBhcyBhbnkpLl9saXN0ZW5lcnNbJ29wZW4nXTtcclxuICAgICAgfVxyXG4gICAgICBwb3B1cC5zZXRMbmdMYXQobG5nTGF0KTtcclxuICAgICAgcG9wdXAuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXJrZXIsIHBvcHVwOiBQb3B1cCkge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIG1hcmtlci5zZXRQb3B1cChwb3B1cCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogUG9wdXAsIHNraXBDbG9zZUV2ZW50ID0gZmFsc2UpIHtcclxuICAgIGlmIChza2lwQ2xvc2VFdmVudCAmJiAocG9wdXAgYXMgYW55KS5fbGlzdGVuZXJzKSB7XHJcbiAgICAgIGRlbGV0ZSAocG9wdXAgYXMgYW55KS5fbGlzdGVuZXJzWydjbG9zZSddO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZS5wdXNoKHBvcHVwKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVBvcHVwRnJvbU1hcmtlcihtYXJrZXI6IE1hcmtlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIG1hcmtlci5zZXRQb3B1cCh1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRDb250cm9sKFxyXG4gICAgY29udHJvbDogSUNvbnRyb2wsXHJcbiAgICBwb3NpdGlvbj86IENvbnRyb2xQb3NpdGlvblxyXG4gICkge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkQ29udHJvbChjb250cm9sLCBwb3NpdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvbnRyb2woY29udHJvbDogSUNvbnRyb2wpIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woY29udHJvbCBhcyBhbnkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBsb2FkQW5kQWRkSW1hZ2UoXHJcbiAgICBpbWFnZUlkOiBzdHJpbmcsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnNcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXHJcbiAgICAgICgpID0+XHJcbiAgICAgICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5sb2FkSW1hZ2UodXJsLCAoZXJyb3IsIGltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSW1hZ2UoaW1hZ2VJZCwgaW1hZ2UgYXMgSW1hZ2VCaXRtYXAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFkZEltYWdlKGltYWdlSWQ6IHN0cmluZywgZGF0YTogTWFwSW1hZ2VEYXRhLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRJbWFnZShpbWFnZUlkLCBkYXRhIGFzIGFueSwgb3B0aW9ucyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUltYWdlKGltYWdlSWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlLnB1c2goaW1hZ2VJZCk7XHJcbiAgfVxyXG5cclxuICBhZGRTb3VyY2Uoc291cmNlSWQ6IHN0cmluZywgc291cmNlOiBTb3VyY2VTcGVjaWZpY2F0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKFxyXG4gICAgICAgIChrZXkpID0+XHJcbiAgICAgICAgICAoc291cmNlIGFzIGFueSlba2V5XSA9PT0gdW5kZWZpbmVkICYmIGRlbGV0ZSAoc291cmNlIGFzIGFueSlba2V5XVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRTb3VyY2Uoc291cmNlSWQsIHNvdXJjZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFNvdXJjZTxUIGV4dGVuZHMgU291cmNlPihzb3VyY2VJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5nZXRTb3VyY2Uoc291cmNlSWQpIGFzIFQ7XHJcbiAgfVxyXG5cclxuICByZW1vdmVTb3VyY2Uoc291cmNlSWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5maW5kTGF5ZXJzQnlTb3VyY2VJZChzb3VyY2VJZCkuZm9yRWFjaCgobGF5ZXIpID0+XHJcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVMYXllcihsYXllci5pZClcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVTb3VyY2Uoc291cmNlSWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRBbGxMYXllclBhaW50UHJvcGVydHkoXHJcbiAgICBsYXllcklkOiBzdHJpbmcsXHJcbiAgICBwYWludDogTGF5ZXJTcGVjaWZpY2F0aW9uUGFpbnRcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBpZiAocGFpbnQgIT0gbnVsbCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHBhaW50IGFzIG9iamVjdCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxyXG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRQYWludFByb3BlcnR5KGxheWVySWQsIGtleSBhcyAoa2V5b2YgTGF5ZXJTcGVjaWZpY2F0aW9uUGFpbnQpLCBwYWludFtrZXkgYXMga2V5b2YgTGF5ZXJTcGVjaWZpY2F0aW9uUGFpbnRdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxyXG4gICAgbGF5ZXJJZDogc3RyaW5nLFxyXG4gICAgbGF5b3V0OiBMYXllclNwZWNpZmljYXRpb25MYXlvdXRcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBpZiAobGF5b3V0ICE9IG51bGwpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhsYXlvdXQgYXMgb2JqZWN0KS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXHJcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIGtleSBhcyAoa2V5b2YgTGF5ZXJTcGVjaWZpY2F0aW9uTGF5b3V0KSwgbGF5b3V0W2tleSBhcyBrZXlvZiBMYXllclNwZWNpZmljYXRpb25MYXlvdXRdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRMYXllckZpbHRlcihsYXllcklkOiBzdHJpbmcsIGZpbHRlcjogYW55W10pIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldEZpbHRlcihsYXllcklkLCBmaWx0ZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRMYXllckJlZm9yZShsYXllcklkOiBzdHJpbmcsIGJlZm9yZUlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm1vdmVMYXllcihsYXllcklkLCBiZWZvcmVJZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldExheWVyWm9vbVJhbmdlKGxheWVySWQ6IHN0cmluZywgbWluWm9vbT86IG51bWJlciwgbWF4Wm9vbT86IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5ZXJab29tUmFuZ2UoXHJcbiAgICAgICAgbGF5ZXJJZCxcclxuICAgICAgICBtaW5ab29tID8gbWluWm9vbSA6IDAsXHJcbiAgICAgICAgbWF4Wm9vbSA/IG1heFpvb20gOiAyMFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmaXRCb3VuZHMoXHJcbiAgICBib3VuZHM6IExuZ0xhdEJvdW5kc0xpa2UsXHJcbiAgICBvcHRpb25zPzogRml0Qm91bmRzT3B0aW9uc1xyXG4gICkge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZpdFNjcmVlbkNvb3JkaW5hdGVzKFxyXG4gICAgcG9pbnRzOiBbUG9pbnRMaWtlLCBQb2ludExpa2VdLFxyXG4gICAgYmVhcmluZzogbnVtYmVyLFxyXG4gICAgb3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMgJiBDYW1lcmFPcHRpb25zXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5maXRTY3JlZW5Db29yZGluYXRlcyhcclxuICAgICAgICBwb2ludHNbMF0sXHJcbiAgICAgICAgcG9pbnRzWzFdLFxyXG4gICAgICAgIGJlYXJpbmcsXHJcbiAgICAgICAgb3B0aW9uc1xyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhcHBseUNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcnMoKTtcclxuICAgICAgdGhpcy5yZW1vdmVQb3B1cHMoKTtcclxuICAgICAgdGhpcy5yZW1vdmVJbWFnZXMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNYXAob3B0aW9uc1dpdGhBY2Nlc3NUb2tlbjogTWFwYm94T3B0aW9uc1dpdGhBY2Nlc3NUb2tlbikge1xyXG4gICAgTmdab25lLmFzc2VydE5vdEluQW5ndWxhclpvbmUoKTtcclxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnNXaXRoQWNjZXNzVG9rZW4pLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRrZXkgPSBrZXkgYXMga2V5b2YgTWFwT3B0aW9ucztcclxuICAgICAgaWYgKG9wdGlvbnNXaXRoQWNjZXNzVG9rZW5bdGtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb25zV2l0aEFjY2Vzc1Rva2VuW3RrZXldO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFwSW5zdGFuY2UgPSBuZXcgTWFwKG9wdGlvbnNXaXRoQWNjZXNzVG9rZW4pO1xyXG5cclxuICAgIGNvbnN0IGlzSUVvckVkZ2UgPVxyXG4gICAgICB3aW5kb3cgJiYgL21zaWVcXHN8dHJpZGVudFxcL3xlZGdlXFwvL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICBpZiAoaXNJRW9yRWRnZSkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFN0eWxlKG9wdGlvbnNXaXRoQWNjZXNzVG9rZW4uc3R5bGUhKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgIHRoaXMuem9uZS5vbk1pY3JvdGFza0VtcHR5LnN1YnNjcmliZSgoKSA9PiB0aGlzLmFwcGx5Q2hhbmdlcygpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlTWFya2VycygpIHtcclxuICAgIGZvciAoY29uc3QgbWFya2VyIG9mIHRoaXMubWFya2Vyc1RvUmVtb3ZlKSB7XHJcbiAgICAgIG1hcmtlci5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlID0gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVBvcHVwcygpIHtcclxuICAgIGZvciAoY29uc3QgcG9wdXAgb2YgdGhpcy5wb3B1cHNUb1JlbW92ZSkge1xyXG4gICAgICBwb3B1cC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUgPSBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlSW1hZ2VzKCkge1xyXG4gICAgZm9yIChjb25zdCBpbWFnZUlkIG9mIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUltYWdlKGltYWdlSWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlID0gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRMYXllcnNCeVNvdXJjZUlkKHNvdXJjZUlkOiBzdHJpbmcpOiBMYXllcltdIHtcclxuICAgIGNvbnN0IGxheWVycyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0U3R5bGUoKT8ubGF5ZXJzO1xyXG5cclxuICAgIGlmIChsYXllcnMgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxheWVycy5maWx0ZXIoKGwpID0+XHJcbiAgICAgICdzb3VyY2UnIGluIGwgPyBsLnNvdXJjZSA9PT0gc291cmNlSWQgOiBmYWxzZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IE1hcEV2ZW50KSB7XHJcbiAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdsb2FkJywgKGV2dCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcExvYWRlZC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMubWFwTG9hZGVkLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICBldmVudHMubWFwTG9hZC5lbWl0KGV2dCk7XHJcbiAgICAgICAgZXZlbnRzLmxvYWQuZW1pdChldnQudGFyZ2V0KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXZlbnRzLm1hcFJlc2l6ZS5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZXNpemUnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnRzLm1hcFJlc2l6ZS5lbWl0KGV2dCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMubWFwUmVtb3ZlLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JlbW92ZScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwUmVtb3ZlLmVtaXQoZXZ0KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50cy5tYXBNb3VzZURvd24ub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vkb3duJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGV2ZW50cy5tYXBNb3VzZURvd24uZW1pdChldnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1hcE1vdXNlVXAub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2V1cCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwTW91c2VVcC5lbWl0KGV2dCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMubWFwTW91c2VNb3ZlLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwTW91c2VNb3ZlLmVtaXQoZXZ0KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50cy5tYXBDbGljay5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjbGljaycsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwQ2xpY2suZW1pdChldnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1hcERibENsaWNrLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RibGNsaWNrJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGV2ZW50cy5tYXBEYmxDbGljay5lbWl0KGV2dCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMubWFwTW91c2VPdmVyLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3ZlcicsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwTW91c2VPdmVyLmVtaXQoZXZ0KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50cy5tYXBNb3VzZU91dC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW91dCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwTW91c2VPdXQuZW1pdChldnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1hcENvbnRleHRNZW51Lm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGV2ZW50cy5tYXBDb250ZXh0TWVudS5lbWl0KGV2dCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMubWFwVG91Y2hTdGFydC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaHN0YXJ0JywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGV2ZW50cy5tYXBUb3VjaFN0YXJ0LmVtaXQoZXZ0KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50cy5tYXBUb3VjaEVuZC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGVuZCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwVG91Y2hFbmQuZW1pdChldnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1hcFRvdWNoTW92ZS5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaG1vdmUnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoTW92ZS5lbWl0KGV2dCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMubWFwVG91Y2hDYW5jZWwub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoQ2FuY2VsLmVtaXQoZXZ0KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50cy5tYXBXaGVlbC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3aGVlbCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBldmVudHMubWFwV2hlZWwuZW1pdChldnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1vdmVTdGFydC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3Zlc3RhcnQnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmVTdGFydC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1vdmUub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZS5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1vdmVFbmQub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZWVuZCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZUVuZC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1hcERyYWdTdGFydC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnRzLm1hcERyYWdTdGFydC5lbWl0KGV2dCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMubWFwRHJhZy5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGV2ZW50cy5tYXBEcmFnLmVtaXQoZXZ0KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50cy5tYXBEcmFnRW5kLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnRzLm1hcERyYWdFbmQuZW1pdChldnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnpvb21TdGFydC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tc3RhcnQnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnpvb21TdGFydC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuem9vbUV2dC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnpvb21FbmQub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbWVuZCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuem9vbUVuZC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnJvdGF0ZVN0YXJ0Lm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZXN0YXJ0JywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yb3RhdGVTdGFydC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGUnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJvdGF0ZS5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnJvdGF0ZUVuZC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVlbmQnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJvdGF0ZUVuZC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnBpdGNoU3RhcnQub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hzdGFydCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hTdGFydC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnBpdGNoRXZ0Lm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaEV2dC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnBpdGNoRW5kLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoZW5kJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaEVuZC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLmJveFpvb21TdGFydC5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tc3RhcnQnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21TdGFydC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLmJveFpvb21FbmQub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWVuZCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbUVuZC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLmJveFpvb21DYW5jZWwub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWNhbmNlbCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbUNhbmNlbC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dExvc3Qub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0bG9zdCcsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2ViR2xDb250ZXh0TG9zdC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3dlYmdsY29udGV4dHJlc3RvcmVkJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnJlbmRlci5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW5kZXInLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlbmRlci5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLm1hcEVycm9yLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2Vycm9yJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tYXBFcnJvci5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLmRhdGEub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGF0YS5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGEnLCAoZXZ0KSA9PlxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlRGF0YS5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGEub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc291cmNlZGF0YScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YS5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLmRhdGFMb2FkaW5nLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RhdGFsb2FkaW5nJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhTG9hZGluZy5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhbG9hZGluZycsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhTG9hZGluZy5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGFsb2FkaW5nJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLnN0eWxlSW1hZ2VNaXNzaW5nLm9ic2VydmVkKSB7XHJcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlaW1hZ2VtaXNzaW5nJywgKGV2dCkgPT5cclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZUltYWdlTWlzc2luZy5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnRzLmlkbGUub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignaWRsZScsIChldnQpID0+XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuaWRsZS5lbWl0KGV2dCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPIG1vdmUgdGhpcyBlbHNld2hlcmVcclxuICBwcml2YXRlIGFzc2lnbihvYmo6IGFueSwgcHJvcDogYW55LCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICBwcm9wID0gcHJvcC5zcGxpdCgnLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3AubGVuZ3RoID4gMSkge1xyXG4gICAgICBjb25zdCBlID0gcHJvcC5zaGlmdCgpO1xyXG4gICAgICB0aGlzLmFzc2lnbihcclxuICAgICAgICAob2JqW2VdID1cclxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbZV0pID09PSAnW29iamVjdCBPYmplY3RdJ1xyXG4gICAgICAgICAgICA/IG9ialtlXVxyXG4gICAgICAgICAgICA6IHt9KSxcclxuICAgICAgICBwcm9wLFxyXG4gICAgICAgIHZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvYmpbcHJvcFswXV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19