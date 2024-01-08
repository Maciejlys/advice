import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdviceStore } from './shared/data-access/store';
import { DiceComponent } from './shared/ui/dice/dice.component';
import { LineComponent } from './shared/ui/line/line.component';
import { SkeletonComponent } from './shared/ui/skeleton/skeleton.component';
import { BarComponent } from './shared/ui/bar/bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DiceComponent,
    LineComponent,
    SkeletonComponent,
    BarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(AdviceStore);
}
