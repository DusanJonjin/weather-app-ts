interface GeoLocationDetails {
    lat: string;
    lon: string;
    display_name: string;
    boundingbox: string[];
    [key: string]: string | number | string[];
}

export type GeoLocationIq = GeoLocationDetails[];