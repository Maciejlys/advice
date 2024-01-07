import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  get randomWidth() {
    return this.randomNumber * 100 * 1.5;
  }

  get randomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  get randomArray() {
    return new Array(this.randomNumber);
  }
}
