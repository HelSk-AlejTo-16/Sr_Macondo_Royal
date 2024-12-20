export interface PlacesResponse {
    type: string;
    query: string[];
    features: Feature[];
    attribution: string;
  }
  
  export interface Feature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Properties;
    text_es: string;
    place_name_es: string;
    text: string;
    place_name: string;
    center: [number, number];
    geometry: Geometry;
    context: Context[];
  }
  
  interface Properties {
    wikidata?: string;
    accuracy?: string;
  }
  
  interface Geometry {
    type: string;
    coordinates: [number, number];
  }
  
  interface Context {
    id: string;
    text_es: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }