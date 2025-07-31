import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeInLeftAnimation } from '@bootkit/ngmove';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
  standalone: true,
  imports: [RouterModule],
  animations: [
    fadeInLeftAnimation
  ]
})
export class ExamplesComponent {
}
