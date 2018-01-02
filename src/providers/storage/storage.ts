import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage
  ) {
    console.log('Hello StorageProvider Provider');
  }

  getStorage(key: string) {
    this.storage.get(key)
      .then((value) => {
        return value
      })
  }

}
