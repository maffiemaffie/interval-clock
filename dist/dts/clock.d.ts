/**
 * Contains the properties provided when a tick fires.
 */
interface TickEventArgs {
    /**
     * The current timestamp.
     */
    now: DOMHighResTimeStamp;
    /**
     * The time elapsed in milliseconds since the clock was started.
     */
    sinceStart: number;
    /**
     * The time elapsed in millisecond since the last tick.
     */
    deltaTime: number;
}
/**
 * An object containing a method to be called by the {@link clock} object.
 */
interface Tickable {
    /**
     * Handles a {@link clock} tick.
     * @param sender The object that called this method.
     * @param args The properties provided for handling a tick.
     */
    onTick(sender: object, args: TickEventArgs): void;
}
/**
 * Clock for scheduling one-shot and looping events.
 * @returns the public-facing methods necessary to queue events
 */
declare const clock: {
    /**
     * Starts the clock.
     */
    start: () => void;
    /**
     * Queues a method to be called on an interval.
     * @param listener A {@link Tickable} containing the method to be called each tick.
     * @param intervalDurationMilliseconds The duration in milliseconds between each method call.
     */
    addInterval: (listener: Tickable, intervalDurationMilliseconds?: number) => void;
    /**
     * Queues a method to be called once after a delay.
     * @param listener A {@link Tickable} containing the method to be called after a specified delay.
     * @param queueAfterMilliseconds The delay in milliseconds to wait before calling a specified method.
     */
    queue: (listener: Tickable, queueAfterMilliseconds: number) => void;
};
export { clock };
