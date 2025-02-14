import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  spacing = signal(30);
  offsetX = signal(0);
  offsetY = signal(0);
  dotRadius = signal(2);
  color = signal('#ccc');
}
