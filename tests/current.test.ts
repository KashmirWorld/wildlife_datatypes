import {Current} from "../build";
import {plainToInstance} from "class-transformer";
const assert = require('assert');
describe('Current', function () {
    describe('JSON.stringify()', function () {
        it('should return proper json', function () {
            let jsonObj = new Current();
            assert.equal(
                JSON.stringify(jsonObj), "{\"_files\":[]}"
            )
        })
    });

    describe("JSON.parse()", function () {
        it("should return a Study object", function () {
            let currentObj = new Current();
            let currentStr = JSON.stringify(currentObj)
            let study: Current = plainToInstance(Current, JSON.parse(currentStr) as Object);
            assert.deepEqual(study, currentObj)
        })
    });
});
