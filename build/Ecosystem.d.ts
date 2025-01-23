export declare class Ecosystem {
    readonly name: string;
    private camera_extensions;
    private terrains;
    private habitats;
    private substrates;
    private lures;
    private camera_potentials;
    constructor(name: string, camera_extensions: CameraExtensions[], camera_extension_params?: {
        terrains?: string[];
        habitats?: string[];
        substrates?: string[];
        lures?: string[];
        camera_potentials?: string[];
    });
    get_active_camera_extensions(): CameraExtensions[];
    get_inactive_camera_extensions(): (string | CameraExtensions)[];
    activate_camera_extension(extension: number): void;
    deactivate_camera_extension(extension: number): void;
    get_terrains(): string[] | undefined;
    add_terrain(terrain: string): void;
    remove_terrain(terrain: string): void;
    get_habitats(): string[] | undefined;
    add_habitat(habitat: string): void;
    remove_habitat(habitat: string): void;
    get_substrates(): string[] | undefined;
    add_substrate(substrate: string): void;
    remove_substrate(substrate: string): void;
    get_lures(): string[] | undefined;
    add_lure(lure: string): void;
    remove_lure(lure: string): void;
    get_camera_potentials(): string[] | undefined;
    add_camera_potential(camera_potential: string): void;
    remove_camera_potential(camera_potential: string): void;
}
export declare enum CameraExtensions {
    "note" = 0,
    "rebaits" = 1,
    "terrain" = 2,
    "habitat" = 3,
    "substrate" = 4,
    "lure" = 5,
    "camera_potential" = 6
}
