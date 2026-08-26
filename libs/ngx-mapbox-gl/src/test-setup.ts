import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

jest.mock('mapbox-gl/esm', () => ({
  Map: jest.fn(),
}));
