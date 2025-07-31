import { AnimationParams, createAnimation, createEnterAnimation } from '@bootkit/ngmove/common';

const params: AnimationParams = {
    timings: '200ms ease-out',
    startTransform: 'translateY(-10%)',
    endTransform: 'translateY(0)',
    startOpacity: 0,
    endOpacity: 1
}

export const fadeInRightAnimation = createAnimation(params);

export const fadeInRightOnEnterAnimation = (params?: AnimationParams & { triggerName?: string }) => {
    return createEnterAnimation(params?.triggerName ?? 'fadeInRightOnEnter', { ...params, ...params });
}
