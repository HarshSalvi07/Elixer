export const Breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1100,
} as const;

export type DeviceLayout = 'phone' | 'tablet' | 'desktop';

export function getDeviceLayout(width: number): DeviceLayout {
  if (width >= Breakpoints.desktop) {
    return 'desktop';
  }

  if (width >= Breakpoints.tablet) {
    return 'tablet';
  }

  return 'phone';
}