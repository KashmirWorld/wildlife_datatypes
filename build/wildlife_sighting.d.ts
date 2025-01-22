export declare class Sighting {
    readonly uuid: string;
    longitude: number;
    latitude: number;
    readonly author: string;
    note: string;
    readonly image_id: string;
    readonly time: number;
    constructor(uuid: string, author: string, note: string, image_id: string, longitude: number, latitude: number);
}
