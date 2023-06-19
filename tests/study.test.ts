import {Study} from "../build";
import {plainToInstance} from "class-transformer";
const assert = require('assert');
describe('Study', function () {
        describe('JSON.stringify()', function () {
            it('should return proper json', function () {
                let jsonObj = new Study("Test", 0, "");
                assert.equal(
                    JSON.stringify(jsonObj),
                    "{\"name\":\"Test\",\"project_uuid\":\""+jsonObj.project_uuid +"\",\"start_date\":"+jsonObj.start_date+",\"end_date\":" + jsonObj.end_date +",\"description\":\"\"}" )
            })
        });

        describe("JSON.parse()", function () {
            it("should return a Study object", function () {
                let studyObj = new Study("TEST", 0,"")
                let studyStr = JSON.stringify(studyObj)
                let study: Study = plainToInstance(Study,JSON.parse(studyStr) as Object);
                assert.deepEqual(study, -1)
            })
        });
});