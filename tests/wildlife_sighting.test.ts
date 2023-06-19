import {plainToInstance} from "class-transformer";
import {WildlifeSighting} from "../build";
const assert = require('assert');
describe('Wildlife Sighting', function () {
    describe('JSON.stringify()', function () {
        it('should return proper json', function () {
            let jsonObj = new WildlifeSighting("Jviguy", "", "", 1, 1);
            assert.equal(
                JSON.stringify(jsonObj),
                "{\"author\":\"Jviguy\",\"note\":\"\",\"image_id\":\"\",\"longitude\":1,\"latitude\":1,\"time\":" + jsonObj.time + "}")
        });
    });

    describe("JSON.parse()", function () {
        it("should return a Study object", function () {
            let sightingObj = new WildlifeSighting("Jviguy", "", "", 1,1);
            let sightingStr = JSON.stringify(sightingObj)
            let sighting: WildlifeSighting = plainToInstance(WildlifeSighting,JSON.parse(sightingStr) as Object);
            assert.deepEqual(sighting, sightingObj)
        })
    });
});