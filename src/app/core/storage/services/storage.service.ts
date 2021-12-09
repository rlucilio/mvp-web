import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class StorageService {
  private storage: Storage = window.localStorage;

  constructor() {}

  set(key: string, value: string) {
    const keyCrypt = CryptoJS.MD5(key).toString();
    const valueCrypt = CryptoJS.AES.encrypt(
      value,
      environment.keyEncrypt
    ).toString();
    this.storage.setItem(keyCrypt, valueCrypt);
  }

  get(key: string) {
    const keyCrypt = CryptoJS.MD5(key).toString();
    const valueEncrypt: string | null = this.storage.getItem(
      keyCrypt.toString()
    );

    if (valueEncrypt) {
      const bytesDecrypt = CryptoJS.AES.decrypt(
        valueEncrypt,
        environment.keyEncrypt
      );
      const originalValue = bytesDecrypt.toString(CryptoJS.enc.Utf8);
      return originalValue;
    } else {
      return null;
    }
  }

  clear() {
    this.storage.clear();
  }
}
