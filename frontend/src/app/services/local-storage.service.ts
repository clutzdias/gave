import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public set(key: string, value: any){
    if (this.storage){
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  public get(key: string): any {
    let value;
    if (this.storage) {
      value = this.storage.getItem(key);
      if (typeof value === 'string'){
        return JSON.parse(value);
      }
    }
    return null;
  }

  public remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  public clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }




}
