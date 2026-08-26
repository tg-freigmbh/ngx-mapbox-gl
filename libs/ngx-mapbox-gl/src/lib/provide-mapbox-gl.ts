import { MAPBOX_API_KEY, MAPBOX_WORKER_URL } from './map/map.service';

export function provideMapboxGL(config: {
  accessToken: string;
  workerUrl?: string;
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
  ];
}
