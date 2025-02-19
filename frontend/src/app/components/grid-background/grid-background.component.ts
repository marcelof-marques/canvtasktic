import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { GridService } from '../../services/grid.service';

@Component({
  selector: 'app-grid-background',
  imports: [],
  templateUrl: './grid-background.component.html',
  styleUrl: './grid-background.component.css',
})
export class GridBackground implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private gridService = inject(GridService);

  @Input() set spacing(value: number) {
    this.gridService.spacing.set(value);
    this.updateBackground();
  }

  @Input() set dotRadius(value: number) {
    this.gridService.dotRadius.set(value);
    this.updateBackground();
  }

  @Input() set color(value: string) {
    this.gridService.color.set(value);
    this.updateBackground();
  }

  @Input() set offsetX(value: number) {
    this.gridService.offsetX.set(value);
    this.updateBackground();
  }

  @Input() set offsetY(value: number) {
    this.gridService.offsetY.set(value);
    this.updateBackground();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateBackground();
  }

  ngOnInit() {
    const nativeEl = this.el.nativeElement;

    this.renderer.setStyle(nativeEl, 'position', 'absolute');
    this.renderer.setStyle(nativeEl, 'top', '0');
    this.renderer.setStyle(nativeEl, 'left', '0');
    this.renderer.setStyle(nativeEl, 'width', '100%');
    this.renderer.setStyle(nativeEl, 'height', '100%');
    this.renderer.setStyle(nativeEl, 'pointer-events', 'none');
    this.updateBackground();
  }

  private updateBackground() {
    const spacing = this.gridService.spacing();
    const radius = this.gridService.dotRadius();
    const color = this.gridService.color();
    const offsetX = this.gridService.offsetX();
    const offsetY = this.gridService.offsetY();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${spacing}" height="${spacing}">
      <circle cx="${spacing / 2}" cy="${spacing / 2}" r="${radius}" fill="${color}" />
    </svg>`;

    const encodedSVG = encodeURIComponent(svg);
    const nativeEl = this.el.nativeElement;

    this.renderer.setStyle(nativeEl, 'background-image', `url("data:image/svg+xml,${encodedSVG}")`);

    this.renderer.setStyle(nativeEl, 'background-size', `${spacing}px ${spacing}px`);
    this.renderer.setStyle(nativeEl, 'background-position', `${offsetX}px ${offsetY}px`);
  }
}
