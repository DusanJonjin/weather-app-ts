interface GeoLocationDetails {
    lat: string;
    lon: string;
    display_name: string;
    place_id: string;
    boundingbox: string[];
    [key: string]: string | number | string[];
}

export type GeoLocationIq = GeoLocationDetails[];