import {v4 as uuidv4} from "uuid";

export class CameraStation {
    public readonly id: string
    public watershed_id: string
    public readonly camera_id: string
    public images: number
    public readonly origional_sd_card_id: string
    public readonly creation_date: number
    public longitude: number
    public latitiude: number
    public lures_used: Lure[]
    public habitat: Habitat
    public terrain: Terrain
    public substrate: Substrate
    public readonly station_potential: StationPotential
    public note: string
    public rebaits: Rebait[]

    constructor(watershed_id: string, camera_id: string, images: number, original_sd_card_id: string, longitude: number,
                latitiude: number, lures_used: Lure[], habitat: Habitat, terrain: Terrain, substrate: Substrate,
                station_potential: StationPotential, note: string
                ) {
        this.id = uuidv4()
        this.watershed_id = watershed_id
        this.camera_id = camera_id
        this.images = images
        this.origional_sd_card_id = original_sd_card_id
        this.creation_date = Math.floor(new Date().getTime()/1000)
        this.longitude = longitude
        this.latitiude = latitiude
        this.lures_used = lures_used
        this.habitat = habitat
        this.terrain = terrain
        this.substrate = substrate
        this.station_potential = station_potential
        this.note = note
        this.rebaits = [];
    }
}

export enum Lure {
    Skunk_Oil,
    Fish_Oil,
    Castor_Oil
}

export enum Terrain {
    Ridge,
    Cliff_Base,
    Draw,
    Valley,
    SADDLE,
    PLATEAU
}

export enum Habitat {
    Scrub,
    Forest,
    Pasture,
    Barren,
    Agric
}

export enum Substrate {
    Sand,
    Soil,
    RockGravel,
    Snow,
    Vegetation
}

export enum StationPotential {
    Good,
    Medium,
    Poor
}

export class Rebait {
    public readonly time: number
    public readonly sd_card_id: string
    public readonly author: string
    public takendown: boolean
    public sign_at_station: string
    public operational: boolean
    public note: string

    constructor(time: number, sd_card_id: string, author: string, takendown: boolean, sign_at_station: string, operational: boolean, note: string) {
        this.time = time
        this.sd_card_id = sd_card_id
        this.author = author
        this.takendown = takendown
        this.sign_at_station = sign_at_station
        this.operational = operational
        this.note = note
    }
}