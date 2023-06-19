export class WildlifeSighting {
    public longitude: number
    public latitude: number
    public readonly author: string
    public note: string
    public readonly image_id: string
    public readonly time: number

    constructor(author: string, note: string, image_id: string, longitude: number, latitude: number) {
        this.author = author
        this.note = note
        this.image_id = image_id
        this.longitude = longitude
        this.latitude = latitude
        this.time = Math.floor(new Date().getTime()/1000)
    }
}