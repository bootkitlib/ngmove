import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
  standalone: true,
  imports: [RouterModule]
})
export class ExamplesComponent {
}
