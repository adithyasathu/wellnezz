export class Address {
   address: string;
   lat: number;
   lon: number;

    constructor(options: any) {
        this.address = options.address;
        this.lat = options.lat;
        this.lon = options.lon;
    }
}
