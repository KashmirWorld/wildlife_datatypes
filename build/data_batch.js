"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
require("reflect-metadata");
class Batch {
    constructor(uuid, study_name, camera_id, author_uuid, confidence_threshold) {
        this.uuid = uuid;
        this.study_name = study_name;
        this.camera_id = camera_id;
        this.author_uuid = author_uuid;
        this.creation_date = Math.floor(new Date().getTime() / 1000);
        this.confidence_threshold = confidence_threshold;
        this.image_ids = [];
        this.detections = {};
        this.detected_classes = [];
    }
    get_study_name() {
        return this.study_name;
    }
    get_camera_id() {
        return this.camera_id;
    }
    get_author_uuid() {
        return this.author_uuid;
    }
    get_creation_date() {
        return new Date(this.creation_date * 1000);
    }
    get_confidence_threshold() {
        return this.confidence_threshold;
    }
    set_confidence_threshold(confidence_threshold) {
        if (confidence_threshold >= 0 && confidence_threshold <= 1) {
            this.confidence_threshold = confidence_threshold;
        }
    }
    get_num_images() {
        return this.image_ids.length;
    }
    get_detected_classes() {
        return this.detected_classes;
    }
    get_num_detected_classes() {
        return this.get_detected_classes().length;
    }
    // Convert image_id to image path
    get_path_by_image_id(image_id) {
        return this.study_name + "/data/" + this.uuid + "/image_" + image_id;
    }
    // Convert image path to image_id
    get_image_id_by_path(image_path) {
        return image_path.replace(this.study_name + "/data/" + this.uuid + "/image_", "");
    }
    // Fetch all image IDs for a specific class
    get_image_ids_by_class(class_id) {
        let image_ids = [];
        // Iterate over all image_ids
        for (const image_id of this.image_ids) {
            // Iterate over all associated detections
            for (const detection of this.detections[image_id]) {
                // Check if the detection contains the correct class_id
                if (detection.class_id == class_id) {
                    // Store the image_id, if not already included
                    if (!image_ids.includes(image_id)) {
                        image_ids.push(image_id);
                    }
                }
            }
        }
        return image_ids;
    }
    // Fetch all image paths for a specific class
    get_image_paths_by_class(class_id) {
        const image_ids = this.get_image_ids_by_class(class_id);
        const image_paths = image_ids.map((image_id) => this.get_path_by_image_id(image_id));
        return image_paths;
    }
    // Fetch all detections for a specific class
    get_detections_by_class(class_id) {
        let detections = [];
        // Iterate over all image_ids
        for (const image_id of this.image_ids) {
            // Iterate over all associated detections
            for (const detection of this.detections[image_id]) {
                // Check if the detection contains the correct class_id
                if (detection.class_id == class_id) {
                    // Store the detection, if not already included
                    if (!detections.includes(detection)) {
                        detections.push(detection);
                    }
                }
            }
        }
        return detections;
    }
    // Fetch the number of detections for a specific class
    get_num_detections_by_class(class_ID) {
        return this.get_detections_by_class(class_ID).length;
    }
    // Fetch the total number of detections
    get_num_detections() {
        return this.get_detected_classes().reduce((partialSum, class_ID) => partialSum + this.get_num_detections_by_class(class_ID), 0);
    }
    // Fetch the confidence score averaged over all detections
    get_avg_confidence_score() {
        var _a;
        const confidenceScores = [];
        (_a = this.image_ids) === null || _a === void 0 ? void 0 : _a.forEach((image_id) => {
            var _a;
            (_a = this.detections[image_id]) === null || _a === void 0 ? void 0 : _a.forEach((detection) => {
                confidenceScores.push(detection.confidence);
            });
        });
        return Number(confidenceScores.reduce((partialSum, current) => partialSum + current, 0) / confidenceScores.length);
    }
    // Add detections associated with an image ID (keeps existing detections)
    add_detections(image_id, detections) {
        // Initialize a this.detections array for this image_id, if nonexistent
        if (!this.detections[image_id]) {
            this.detections[image_id] = [];
        }
        // Add new detections to this.detections
        this.detections[image_id].push(...detections);
        // Add new classes to this.detected_classes
        for (const detection of detections) {
            if (!this.detected_classes.includes(detection.class_id)) {
                this.detected_classes.push(detection.class_id);
            }
        }
    }
    // Set detections associated with an image_id (replaces existing detections)
    set_detections(image_id, detections) {
        // Update the this.detections array for this image
        this.detections[image_id] = detections;
        // Add classes to this.detected_classes
        for (const detection of detections) {
            if (!this.detected_classes.includes(detection.class_id)) {
                this.detected_classes.push(detection.class_id);
            }
        }
        // Check if any class_ids no longer have associated detections
        for (const class_id of this.get_detected_classes()) {
            if (!(this.get_num_detections_by_class(class_id) > 0)) {
                this.detected_classes.filter((item) => item !== class_id);
            }
        }
    }
    // Remove all detections associated with an image_id
    remove_detections(image_id) {
        for (const detection of this.detections[image_id]) {
            this.remove_detection(image_id, detection);
        }
    }
    // Remove a specific detection associated with an image_id
    remove_detection(image_id, provided_detection) {
        // Get index of the provided detection (-1 if not present)
        let index = this.detections[image_id].indexOf(provided_detection);
        // Remove the provided detection if present
        if (index > -1) {
            this.detections[image_id].splice(index, 1);
        }
        // Check if the class_id from the provided detection is still present in other detections
        if (this.get_num_detections_by_class(provided_detection.class_id) == 0) {
            this.detected_classes = this.detected_classes.filter((class_id) => class_id !== provided_detection.class_id);
        }
    }
    // Remove all detections from databatch
    remove_all_detections() {
        this.detections = {};
        this.detected_classes = [];
    }
}
exports.Batch = Batch;
