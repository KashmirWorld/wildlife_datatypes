"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraExtensions = exports.Ecosystem = void 0;
class Ecosystem {
    constructor(name, camera_extensions, optional) {
        this.name = name;
        this.camera_extensions = camera_extensions;
        // Camera extension parameters
        this.terrains = optional === null || optional === void 0 ? void 0 : optional.terrains;
        this.habitats = optional === null || optional === void 0 ? void 0 : optional.habitats;
        this.substrates = optional === null || optional === void 0 ? void 0 : optional.substrates;
        this.lures = optional === null || optional === void 0 ? void 0 : optional.lures;
        this.camera_potentials = optional === null || optional === void 0 ? void 0 : optional.camera_potentials;
    }
    get_active_camera_extensions() {
        return this.camera_extensions;
    }
    get_inactive_camera_extensions() {
        return Object.values(CameraExtensions)
            .filter((ext) => typeof ext === "number")
            .filter((ext) => !this.camera_extensions.includes(ext));
    }
    activate_camera_extension(extension) {
        if (!this.camera_extensions.includes(extension)) {
            this.camera_extensions.push(extension);
        }
    }
    deactivate_camera_extension(extension) {
        if (this.camera_extensions.includes(extension)) {
            this.camera_extensions.splice(this.camera_extensions.findIndex((x) => x === extension), 1);
        }
    }
    // Terrains
    get_terrains() {
        return this.terrains;
    }
    add_terrain(terrain) {
        if (this.terrains) {
            if (!this.terrains.includes(terrain)) {
                this.terrains.push(terrain);
            }
        }
        else {
            this.terrains = [terrain];
        }
    }
    remove_terrain(terrain) {
        if (this.terrains) {
            if (this.terrains.includes(terrain)) {
                this.terrains.splice(this.terrains.findIndex((x) => x === terrain), 1);
            }
        }
    }
    // Habitats
    get_habitats() {
        return this.habitats;
    }
    add_habitat(habitat) {
        if (this.habitats) {
            if (!this.habitats.includes(habitat)) {
                this.habitats.push(habitat);
            }
        }
        else {
            this.habitats = [habitat];
        }
    }
    remove_habitat(habitat) {
        if (this.habitats) {
            if (this.habitats.includes(habitat)) {
                this.habitats.splice(this.habitats.findIndex((x) => x === habitat), 1);
            }
        }
    }
    // Substrates
    get_substrates() {
        return this.substrates;
    }
    add_substrate(substrate) {
        if (this.substrates) {
            if (!this.substrates.includes(substrate)) {
                this.substrates.push(substrate);
            }
        }
        else {
            this.substrates = [substrate];
        }
    }
    remove_substrate(substrate) {
        if (this.substrates) {
            if (this.substrates.includes(substrate)) {
                this.substrates.splice(this.substrates.findIndex((x) => x === substrate), 1);
            }
        }
    }
    // Lures
    get_lures() {
        return this.lures;
    }
    add_lure(lure) {
        if (this.lures) {
            if (!this.lures.includes(lure)) {
                this.lures.push(lure);
            }
        }
        else {
            this.lures = [lure];
        }
    }
    remove_lure(lure) {
        if (this.lures) {
            if (this.lures.includes(lure)) {
                this.lures.splice(this.lures.findIndex((x) => x === lure), 1);
            }
        }
    }
    // Camera Potentials
    get_camera_potentials() {
        return this.camera_potentials;
    }
    add_camera_potential(camera_potential) {
        if (this.camera_potentials) {
            if (!this.camera_potentials.includes(camera_potential)) {
                this.camera_potentials.push(camera_potential);
            }
        }
        else {
            this.camera_potentials = [camera_potential];
        }
    }
    remove_camera_potential(camera_potential) {
        if (this.camera_potentials) {
            if (this.camera_potentials.includes(camera_potential)) {
                this.camera_potentials.splice(this.camera_potentials.findIndex((x) => x === camera_potential), 1);
            }
        }
    }
}
exports.Ecosystem = Ecosystem;
var CameraExtensions;
(function (CameraExtensions) {
    CameraExtensions[CameraExtensions["note"] = 0] = "note";
    CameraExtensions[CameraExtensions["rebaits"] = 1] = "rebaits";
    CameraExtensions[CameraExtensions["terrain"] = 2] = "terrain";
    CameraExtensions[CameraExtensions["habitat"] = 3] = "habitat";
    CameraExtensions[CameraExtensions["substrate"] = 4] = "substrate";
    CameraExtensions[CameraExtensions["lure"] = 5] = "lure";
    CameraExtensions[CameraExtensions["camera_potential"] = 6] = "camera_potential";
})(CameraExtensions || (exports.CameraExtensions = CameraExtensions = {}));
