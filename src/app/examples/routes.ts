import { Route } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./examples.component').then(m => m.ExamplesComponent),
    },
    {
        path: 'fading',
        loadComponent: () => import('./fading/fading-example.component').then(m => m.FadingExampleComponent),
    },
] satisfies Route[];
