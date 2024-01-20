/**
 * Clock for scheduling one-shot and looping events.
 * @returns the public-facing methods necessary to queue events
 */
var Clock = (function () {
    var queuedEvents = [];
    var startedAt;
    /**
     * Iterates through each tick listener and calls methods as queued.
     * @param timestamp The current timestamp.
     */
    function tick(timestamp) {
        if (!startedAt)
            startedAt = timestamp;
        for (var _i = 0, queuedEvents_1 = queuedEvents; _i < queuedEvents_1.length; _i++) {
            var event_1 = queuedEvents_1[_i];
            if (!event_1.lastTick)
                event_1.lastTick = timestamp;
            if (timestamp - event_1.lastTick > event_1.tickDuration) {
                event_1.listener.onTick.call(event_1.listener, Clock, {
                    now: timestamp,
                    sinceStart: timestamp - startedAt,
                    deltaTime: timestamp - event_1.lastTick
                });
                event_1.lastTick = timestamp;
            }
        }
        queuedEvents = queuedEvents.filter(function (event) { return !event.isFinished; }); // filter out finished processes
        requestAnimationFrame(tick);
    }
    return {
        /**
         * Starts the clock.
         */
        start: function () {
            requestAnimationFrame(tick);
        },
        /**
         * Queues a method to be called on an interval.
         * @param listener A {@link Tickable} containing the method to be called each tick.
         * @param intervalDurationMilliseconds The duration in milliseconds between each method call.
         */
        addInterval: function (listener, intervalDurationMilliseconds) {
            if (intervalDurationMilliseconds === void 0) { intervalDurationMilliseconds = 0; }
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
        queue: function (listener, queueAfterMilliseconds) {
            var event = {
                'tickDuration': queueAfterMilliseconds,
                'isFinished': false,
                'listener': { onTick: function () { } },
            };
            event.listener = {
                onTick: function (sender, args) {
                    listener.onTick.call(listener, sender, args);
                    event.isFinished = true;
                }
            };
            queuedEvents.push(event);
        }
    };
})();

export { Clock };
