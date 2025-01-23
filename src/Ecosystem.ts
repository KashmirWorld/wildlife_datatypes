export class Ecosystem {
  public readonly name: string;
  private camera_extensions: CameraExtensions[];

  private terrains: string[] | undefined;
  private habitats: string[] | undefined;
  private substrates: string[] | undefined;
  private lures: string[] | undefined;
  private camera_potentials: string[] | undefined;

  constructor(
    name: string,
    camera_extensions: CameraExtensions[],
    camera_extension_params?: {
      terrains?: string[];
      habitats?: string[];
      substrates?: string[];
      lures?: string[];
      camera_potentials?: string[];
    }
  ) {
    this.name = name;
    this.camera_extensions = camera_extensions;

    // Camera extension parameters
    this.terrains = camera_extension_params?.terrains;
    this.habitats = camera_extension_params?.habitats;
    this.substrates = camera_extension_params?.substrates;
    this.lures = camera_extension_params?.lures;
    this.camera_potentials = camera_extension_params?.camera_potentials;
  }

  public get_active_camera_extensions() {
    return this.camera_extensions;
  }

  public get_inactive_camera_extensions() {
    return Object.values(CameraExtensions)
      .filter((ext) => typeof ext === "number")
      .filter(
        (ext) => !this.camera_extensions.includes(ext as CameraExtensions)
      );
  }

  public activate_camera_extension(extension: number) {
    if (!this.camera_extensions.includes(extension)) {
      this.camera_extensions.push(extension);
    }
  }

  public deactivate_camera_extension(extension: number) {
    if (this.camera_extensions.includes(extension)) {
      this.camera_extensions.splice(
        this.camera_extensions.findIndex((x) => x === extension),
        1
      );
    }
  }

  // Terrains
  public get_terrains(): string[] | undefined {
    return this.terrains;
  }

  public add_terrain(terrain: string) {
    if (this.terrains) {
      if (!this.terrains.includes(terrain)) {
        this.terrains.push(terrain);
      }
    } else {
      this.terrains = [terrain];
    }
  }

  public remove_terrain(terrain: string) {
    if (this.terrains) {
      if (this.terrains.includes(terrain)) {
        this.terrains.splice(
          this.terrains.findIndex((x) => x === terrain),
          1
        );
      }
    }
  }

  // Habitats
  public get_habitats(): string[] | undefined {
    return this.habitats;
  }

  public add_habitat(habitat: string) {
    if (this.habitats) {
      if (!this.habitats.includes(habitat)) {
        this.habitats.push(habitat);
      }
    } else {
      this.habitats = [habitat];
    }
  }

  public remove_habitat(habitat: string) {
    if (this.habitats) {
      if (this.habitats.includes(habitat)) {
        this.habitats.splice(
          this.habitats.findIndex((x) => x === habitat),
          1
        );
      }
    }
  }

  // Substrates
  public get_substrates(): string[] | undefined {
    return this.substrates;
  }

  public add_substrate(substrate: string) {
    if (this.substrates) {
      if (!this.substrates.includes(substrate)) {
        this.substrates.push(substrate);
      }
    } else {
      this.substrates = [substrate];
    }
  }

  public remove_substrate(substrate: string) {
    if (this.substrates) {
      if (this.substrates.includes(substrate)) {
        this.substrates.splice(
          this.substrates.findIndex((x) => x === substrate),
          1
        );
      }
    }
  }

  // Lures
  public get_lures(): string[] | undefined {
    return this.lures;
  }

  public add_lure(lure: string) {
    if (this.lures) {
      if (!this.lures.includes(lure)) {
        this.lures.push(lure);
      }
    } else {
      this.lures = [lure];
    }
  }

  public remove_lure(lure: string) {
    if (this.lures) {
      if (this.lures.includes(lure)) {
        this.lures.splice(
          this.lures.findIndex((x) => x === lure),
          1
        );
      }
    }
  }

  // Camera Potentials
  public get_camera_potentials(): string[] | undefined {
    return this.camera_potentials;
  }

  public add_camera_potential(camera_potential: string) {
    if (this.camera_potentials) {
      if (!this.camera_potentials.includes(camera_potential)) {
        this.camera_potentials.push(camera_potential);
      }
    } else {
      this.camera_potentials = [camera_potential];
    }
  }

  public remove_camera_potential(camera_potential: string) {
    if (this.camera_potentials) {
      if (this.camera_potentials.includes(camera_potential)) {
        this.camera_potentials.splice(
          this.camera_potentials.findIndex((x) => x === camera_potential),
          1
        );
      }
    }
  }
}

export enum CameraExtensions {
  "note",
  "rebaits",
  "terrain",
  "habitat",
  "substrate",
  "lure",
  "camera_potential",
}
