import { AnimationParams, createAnimation, createLeaveAnimation } from '../common';

const params: AnimationParams = {
    timings: '200ms ease-out',
    // startTransform: 'translateY(10%)',
    // endTransform: 'translateY(0)',
    startOpacity: 0,
    endOpacity: 1
}

export const fadeOutAnimation = createAnimation(params);

export const fadeOutOnLeaveAnimation = (params?: AnimationParams & { triggerName?: string }) => {
    return createLeaveAnimation(params?.triggerName ?? 'fadeOutOnLeave', { ...fadeOutAnimation, ...params });
}
