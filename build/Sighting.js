"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sighting = void 0;
// Wildlife Sightings don't need last updated since their deleted from disk once uploaded (one way transaction)
class Sighting {
    constructor(uuid, author, note, image_id, longitude, latitude) {
        this.uuid = uuid;
        this.author = author;
        this.note = note;
        this.image_id = image_id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = Math.floor(new Date().getTime() / 1000);
    }
}
exports.Sighting = Sighting;
