import {
  computed,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  Renderer2,
  signal,
} from '@angular/core';
import { GridService } from '../services/grid.service';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective {
  private el = inject(ElementRef<HTMLElement>);
  private gridService = inject(GridService, { optional: true });

  private isDragging = signal(false);
  private startX = signal(0);
  private startY = signal(0);
  private rawOffsetX = signal(0);
  private rawOffsetY = signal(0);
  private snappedOffsetX = signal(0);
  private snappedOffsetY = signal(0);

  private transformStyle = computed(() =>
    this.isDragging()
      ? `translate(${this.rawOffsetX()}px, ${this.rawOffsetY()}px)`
      : `translate(${this.snappedOffsetX()}px, ${this.snappedOffsetY()}px)`,
  );

  constructor() {
    effect(() => {
      this.el.nativeElement.style.transform = this.transformStyle();
    });

    effect(() => {
      document.documentElement.style.userSelect = this.isDragging() ? 'none' : '';
      document.documentElement.style.cursor = this.isDragging() ? 'grabbing' : '';
    });
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    this.isDragging.set(true);
    this.startX.set(event.clientX - this.rawOffsetX());
    this.startY.set(event.clientY - this.rawOffsetY());
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.isDragging()) return;
    event.preventDefault();
    this.rawOffsetX.set(event.clientX - this.startX());
    this.rawOffsetY.set(event.clientY - this.startY());
  }

  @HostListener('document:pointerup')
  onPointerUp() {
    if (!this.isDragging()) return;
    this.isDragging.set(false);

    this.snappedOffsetX.set(this.calculateSnap(this.rawOffsetX(), 'x'));
    this.snappedOffsetY.set(this.calculateSnap(this.rawOffsetY(), 'y'));
  }

  private calculateSnap(value: number, axis: 'x' | 'y'): number {
    const spacing = this.gridService?.spacing() ?? 30;
    const offset =
      axis === 'x' ? (this.gridService?.offsetX() ?? 0) : (this.gridService?.offsetY() ?? 0);

    return Math.round((value - offset) / spacing) * spacing + offset;
  }
}
