export class Detections {
    
    public readonly image_id: string
    public detections: Uint8Array | Int32Array | Float32Array
  
    constructor(image_id: string, detections: Uint8Array| Int32Array | Float32Array){
        this.image_id = image_id;
        this.detections = detections;
    };
  
    get num_detections(): number {
        return (this.detections.length / 6);
    }
  }