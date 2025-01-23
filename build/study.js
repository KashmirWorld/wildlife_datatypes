"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Study = void 0;
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const Camera_1 = require("./Camera");
const Sighting_1 = require("./Sighting");
class Study {
    constructor(name, ecosystem, end_date, description, confidence_threshold) {
        this.name = name;
        this.ecosystem = ecosystem;
        this.start_date = Math.floor(new Date().getTime() / 1000);
        this.end_date = end_date;
        this.last_update = this.start_date;
        this.description = description;
        this.confidence_threshold = confidence_threshold;
        this.cameras = [];
        this.data_batch_uuids = [];
        this.sightings = [];
    }
    get_start_date_as_date() {
        return new Date(this.start_date * 1000);
    }
    get_end_date_as_date() {
        if (this.end_date) {
            return new Date(this.end_date * 1000);
        }
        else {
            return null;
        }
    }
    get_last_updated_as_date() {
        return new Date(this.last_update * 1000);
    }
    get_cameras() {
        return this.cameras;
    }
    get_num_cameras() {
        return this.cameras.length;
    }
    add_camera_station(camera) {
        this.cameras.push(camera);
    }
    remove_camera_station(camera) {
        this.cameras.splice(this.cameras.findIndex((x) => x.camera_id === camera.camera_id), 1);
    }
    get_camera_by_camera_id(camera_id) {
        this.cameras.forEach((camera) => {
            if (camera.camera_id == camera_id) {
                return camera;
            }
        });
        return null;
    }
    get_num_sightings() {
        return this.sightings.length;
    }
    add_sighting(sighting) {
        this.sightings.push(sighting);
    }
    remove_sighting(sighting) {
        this.sightings.splice(this.sightings.findIndex((x) => x.uuid === sighting.uuid), 1);
    }
    get_sighting_by_image_id(image_id) {
        for (let sighting of this.sightings) {
            if (sighting.image_id == image_id) {
                return sighting;
            }
        }
        return null;
    }
    verify_data_batch_uuid(data_batch_uuid) {
        return !this.data_batch_uuids.some((existing_uuid) => data_batch_uuid === existing_uuid);
    }
    add_data_batch_uuid(data_batch_uuid) {
        this.data_batch_uuids.push(data_batch_uuid);
    }
    remove_data_batch_uuid(data_batch_uuid) {
        this.data_batch_uuids.splice(this.data_batch_uuids.findIndex((x) => x === data_batch_uuid), 1);
    }
}
exports.Study = Study;
__decorate([
    (0, class_transformer_1.Type)(() => Camera_1.Camera)
], Study.prototype, "cameras", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Sighting_1.Sighting)
], Study.prototype, "sightings", void 0);
