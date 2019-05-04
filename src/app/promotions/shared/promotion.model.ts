import { Address } from "~/app/promotions/shared/address.model";

export class Promotion {
   id: string;
   name: string;
   imageUrl: string;
   imageStoragePath: string;
   description: string;
   shortDescription: string;
   expires: Date;
   coins: number;
   addresses: Array<Address>;
   allStores: boolean;

    constructor(options: any) {
        this.name = options.name;
        this.imageUrl = options.imageUrl;
        this.id = options.id;
        this.description = options.description;
        this.shortDescription = options.shortDescription;
        this.coins = Number(options.coins);
        this.expires = options.expires;
        this.allStores = options.allStores;
        this.addresses = options.addresses;
        this.imageStoragePath = options.imageStoragePath;
    }
}
