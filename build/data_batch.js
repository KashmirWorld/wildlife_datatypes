"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBatch = void 0;
require("reflect-metadata");
class DataBatch {
    constructor(id, author, study_name, camera_station_id, note) {
        this.id = id;
        this.date = Math.floor(new Date().getTime() / 1000);
        this.author = author;
        this.study_name = study_name;
        this.camera_station_id = camera_station_id;
        this.note = note;
        this.image_IDs = [];
        this.detections = {};
        this.class_detections = {};
        this.confidence_threshold = 0.7;
    }
    get_date_as_date() {
        return new Date(this.date * 1000);
    }
    get_num_images() {
        return this.image_IDs.length;
    }
    get_path_by_image_id(image_ID) {
        return this.study_name + "/data/" + this.id + "/image_" + image_ID;
    }
    get_image_id_by_path(image_path) {
        return image_path.replace(this.study_name + "/data/" + this.id + "/image_", "");
    }
    get_image_IDs_by_class(class_id) {
        return this.class_detections[class_id];
    }
    get_image_paths_by_class(class_id) {
        return this.get_image_IDs_by_class(class_id).map((image_ID) => this.get_path_by_image_id(image_ID));
    }
    get_detected_classes() {
        return Object.keys(this.class_detections).map((class_ID) => Number(class_ID));
    }
    get_num_detected_classes() {
        return this.get_detected_classes().length;
    }
    get_num_detections_by_class(class_id) {
        return this.class_detections[class_id].length;
    }
    get_num_detections() {
        return this.get_detected_classes().reduce((partialSum, class_id) => partialSum + this.get_num_detections_by_class(class_id), 0);
    }
    get_avg_confidence_score() {
        var _a;
        const confidenceScores = [];
        (_a = this.image_IDs) === null || _a === void 0 ? void 0 : _a.forEach((image_ID) => {
            var _a;
            (_a = this.detections[image_ID]) === null || _a === void 0 ? void 0 : _a.forEach((detection) => {
                confidenceScores.push(detection.confidence);
            });
        });
        return Number(confidenceScores.reduce((partialSum, current) => partialSum + current, 0) / confidenceScores.length);
    }
    add_detections(image_ID, detections) {
        this.detections[image_ID] = detections;
        for (const detection of detections) {
            const class_ID = detection.classID;
            if (this.class_detections[class_ID]) {
                if (!this.class_detections[class_ID].includes(image_ID)) {
                    this.class_detections[class_ID] = [
                        ...this.class_detections[class_ID],
                        image_ID,
                    ];
                }
            }
            else {
                this.class_detections[class_ID] = [image_ID];
            }
        }
    }
    remove_detection(image_ID, provided_detection) {
        // Check that the detection exists in this.detections
        let index = this.detections[image_ID].indexOf(provided_detection);
        if (index > -1) {
            // Remove detection from this.detections
            this.detections[image_ID].splice(index, 1);
        }
        // Check that there are no other detections with the same class
        const detections = this.detections[image_ID];
        if (!detections.some((detection) => detection.classID === provided_detection.classID)) {
            // Remove image_ID from this.class_detections
            const index = this.class_detections[provided_detection.classID].indexOf(image_ID);
            if (index > -1) {
                this.class_detections[provided_detection.classID].splice(index, 1);
            }
        }
    }
    remove_all_detections() {
        this.detections = {};
        this.class_detections = {};
    }
}
exports.DataBatch = DataBatch;
