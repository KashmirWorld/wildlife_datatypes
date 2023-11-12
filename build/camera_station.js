"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rebait = exports.StationPotential = exports.Substrate = exports.Habitat = exports.Terrain = exports.Lure = exports.CameraStation = void 0;
class CameraStation {
    constructor(uuid, watershed_id, camera_id, images, original_sd_card_id, longitude, latitiude, lures_used, habitat, terrain, substrate, station_potential, note) {
        this.id = uuid;
        this.watershed_id = watershed_id;
        this.camera_id = camera_id;
        this.images = images;
        this.original_sd_card_id = original_sd_card_id;
        this.creation_date = Math.floor(new Date().getTime() / 1000);
        this.longitude = longitude;
        this.latitiude = latitiude;
        this.lures_used = lures_used;
        this.habitat = habitat;
        this.terrain = terrain;
        this.substrate = substrate;
        this.station_potential = station_potential;
        this.note = note;
        this.rebaits = [];
        this.lastupdate = this.creation_date;
    }
}
exports.CameraStation = CameraStation;
var Lure;
(function (Lure) {
    Lure[Lure["Skunk_Oil"] = 0] = "Skunk_Oil";
    Lure[Lure["Fish_Oil"] = 1] = "Fish_Oil";
    Lure[Lure["Castor_Oil"] = 2] = "Castor_Oil";
})(Lure || (exports.Lure = Lure = {}));
var Terrain;
(function (Terrain) {
    Terrain[Terrain["Ridge"] = 0] = "Ridge";
    Terrain[Terrain["Cliff_Base"] = 1] = "Cliff_Base";
    Terrain[Terrain["Draw"] = 2] = "Draw";
    Terrain[Terrain["Valley"] = 3] = "Valley";
    Terrain[Terrain["SADDLE"] = 4] = "SADDLE";
    Terrain[Terrain["PLATEAU"] = 5] = "PLATEAU";
})(Terrain || (exports.Terrain = Terrain = {}));
var Habitat;
(function (Habitat) {
    Habitat[Habitat["Scrub"] = 0] = "Scrub";
    Habitat[Habitat["Forest"] = 1] = "Forest";
    Habitat[Habitat["Pasture"] = 2] = "Pasture";
    Habitat[Habitat["Barren"] = 3] = "Barren";
    Habitat[Habitat["Agric"] = 4] = "Agric";
})(Habitat || (exports.Habitat = Habitat = {}));
var Substrate;
(function (Substrate) {
    Substrate[Substrate["Sand"] = 0] = "Sand";
    Substrate[Substrate["Soil"] = 1] = "Soil";
    Substrate[Substrate["RockGravel"] = 2] = "RockGravel";
    Substrate[Substrate["Snow"] = 3] = "Snow";
    Substrate[Substrate["Vegetation"] = 4] = "Vegetation";
})(Substrate || (exports.Substrate = Substrate = {}));
var StationPotential;
(function (StationPotential) {
    StationPotential[StationPotential["Good"] = 0] = "Good";
    StationPotential[StationPotential["Medium"] = 1] = "Medium";
    StationPotential[StationPotential["Poor"] = 2] = "Poor";
})(StationPotential || (exports.StationPotential = StationPotential = {}));
class Rebait {
    constructor(time, sd_card_id, author, takendown, sign_at_station, operational, note) {
        this.time = time;
        this.sd_card_id = sd_card_id;
        this.author = author;
        this.takendown = takendown;
        this.sign_at_station = sign_at_station;
        this.operational = operational;
        this.note = note;
    }
}
exports.Rebait = Rebait;
