import {v4 as uuidv4} from "uuid";
import {CameraStation} from "./camera_station";

export class Study {

    public name: string
    public readonly project_uuid: string
    public readonly start_date: number
    public end_date: number
    public description: string
	public threshold: number
    // This field refers to the date that this studies data was updated, the data being the properties above ^^
    // this doesn't include camera_stations as they house their own lastupdated property
    public lastupdated: number
    public camera_stations: Map<string,CameraStation>

    constructor(name: string, end_date: number, description: string, threshold: number) {
        this.name = name
        this.project_uuid = uuidv4()
        this.start_date = Math.floor(new Date().getTime() / 1000)
        this.end_date = end_date
        this.description = description
		this.threshold = threshold
        this.camera_stations = new Map<string,CameraStation>();
        this.lastupdated = this.start_date
    }

    get start_date_as_date(): Date {
        return new Date(this.start_date * 1000)
    }


    get end_date_as_date(): Date {
        return new Date(this.end_date * 1000)
    }

}

