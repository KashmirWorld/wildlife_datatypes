export class CurrentFile {
    private readonly _location: string
    private readonly _type: FileEditType

    constructor(location: string, type: FileEditType) {
        this._location =location
        this._type = type
    }

    get location(){
        return this._location
    }

    get type(){
        return this._type
    }

    toJSON(){
        return {
            _location: this._location,
            _type: this._type
        }
    }
}

export enum FileEditType {
    Edit,
    Create
}

export class Current {
    private readonly _files: CurrentFile[]

    constructor() {
        this._files = []
    }

    get files(): CurrentFile[] {
        return this._files
    }

    // Adds the current file if it doesn't exist or replaces it if it does
    addCurrentFile(file: CurrentFile){
        for(let [i, _file] of this._files.entries()){
            if(_file.location == file.location){
                this._files[i] = file
                return
            }
        }
        this._files.push(file)
    }
}
