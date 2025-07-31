import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-examples-common',
    templateUrl: './common-example.component.html',
    standalone: true,
    imports: [CommonModule],
})
export class CommonExampleComponent {
}
