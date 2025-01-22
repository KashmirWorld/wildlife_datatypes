import "reflect-metadata";

export class Camera {
  // Base attributes
  public readonly uuid: string;
  public readonly camera_id: string;
  private latitude: number;
  private longitude: number;
  private creation_date: number;
  private last_update: number;

  // Extension attributes
  private note: string | undefined;
  private rebaits: any[];
  private terrain: string | undefined;
  private habitat: string | undefined;
  private substrate: string | undefined;
  private lures: string[] | undefined;
  private station_potential: string | undefined;

  constructor(
    uuid: string,
    camera_id: string,
    latitiude: number,
    longitude: number,
    note?: string,
    terrain?: string,
    habitat?: string,
    substrate?: string,
    lures?: string[],
    station_potential?: string
  ) {
    // Base parameters
    this.uuid = uuid;
    this.camera_id = camera_id;
    this.latitude = latitiude;
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

  private set_last_update() {
    this.last_update = Math.floor(new Date().getTime() / 1000);
  }

  public get_latitude(): number {
    return this.latitude;
  }

  public set_latitude(value: number) {
    this.latitude = value;
    this.set_last_update();
  }

  public get_longitude(): number {
    return this.longitude;
  }

  public set_longitude(value: number) {
    this.longitude = value;
    this.set_last_update();
  }

  public get_creation_date_as_date(): Date {
    return new Date(this.creation_date * 1000);
  }

  public get_last_update_as_date(): Date {
    return new Date(this.last_update * 1000);
  }

  public get_note(): string | undefined {
    return this.note;
  }

  public set_note(value: string) {
    this.note = value;
    this.set_last_update();
  }

  public get_terrain(): string | undefined {
    return this.terrain;
  }

  public set_terrain(value: string) {
    this.terrain = value;
    this.set_last_update();
  }

  public get_habitat(): string | undefined {
    return this.habitat;
  }

  public set_habitat(value: string) {
    this.habitat = value;
    this.set_last_update();
  }

  public get_substrate(): string | undefined {
    return this.substrate;
  }

  public set_substrate(value: string) {
    this.substrate = value;
    this.set_last_update();
  }

  public get_lures(): string[] | undefined {
    return this.lures;
  }

  public set_lures(value: string[]) {
    this.lures = value;
    this.set_last_update();
  }

  public get_station_potential(): string | undefined {
    return this.station_potential;
  }

  public set_station_potential(value: string) {
    this.station_potential = value;
    this.set_last_update();
  }
}
