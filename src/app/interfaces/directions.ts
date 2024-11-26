export interface DirectionsResponse {
    routes: Route[];
    waypoints: Waypoint[];
    code: string;
    uuid: string;
  }
  
  export interface Route {
    distance: number;
    duration: number;
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
    legs: any[];
    weight: number;
    weight_name: string;
  }
  
  export interface Waypoint {
    distance: number;
    name: string;
    location: [number, number];
  }