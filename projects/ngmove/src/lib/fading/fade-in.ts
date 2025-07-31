import { AnimationParams, createAnimation, createEnterAnimation } from '../common';

const params: AnimationParams = {
    timings: '200ms ease-out',
    startOpacity: 0,
    endOpacity: 1
}

export const fadeInAnimation = createAnimation(params);

export const fadeInOnEnterAnimation = (params?: AnimationParams & { triggerName?: string }) => {
    return createEnterAnimation(params?.triggerName ?? 'fadeInOnEnter', { ...params, ...params });
}
