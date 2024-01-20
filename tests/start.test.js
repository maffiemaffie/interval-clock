import { jest }  from '@jest/globals';
import { Clock } from '../src/clock.ts';

jest.useFakeTimers();
test('calls the queued callback after 200 milliseconds', () => {
    const callback = jest.fn()

    Clock.queue({ "onTick": callback }, 0);
    expect(callback).not.toBeCalled();

    Clock.start();
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});