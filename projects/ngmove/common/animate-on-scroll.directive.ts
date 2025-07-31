import { ElementRef, Renderer2, input, OnInit, PLATFORM_ID, Inject, Directive, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationBuilder, AnimationMetadata, AnimationPlayer } from '@angular/animations';

/**
 * Directive to animate elements on scroll using Angular animations.
 * It applies the specified enter and leave animations when the element becomes visible or hidden.
 * The directive is designed to work seamlessly with Angular's animation system.
 * It can be used to create engaging user interfaces that respond to scrolling behavior.
 */
@Directive({
    selector: '[ngmoveAos]',
    exportAs: '[ngmoveAos]',
    standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
    /**
     * Enter animation to be applied when the element enters the viewport.
     * This animation will be triggered when the element becomes visible.
     */
    public enterAnimation = input<AnimationMetadata>();

    /**
     * Leave animation to be applied when the element leaves the viewport.
     * This animation will be triggered when the element becomes hidden.
     */
    public leaveAnimation = input<AnimationMetadata>();

    private _isIntersecting?: boolean;
    private _isVisible?: boolean;
    private _isPlatformBrowser: boolean;
    private _observer?: IntersectionObserver;
    private _player?: AnimationPlayer;

    constructor(
        private el: ElementRef,
        private builder: AnimationBuilder,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) platform: object) {

        this._isPlatformBrowser = isPlatformBrowser(platform);
    }

    ngOnInit(): void {
        if (this._isPlatformBrowser && (this.enterAnimation() || this.leaveAnimation())) {
            this._observer = new IntersectionObserver(entries => this._intersectionCallback(entries[0]), { threshold: .5 });
            this._observer.observe(this.el.nativeElement);
        }
    }

    /**
     * Checks if the element is currently intersecting the viewport.
     * @returns Returns true if the element is currently intersecting the viewport.
     * If the platform is not a browser, it returns undefined.
     */
    public isIntersecting(): boolean | undefined {
        if (this._isPlatformBrowser) {
            return this._isIntersecting;
        }

        return undefined;
    }

    private _intersectionCallback(entry: IntersectionObserverEntry) {
        if (entry.isIntersecting && !this._isVisible) {
            this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
            this._isVisible = true;

            if (this.enterAnimation()) {
                this._animate(this.enterAnimation()!);
            }
        }

        if (!entry.isIntersecting && this._isVisible) {
            if (this.leaveAnimation()) {
                this._isVisible = false;
                this._animate(this.leaveAnimation()!, () => {
                    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
                });
            }
        }

        this._isIntersecting = entry.isIntersecting;

        console.log(entry);
    }

    private _animate(animation: AnimationMetadata, onDone?: () => void) {
        // Stop observing the element
        // this is for preventing flicker effects.
        // the animation will cause the observer callback to be called multiple times repeatedly
        this._observer!.unobserve(this.el.nativeElement);

        if (this._player) {
            this._player.destroy();
            this._player = undefined;
        }

        this._player = this.builder.build(animation).create(this.el.nativeElement);
        this._player.play();
        this._player.onDone(() => {
            if (onDone) onDone();
            this._player!.destroy();
            this._player = undefined;

            // Re-observe the element. this cause the observer callback to be called again
            this._observer!.observe(this.el.nativeElement);
        });

        console.log('animate');
    }

    ngOnDestroy(): void {
        this._observer?.disconnect();
        this._player?.destroy();
    }
}
