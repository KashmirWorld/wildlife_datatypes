import "reflect-metadata";
import { BoundingBox } from "./bounding_box";
export declare class DataBatch {
    readonly uuid: string;
    readonly date: number;
    readonly author: string;
    readonly study_name: string;
    readonly camera_station_id: string;
    note: string;
    image_IDs: string[];
    detections: {
        [image_id: string]: BoundingBox[];
    };
    detected_classes: number[];
    confidence_threshold: number;
    constructor(uuid: string, author: string, study_name: string, camera_station_id: string, note: string);
    get_date_as_date(): Date;
    get_num_images(): number;
    get_path_by_image_id(image_ID: string): string;
    get_image_id_by_path(image_path: string): string;
    get_image_IDs_by_class(class_ID: number): string[];
    get_image_paths_by_class(class_id: number): string[];
    get_detected_classes(): number[];
    get_num_detected_classes(): number;
    get_detections_by_class(class_ID: number): BoundingBox[];
    get_num_detections_by_class(class_ID: number): number;
    get_num_detections(): number;
    get_avg_confidence_score(): number;
    add_detections(image_ID: string, detections: BoundingBox[]): void;
    set_detections(image_ID: string, detections: BoundingBox[]): void;
    remove_detections(image_ID: string): void;
    remove_detection(image_ID: string, provided_detection: BoundingBox): void;
    remove_all_detections(): void;
}
