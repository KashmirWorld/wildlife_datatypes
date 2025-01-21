export class Camera {
  // Base attributes
  public readonly uuid: string;
  public readonly cameraID: string;
  private latitude: number;
  private longitude: number;
  private creationDate: number;
  private lastUpdate: number;

  // Rebaits extension attributes
  private rebaits: any[];

  // Note extension attributes
  private note: string | undefined;

  // Terrain extension attributes
  private terrain: string | undefined;

  // Habitat extension attributes
  private habitat: string | undefined;

  // Substrate extension attributes
  private substrate: string | undefined;

  // Lure extension attributes
  private lures: string[] | undefined;

  // StationPotential extension attributes
  private stationPotential: string | undefined;

  constructor(
    uuid: string,
    cameraID: string,
    latitiude: number,
    longitude: number,
    note?: string,
    terrain?: string,
    habitat?: string,
    substrate?: string,
    lures?: string[],
    stationPotential?: string
  ) {
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
  public get_latitude(): number {
    return this.latitude;
  }
  public set_latitude(value: number) {
    this.latitude = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // Base methods: longitude
  public get_longitude(): number {
    return this.longitude;
  }
  public set_longitude(value: number) {
    this.longitude = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // Base methods: creationDate
  public get_creationDate(): number {
    return this.creationDate;
  }

  // Base methods: lastUpdate
  public get_lastupdate(): number {
    return this.lastUpdate;
  }
  public get_lastupdate_as_date(): Date {
    return new Date(this.lastUpdate);
  }
  public set_lastupdate(value: number) {
    this.lastUpdate = value;
  }

  // Note extension methods
  public get_note(): string | undefined {
    return this.note;
  }
  public set_note(value: string) {
    this.note = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // Terrain extension methods
  public get_terrain(): string | undefined {
    return this.terrain;
  }
  public set_terrain(value: string) {
    this.terrain = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // Habitat extension methods
  public get_habitat(): string | undefined {
    return this.habitat;
  }
  public set_habitat(value: string) {
    this.habitat = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // Substrate extension methods
  public get_substrate(): string | undefined {
    return this.substrate;
  }
  public set_substrate(value: string) {
    this.substrate = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // Lure extension methods
  public get_lures(): string[] | undefined {
    return this.lures;
  }
  public set_lures(value: string[]) {
    this.lures = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }

  // StationPotential extension methods
  public get_station_potential(): string | undefined {
    return this.stationPotential;
  }
  public set_station_potential(value: string) {
    this.stationPotential = value;
    this.set_lastupdate(Math.floor(new Date().getTime() / 1000));
  }
}
