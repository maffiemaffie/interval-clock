/**
 * Contains the properties provided when a tick fires.
 */
interface TickEventArgs {
    /**
     * The current timestamp.
     */
    now:DOMHighResTimeStamp;

    /**
     * The time elapsed in milliseconds since the clock was started.
     */
    sinceStart:number;

    /**
     * The time elapsed in millisecond since the last tick.
     */
    deltaTime:number;
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
    onTick(sender:object, args:TickEventArgs):void;
}

/**
 * Clock for scheduling one-shot and looping events.
 * @returns the public-facing methods necessary to queue events
 */
const clock = (function () {
    let queuedEvents:Array<TickListener> = [];
    let startedAt:DOMHighResTimeStamp;
    
    /**
     * Interal interface contains properties for managing listeners.
     */
    interface TickListener {
        /**
         * The interval duration in milliseconds between ticks.
         */
        tickDuration:number;

        /**
         * The {@link Tickable} object that contains the callback method.
         */
        listener:Tickable;

        /**
         * True if the operation is complete.
         */
        isFinished:boolean;

        /**
         * The timestamp at which the method was last called.
         */
        lastTick?:DOMHighResTimeStamp;
    }

    /**
     * Iterates through each tick listener and calls methods as queued.
     * @param timestamp The current timestamp.
     */
    function tick(timestamp:DOMHighResTimeStamp) {
        if (!startedAt) startedAt = timestamp;
        for (let event of queuedEvents) {
            if (!event.lastTick) event.lastTick = timestamp;
            if (timestamp - event.lastTick > event.tickDuration) {
                event.listener.onTick.call(event.listener, clock, {
                    now: timestamp,
                    sinceStart: timestamp - startedAt,
                    deltaTime: timestamp - event.lastTick
                });
                event.lastTick = timestamp;
            }
        }
        queuedEvents = queuedEvents.filter(event => !event.isFinished); // filter out finished processes
        requestAnimationFrame(tick);
    }

    return {
        /**
         * Starts the clock.
         */
        start: function() {
            requestAnimationFrame(tick);
        },

        /**
         * Queues a method to be called on an interval.
         * @param listener A {@link Tickable} containing the method to be called each tick.
         * @param intervalDurationMilliseconds The duration in milliseconds between each method call.
         */
        addInterval: function(listener:Tickable, intervalDurationMilliseconds:number = 0) {
            queuedEvents.push({
                'tickDuration': intervalDurationMilliseconds,
                'listener': listener,
                'isFinished': false
            });
        },

        /**
         * Queues a method to be called once after a delay.
         * @param listener A {@link Tickable} containing the method to be called after a specified delay.
         * @param queueAfterMilliseconds The delay in milliseconds to wait before calling a specified method.
         */
        queue: function(listener:Tickable, queueAfterMilliseconds:number) {
            const event:TickListener = {
                'tickDuration': queueAfterMilliseconds,
                'isFinished': false,
                'listener': {onTick:function(){}},
            };

            event.listener = {
                onTick: function(sender:object, args:TickEventArgs) {
                    listener.onTick.call(listener, sender, args);
                    event.isFinished = true;
                }
            }

            queuedEvents.push(event);
        }
    }

})();

export { clock };