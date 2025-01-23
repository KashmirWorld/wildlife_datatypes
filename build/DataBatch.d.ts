import "reflect-metadata";
import { Detection } from "./Detection";
export declare class DataBatch {
    readonly uuid: string;
    private study_name;
    private camera_id;
    private author_uuid;
    private creation_date;
    confidence_threshold: number;
    image_ids: string[];
    detections: {
        [image_id: string]: Detection[];
    };
    detected_classes: number[];
    constructor(uuid: string, study_name: string, camera_id: string, author_uuid: string, confidence_threshold: number);
    get_study_name(): string;
    get_camera_id(): string;
    get_author_uuid(): string;
    get_creation_date(): Date;
    get_confidence_threshold(): number;
    set_confidence_threshold(confidence_threshold: number): void;
    get_num_images(): number;
    get_detected_classes(): number[];
    get_num_detected_classes(): number;
    get_path_by_image_id(image_id: string): string;
    get_image_id_by_path(image_path: string): string;
    get_image_ids_by_class(class_id: number): string[];
    get_image_paths_by_class(class_id: number): string[];
    get_detections_by_class(class_id: number): Detection[];
    get_num_detections_by_class(class_ID: number): number;
    get_num_detections(): number;
    get_avg_confidence_score(): number;
    add_detections(image_id: string, detections: Detection[]): void;
    set_detections(image_id: string, detections: Detection[]): void;
    remove_detections(image_id: string): void;
    remove_detection(image_id: string, provided_detection: Detection): void;
    remove_all_detections(): void;
}
