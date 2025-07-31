import { style, animate, animation, trigger, transition } from '@angular/animations';

export interface AnimationParams {
    timings?: any;
    startTransform?: any;
    endTransform?: any;
    startOpacity?: any;
    endOpacity?: any;
}

export function createAnimation(params: AnimationParams) {
    return animation([
        style({ opacity: '{{startOpacity}}', transform: '{{startTransform}}' }),
        animate('{{timings}}', style({ opacity: '{{endOpacity}}', transform: '{{endTransform}}' })),
    ], { params: params });
}

export function createEnterAnimation(triggerName: string, params: AnimationParams) {
    return trigger(triggerName, [
        transition(':enter', [
            createAnimation(params)
        ])
    ]) 
}

export function createLeaveAnimation(triggerName: string, params: AnimationParams) {
    return trigger(triggerName, [
        transition(':leave', [
            createAnimation(params)
        ])
    ]) 
}
