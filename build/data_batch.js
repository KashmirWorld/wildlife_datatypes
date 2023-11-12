"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBatch = void 0;
require("reflect-metadata");
class DataBatch {
    constructor(uuid, author, study_name, camera_station_id, note) {
        this.uuid = uuid;
        this.date = Math.floor(new Date().getTime() / 1000);
        this.author = author;
        this.study_name = study_name;
        this.camera_station_id = camera_station_id;
        this.note = note;
        this.image_IDs = [];
        this.detections = {};
        this.class_detections = {};
    }
    ;
    get_date_as_date() {
        return new Date(this.date * 1000);
    }
    get_num_images() {
        return this.image_IDs.length;
    }
    get_image_IDs_by_class(class_id) {
        return this.class_detections[class_id];
    }
    get_image_paths_by_class(class_id) {
        return this.class_detections[class_id].map((image_ID) => { return this.pathFromImageID(image_ID); });
    }
    add_detections(image_ID, detections) {
        this.detections[image_ID] = detections;
        for (const detection of detections) {
            const class_ID = detection[5];
            if (this.class_detections[class_ID]) {
                if (!this.class_detections[class_ID].includes(image_ID)) {
                    this.class_detections[class_ID] = [...this.class_detections[class_ID], image_ID];
                }
            }
            else {
                this.class_detections[class_ID] = [image_ID];
            }
        }
    }
    imageIDFromPath(image_path) {
        return image_path.replace(this.study_name + "/data/" + this.uuid + "/image_", "");
    }
    pathFromImageID(image_ID) {
        return this.study_name + "/data/" + this.uuid + "/image_" + image_ID;
    }
}
exports.DataBatch = DataBatch;
;
