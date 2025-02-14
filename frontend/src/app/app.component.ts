import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraggableDirective } from './directives/draggable.directive';
import { GridBackground } from './components/grid-background/grid-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DraggableDirective, GridBackground],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
