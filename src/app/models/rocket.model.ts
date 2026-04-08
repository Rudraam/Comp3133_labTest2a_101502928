export interface Rocket {
  id: string;
  name: string;
  description: string;
  height: { meters: number };
  mass: { kg: number };
  first_flight: string;
  active: boolean;
}
