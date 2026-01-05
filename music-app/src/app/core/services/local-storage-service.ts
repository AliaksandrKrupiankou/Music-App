import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  set(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key:string){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null
  }

  clear(){
    localStorage.clear();
  }
}
