import {CameraStation, Habitat, Lure, StationPotential, Substrate, Terrain} from "../build";
import {plainToInstance} from "class-transformer";

const assert = require('assert');
describe('Camera Station', function () {
    describe('JSON.stringify()', function () {
        it('should return proper json', function () {
            let jsonObj = new CameraStation(
                "HD-03",
                "NFR-13",
                30,
                "YOLO",
                36.148,
                74.88,
                [Lure.Castor_Oil, Lure.Skunk_Oil],
                Habitat.Barren,
                Terrain.PLATEAU,
                Substrate.Sand,
                StationPotential.Medium,
                "Pretty good place imo"
            );
            assert.equal(
                JSON.stringify(jsonObj), "{\"id\":\"" + jsonObj.id +"\",\"watershed_id\":\"HD-03\",\"camera_id\":\"NFR-13\",\"images\":30,\"origional_sd_card_id\":\"YOLO\",\"creation_date\":" + jsonObj.creation_date +",\"longitude\":36.148,\"latitiude\":74.88,\"lures_used\":[2,0],\"habitat\":3,\"terrain\":5,\"substrate\":0,\"station_potential\":1,\"note\":\"Pretty good place imo\",\"rebaits\":[]}")
        })
    });

    describe("JSON.parse()", function () {
        it("should return a proper camera station object", function () {
            let cameraStationObj = new CameraStation(
                "HD-03",
                "NFR-13",
                30,
                "YOLO",
                36.148,
                74.88,
                [Lure.Castor_Oil, Lure.Skunk_Oil],
                Habitat.Barren,
                Terrain.PLATEAU,
                Substrate.Sand,
                StationPotential.Medium,
                "Pretty good place imo"
            );
            let cameraStationStr = JSON.stringify(cameraStationObj)
            let cameraStation: CameraStation = plainToInstance(CameraStation,JSON.parse(cameraStationStr) as Object);
            assert.deepEqual(cameraStation, cameraStationObj)
        })
    });
});
