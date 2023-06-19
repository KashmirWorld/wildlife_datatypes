//import {Current, CurrentFile, FileEditType} from "../build";
let {plainToInstance} = require("class-transformer")
let {CurrentFile, Current, FileEditType} = require("../build")

const assert = require('assert');

describe('Enums', function () {
    describe('Chanign Enum and constructing', function () {
        it('should return proper json', function () {
            let jsonObj = new Current();
            jsonObj.addCurrentFile(new CurrentFile("/directory/name", FileEditType.Create))
            assert.equal(
                JSON.stringify(jsonObj), "{\"_files\":[{\"_location\":\"/directory/name\",\"_type\":1}]}"
            )
        })
    });

    describe("JSON.parse()", function () {
        it("should return a Study object", function () {
            let currentObj = new Current();
            currentObj.addCurrentFile(new CurrentFile("/directory/name", FileEditType.Create))
            let currentStr = JSON.stringify(currentObj)
            let study = plainToInstance(Current, JSON.parse(currentStr))
            assert.deepEqual(study, currentObj)
        })
    });
});
