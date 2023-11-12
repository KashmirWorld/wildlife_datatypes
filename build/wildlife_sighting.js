"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildlifeSighting = void 0;
// Wildlife Sightings don't need last updated since their deleted from disk once uploaded (one way transaction)
class WildlifeSighting {
    constructor(author, note, image_id, longitude, latitude) {
        this.author = author;
        this.note = note;
        this.image_id = image_id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = Math.floor(new Date().getTime() / 1000);
    }
}
exports.WildlifeSighting = WildlifeSighting;
