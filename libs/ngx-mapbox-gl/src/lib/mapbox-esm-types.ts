import type {
  LayerSpecification,
  MapEventOf,
  MapEventType,
} from 'mapbox-gl/esm';

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type Layer = Pick<
  LayerSpecification,
  | 'id'
  | 'type'
  | 'source'
  | 'source-layer'
  | 'slot'
  | 'filter'
  | 'layout'
  | 'paint'
  | 'minzoom'
  | 'maxzoom'
  | 'metadata'
>;

export type LayoutSpecification = UnionToIntersection<
  NonNullable<LayerSpecification['layout']>
>;

export type PaintSpecification = UnionToIntersection<
  NonNullable<LayerSpecification['paint']>
>;

export type MapEvents = {[K in MapEventType]: MapEventOf<K>};
