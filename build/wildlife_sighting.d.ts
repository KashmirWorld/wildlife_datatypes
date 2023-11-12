export declare class WildlifeSighting {
    longitude: number;
    latitude: number;
    readonly author: string;
    note: string;
    readonly image_id: string;
    readonly time: number;
    constructor(author: string, note: string, image_id: string, longitude: number, latitude: number);
}
