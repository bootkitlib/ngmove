import { AnimationParams, createAnimation, createEnterAnimation } from '@bootkit/ngmove/common';

const params: AnimationParams = {
    timings: '200ms ease-out',
    startTransform: 'translateY(10%)',
    endTransform: 'translateY(0)',
    startOpacity: 0,
    endOpacity: 1
}

export const fadeInLeftAnimation = createAnimation(params);

export const fadeInLeftOnEnterAnimation = (params?: AnimationParams & { triggerName?: string }) => {
    return createEnterAnimation(params?.triggerName ?? 'fadeInLeftOnEnter', { ...params, ...params });
}
