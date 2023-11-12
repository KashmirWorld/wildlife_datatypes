import 'reflect-metadata';
export declare class DataBatch {
    readonly uuid: string;
    readonly date: number;
    readonly author: string;
    readonly study_name: string;
    readonly camera_station_id: string;
    note: string;
    image_IDs: string[];
    detections: {
        [id: string]: (Uint8Array | Float32Array | Int32Array)[];
    };
    class_detections: {
        [id: number]: string[];
    };
    constructor(uuid: string, author: string, study_name: string, camera_station_id: string, note: string);
    get_date_as_date(): Date;
    get_num_images(): number;
    get_image_IDs_by_class(class_id: number): string[];
    get_image_paths_by_class(class_id: number): string[];
    add_detections(image_ID: string, detections: (Uint8Array | Float32Array | Int32Array)[]): void;
    imageIDFromPath(image_path: string): string;
    pathFromImageID(image_ID: string): string;
}
