import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdviceStore } from './shared/data-access/store';
import { DiceComponent } from './shared/ui/dice/dice.component';
import { LineComponent } from './shared/ui/line/line.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DiceComponent, LineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(AdviceStore);
}
