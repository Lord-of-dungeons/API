import { Address } from "@entities/Address";

export interface IAddress {
  city: string;
  zip_code: string;
  num_address: number;
  street: string;
  country: string;
}

class _Address {
  private _address: null | IAddress;

  constructor(address: null | IAddress) {
    this._address = address;
  }

  public create(): Address | null {
    if (!Boolean(this._address)) return null;

    // on instancie une nouvelle adresse
    const address = new Address();
    address.city = this._address.city;
    address.zipCode = this._address.zip_code;
    address.country = this._address.country;
    address.street = this._address.street;
    address.numAddress = this._address.num_address;

    return address;
  }
}

export default _Address;
