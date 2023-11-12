export declare class CameraStation {
    readonly id: string;
    watershed_id: string;
    readonly camera_id: string;
    images: number;
    readonly original_sd_card_id: string;
    readonly creation_date: number;
    longitude: number;
    latitiude: number;
    lures_used: Lure[];
    habitat: Habitat;
    terrain: Terrain;
    substrate: Substrate;
    readonly station_potential: StationPotential;
    note: string;
    rebaits: Rebait[];
    lastupdate: number;
    constructor(uuid: string, watershed_id: string, camera_id: string, images: number, original_sd_card_id: string, longitude: number, latitiude: number, lures_used: Lure[], habitat: Habitat, terrain: Terrain, substrate: Substrate, station_potential: StationPotential, note: string);
}
export declare enum Lure {
    Skunk_Oil = 0,
    Fish_Oil = 1,
    Castor_Oil = 2
}
export declare enum Terrain {
    Ridge = 0,
    Cliff_Base = 1,
    Draw = 2,
    Valley = 3,
    SADDLE = 4,
    PLATEAU = 5
}
export declare enum Habitat {
    Scrub = 0,
    Forest = 1,
    Pasture = 2,
    Barren = 3,
    Agric = 4
}
export declare enum Substrate {
    Sand = 0,
    Soil = 1,
    RockGravel = 2,
    Snow = 3,
    Vegetation = 4
}
export declare enum StationPotential {
    Good = 0,
    Medium = 1,
    Poor = 2
}
export declare class Rebait {
    readonly time: number;
    readonly sd_card_id: string;
    readonly author: string;
    takendown: boolean;
    sign_at_station: string;
    operational: boolean;
    note: string;
    constructor(time: number, sd_card_id: string, author: string, takendown: boolean, sign_at_station: string, operational: boolean, note: string);
}
