"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Study = void 0;
const camera_station_1 = require("./camera_station");
const wildlife_sighting_1 = require("./wildlife_sighting");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
class Study {
    constructor(uuid, name, end_date, description, threshold) {
        this.name = name;
        this.project_uuid = uuid;
        this.start_date = Math.floor(new Date().getTime() / 1000);
        this.end_date = end_date;
        this.description = description;
        this.threshold = threshold;
        this.camera_stations = [];
        this.wildlife_sightings = [];
        this.data_batch_uuids = [];
        this.lastupdated = this.start_date;
    }
    get_start_date_as_date() {
        return new Date(this.start_date * 1000);
    }
    get_end_date_as_date() {
        return new Date(this.end_date * 1000);
    }
    get_camera_station_by_camera_id(camera_id) {
        for (let camera_station of this.camera_stations) {
            if (camera_station.camera_id == camera_id) {
                return camera_station;
            }
        }
        return null;
    }
    get_camera_station_by_id(id) {
        let returnValue = null;
        this.camera_stations.forEach(function (camera_station) {
            if (camera_station.id == id) {
                returnValue = camera_station;
            }
        });
        return returnValue;
    }
    add_camera_station(camera_station) {
        this.camera_stations.push(camera_station);
    }
    remove_camera_station(camera_station) {
        this.camera_stations.splice(this.camera_stations.findIndex(x => x.id === camera_station.id), 1);
    }
    get_wildlife_sighting_by_image_id(image_id) {
        for (let wildlife_sighting of this.wildlife_sightings) {
            if (wildlife_sighting.image_id == image_id) {
                return wildlife_sighting;
            }
        }
        return null;
    }
    add_wildlife_sighting(wildlife_sighting) {
        this.wildlife_sightings.push(wildlife_sighting);
    }
    remove_wildlife_sighting(wildlife_sighting) {
        this.wildlife_sightings.splice(this.wildlife_sightings.indexOf(wildlife_sighting), 1);
    }
    add_data_batch_uuid(batch_uuid) {
        this.data_batch_uuids.push(batch_uuid);
    }
    remove_data_batch_uuid(batch_uuid) {
        this.data_batch_uuids.splice(this.data_batch_uuids.indexOf(batch_uuid), 1);
    }
}
exports.Study = Study;
__decorate([
    (0, class_transformer_1.Type)(() => camera_station_1.CameraStation)
], Study.prototype, "camera_stations", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => wildlife_sighting_1.WildlifeSighting)
], Study.prototype, "wildlife_sightings", void 0);
