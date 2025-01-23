"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
require("reflect-metadata");
class Camera {
    constructor(camera_id, latitude, longitude, note, terrain, habitat, substrate, lures, station_potential) {
        // Base parameters
        this.camera_id = camera_id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.creation_date = Math.floor(new Date().getTime() / 1000);
        this.last_update = this.creation_date;
        // Extension parameters
        this.note = note;
        this.rebaits = [];
        this.terrain = terrain;
        this.habitat = habitat;
        this.substrate = substrate;
        this.lures = lures;
        this.station_potential = station_potential;
    }
    set_last_update() {
        this.last_update = Math.floor(new Date().getTime() / 1000);
    }
    get_latitude() {
        return this.latitude;
    }
    set_latitude(value) {
        this.latitude = value;
        this.set_last_update();
    }
    get_longitude() {
        return this.longitude;
    }
    set_longitude(value) {
        this.longitude = value;
        this.set_last_update();
    }
    get_creation_date_as_date() {
        return new Date(this.creation_date * 1000);
    }
    get_last_update_as_date() {
        return new Date(this.last_update * 1000);
    }
    get_note() {
        return this.note;
    }
    set_note(value) {
        this.note = value;
        this.set_last_update();
    }
    get_terrain() {
        return this.terrain;
    }
    set_terrain(value) {
        this.terrain = value;
        this.set_last_update();
    }
    get_habitat() {
        return this.habitat;
    }
    set_habitat(value) {
        this.habitat = value;
        this.set_last_update();
    }
    get_substrate() {
        return this.substrate;
    }
    set_substrate(value) {
        this.substrate = value;
        this.set_last_update();
    }
    get_lures() {
        return this.lures;
    }
    set_lures(value) {
        this.lures = value;
        this.set_last_update();
    }
    get_station_potential() {
        return this.station_potential;
    }
    set_station_potential(value) {
        this.station_potential = value;
        this.set_last_update();
    }
}
exports.Camera = Camera;
