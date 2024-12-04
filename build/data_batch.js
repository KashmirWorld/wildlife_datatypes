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
        this.detected_classes = [];
        this.confidence_threshold = 0.7;
    }
    // Fetch creation date
    get_date_as_date() {
        return new Date(this.date * 1000);
    }
    // Fetch total number of images
    get_num_images() {
        return this.image_IDs.length;
    }
    // Convert image ID to image path
    get_path_by_image_id(image_ID) {
        return this.study_name + "/data/" + this.uuid + "/image_" + image_ID;
    }
    // Convert image path to image ID
    get_image_id_by_path(image_path) {
        return image_path.replace(this.study_name + "/data/" + this.uuid + "/image_", "");
    }
    // Fetch all image IDs for a specific class
    get_image_IDs_by_class(class_ID) {
        let image_IDs = [];
        // Iterate over all image_IDs
        for (const image_ID of this.image_IDs) {
            // Iterate over all associated detections
            for (const boundingBox of this.detections[image_ID]) {
                // Check if the detection contains the correct class_ID
                if (boundingBox.class_ID == class_ID) {
                    // Store the image_ID, if not already included
                    if (!image_IDs.includes(image_ID)) {
                        image_IDs.push(image_ID);
                    }
                }
            }
        }
        return image_IDs;
    }
    // Fetch all image paths for a specific class
    get_image_paths_by_class(class_id) {
        const image_IDs = this.get_image_IDs_by_class(class_id);
        const image_paths = image_IDs.map((image_ID) => this.get_path_by_image_id(image_ID));
        return image_paths;
    }
    // Fetch all detected classes
    get_detected_classes() {
        return this.detected_classes;
    }
    // Fetch the number of classes detected
    get_num_detected_classes() {
        return this.get_detected_classes().length;
    }
    // Fetch all detections for a specific class
    get_detections_by_class(class_ID) {
        let detections = [];
        // Iterate over all image_IDs
        for (const image_ID of this.image_IDs) {
            // Iterate over all associated detections
            for (const boundingBox of this.detections[image_ID]) {
                // Check if the detection contains the correct class_ID
                if (boundingBox.class_ID == class_ID) {
                    // Store the detection, if not already included
                    if (!detections.includes(boundingBox)) {
                        detections.push(boundingBox);
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
        (_a = this.image_IDs) === null || _a === void 0 ? void 0 : _a.forEach((image_ID) => {
            var _a;
            (_a = this.detections[image_ID]) === null || _a === void 0 ? void 0 : _a.forEach((detection) => {
                confidenceScores.push(detection.confidence);
            });
        });
        return Number(confidenceScores.reduce((partialSum, current) => partialSum + current, 0) / confidenceScores.length);
    }
    // Add detections associated with an image ID (keeps existing detections)
    add_detections(image_ID, detections) {
        // Initialize a detections array for this image_ID, if nonexistent
        if (!this.detections[image_ID]) {
            this.detections[image_ID] = [];
        }
        // Add new detections to the array
        this.detections[image_ID].push(...detections);
    }
    // Set detections associated with an image ID (replaces existing detections)
    set_detections(image_ID, detections) {
        // Create a list of all class IDs that were present in the old detections
        let old_class_IDs = [];
        for (const class_ID of this.detections[image_ID].map((boundingBox) => boundingBox.class_ID)) {
            if (!old_class_IDs.includes(class_ID)) {
                old_class_IDs.push(class_ID);
            }
        }
        // Create a list of all class IDs that are no longer present in the new detections
        let deleted_class_IDs = old_class_IDs;
        for (const class_ID of detections.map((boundingBox) => boundingBox.class_ID)) {
            if (deleted_class_IDs.includes(class_ID)) {
                deleted_class_IDs = deleted_class_IDs.filter((item) => item !== class_ID);
            }
        }
        // Update the detections associated with this image
        this.detections[image_ID] = detections;
        // Check if (after the update) the class IDs removed from this image are still present in other images
        for (const class_ID of deleted_class_IDs) {
            if (this.get_num_detections_by_class(class_ID) > 0) {
                deleted_class_IDs = deleted_class_IDs.filter((item) => item !== class_ID);
            }
        }
        // Remove class IDs that are no longer present from the detected classes
        this.detected_classes = this.detected_classes.filter((class_ID) => !deleted_class_IDs.includes(class_ID));
    }
    // Remove all detections associated with an image ID
    remove_detections(image_ID) {
        for (const detection of this.detections[image_ID]) {
            this.remove_detection(image_ID, detection);
        }
    }
    // Remove a specific detection associated with an image ID
    remove_detection(image_ID, provided_detection) {
        // Get index of the provided detection (-1 if not present)
        let index = this.detections[image_ID].indexOf(provided_detection);
        // Remove the provided detection if present
        if (index > -1) {
            this.detections[image_ID].splice(index, 1);
        }
        // Check if (after removing the detection) the class ID from the provided detection still present in other detections
        if (this.get_num_detections_by_class(provided_detection.class_ID) == 0) {
            this.detected_classes = this.detected_classes.filter((class_ID) => class_ID !== provided_detection.class_ID);
        }
    }
    // Remove all detections from databatch
    remove_all_detections() {
        this.detections = {};
        this.detected_classes = [];
    }
}
exports.DataBatch = DataBatch;
