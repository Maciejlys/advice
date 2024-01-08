import { Component, computed, signal } from '@angular/core';
import { BarComponent } from './bar/bar.component';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  randomNumber = signal(Math.floor(Math.random() * 3) + 1);
  randomArray = computed(() => new Array(this.randomNumber()));
}
