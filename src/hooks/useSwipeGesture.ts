import { useRef, useEffect, RefObject } from 'react';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

interface SwipeGestureOptions {
    onSwipe?: (direction: SwipeDirection) => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
    velocityThreshold?: number;
}

export const useSwipeGesture = <T extends HTMLElement>(
    options: SwipeGestureOptions = {}
): RefObject<T> => {
    const {
        onSwipe,
        onSwipeUp,
        onSwipeDown,
        onSwipeLeft,
        onSwipeRight,
        threshold = 50,
        velocityThreshold = 0.3,
    } = options;

    const elementRef = useRef<T>(null);
    const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            touchStart.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now(),
            };
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStart.current) return;

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStart.current.x;
            const deltaY = touch.clientY - touchStart.current.y;
            const deltaTime = Date.now() - touchStart.current.time;

            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            // Calculate velocity
            const velocity = Math.max(absX, absY) / deltaTime;

            // Determine if swipe threshold is met
            if (Math.max(absX, absY) >= threshold && velocity >= velocityThreshold) {
                let direction: SwipeDirection;

                if (absX > absY) {
                    direction = deltaX > 0 ? 'right' : 'left';
                } else {
                    direction = deltaY > 0 ? 'down' : 'up';
                }

                onSwipe?.(direction);

                switch (direction) {
                    case 'up':
                        onSwipeUp?.();
                        break;
                    case 'down':
                        onSwipeDown?.();
                        break;
                    case 'left':
                        onSwipeLeft?.();
                        break;
                    case 'right':
                        onSwipeRight?.();
                        break;
                }
            }

            touchStart.current = null;
        };

        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold, velocityThreshold]);

    return elementRef;
};
