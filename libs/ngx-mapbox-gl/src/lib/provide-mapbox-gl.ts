import {
  MAPBOX_API_KEY,
  MAPBOX_WORKER_CLASS,
  MAPBOX_WORKER_URL,
} from './map/map.service';

export function provideMapboxGL(config: {
  accessToken: string;
  workerUrl?: string;
  workerClass?: new () => Worker;
}) {
  return [
    {
      provide: MAPBOX_API_KEY,
      useValue: config.accessToken,
    },
    {
      provide: MAPBOX_WORKER_URL,
      useValue: config.workerUrl ?? null,
    },
    {
      provide: MAPBOX_WORKER_CLASS,
      useValue: config.workerClass ?? null,
    },
  ];
}
