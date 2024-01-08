import { Component, Input, computed, signal } from '@angular/core';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarComponent {
  @Input() width: number | undefined = undefined;
  @Input() height: number | undefined = undefined;
  randomNumber = signal(Math.floor(Math.random() * 3) + 1);
  randomWidth = computed(() => this.randomNumber() * 100 * 1.5);
}
