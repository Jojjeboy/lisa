import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  generateRandomColors(nrOfColors: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < nrOfColors; i++) {
      colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
    }
    return colors;
  }

  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateUuid(): string {
    return self.crypto.randomUUID();
  }
}
