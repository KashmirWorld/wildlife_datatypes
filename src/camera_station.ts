export class CameraStation {
    public readonly id: string
    private _watershed_id: string
    public readonly camera_id: string
    private _images: number
    public readonly original_sd_card_id: string
    public readonly creation_date: number
    private _longitude: number
    private _latitiude: number
    private _lures_used: Lure[]
    private _habitat: Habitat
    private _terrain: Terrain
    private _substrate: Substrate
    public readonly station_potential: StationPotential
    private _note: string
    public rebaits: Rebait[]
    private _lastupdate: number

    constructor(uuid: string, watershed_id: string, camera_id: string, images: number, original_sd_card_id: string, longitude: number,
                latitiude: number, lures_used: Lure[], habitat: Habitat, terrain: Terrain, substrate: Substrate,
                station_potential: StationPotential, note: string
                ) {
        this.id = uuid
        this._watershed_id = watershed_id
        this.camera_id = camera_id
        this._images = images
        this.original_sd_card_id = original_sd_card_id
        this.creation_date = Math.floor(new Date().getTime()/1000)
        this._longitude = longitude
        this._latitiude = latitiude
        this._lures_used = lures_used
        this._habitat = habitat
        this._terrain = terrain
        this._substrate = substrate
        this.station_potential = station_potential
        this._note = note
        this.rebaits = [];
        this._lastupdate = this.creation_date
    }

    public watershed_id(): string {
        return this._watershed_id
    }
    public set_watershed_id(value: string) {
        this._watershed_id = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public images(): number {
        return this._images
    }

    public set_images(value: number) {
        this._images = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public longitude(): number {
        return this._longitude
    }

    public set_longitude(value: number) {
        this._longitude = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public latitiude(): number {
        return this._latitiude
    }
    public set_latitiude(value: number) {
        this._latitiude = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public lures_used(): Lure[] {
        return this._lures_used
    }
    public set_lures_used(value: Lure[]) {
        this._lures_used = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public habitat(): Habitat {
        return this._habitat
    }
    
    public set_habitat(value: Habitat) {
        this._habitat = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public terrain(): Terrain {
        return this._terrain
    }

    public set_terrain(value: Terrain) {
        this._terrain = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public substrate(): Substrate {
        return this._substrate
    }

    public set_substrate(value: Substrate) {
        this._substrate = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public note(): string {
        return this._note
    }
    public set_note(value: string) {
        this._note = value
        this.set_lastupdate(Math.floor(new Date().getTime()/1000))
    }

    public lastupdate(): number {
        return this._lastupdate
    }

    public set_lastupdate(value: number) {
        this._lastupdate = value
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