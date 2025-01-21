"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
class Camera {
    constructor(uuid, cameraID, latitiude, longitude, note, terrain, habitat, substrate, lures, stationPotential) {
        // Base constructor
        this.uuid = uuid;
        this.cameraID = cameraID;
        this.latitude = latitiude;
        this.longitude = longitude;
        this.creationDate = Math.floor(new Date().getTime() / 1000);
        this.lastUpdate = this.creationDate;
        // Rebait extension constructor
        this.rebaits = [];
        // Note extension constructor
        this.note = note;
        // Terrain extension constructor
        this.terrain = terrain;
        // Habitat extension constructor
        this.habitat = habitat;
        // Substrate extension constructor
        this.substrate = substrate;
        // Lure extension constructor
        this.lures = lures;
        // StationPotential extension constructor
        this.stationPotential = stationPotential;
    }
    // Base methods: latitude
    get_latitude() {
        return this.latitude;
    }
    set_latitude(value) {
        this.latitude = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // Base methods: longitude
    get_longitude() {
        return this.longitude;
    }
    set_longitude(value) {
        this.longitude = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // Base methods: creationDate
    get_creationDate() {
        return this.creationDate;
    }
    // Base methods: lastUpdate
    get_lastupdate() {
        return this.lastUpdate;
    }
    get_lastupdate_as_date() {
        return new Date(this.lastUpdate);
    }
    set_lastupdate(value) {
        this.lastUpdate = value;
    }
    // Note extension methods
    get_note() {
        return this.note;
    }
    set_note(value) {
        this.note = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // Terrain extension methods
    get_terrain() {
        return this.terrain;
    }
    set_terrain(value) {
        this.terrain = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // Habitat extension methods
    get_habitat() {
        return this.habitat;
    }
    set_habitat(value) {
        this.habitat = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // Substrate extension methods
    get_substrate() {
        return this.substrate;
    }
    set_substrate(value) {
        this.substrate = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // Lure extension methods
    get_lures() {
        return this.lures;
    }
    set_lures(value) {
        this.lures = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
    // StationPotential extension methods
    get_station_potential() {
        return this.stationPotential;
    }
    set_station_potential(value) {
        this.stationPotential = value;
        this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
    }
}
exports.Camera = Camera;
