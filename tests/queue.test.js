import { jest }  from '@jest/globals';
import { Clock } from '../src/clock.ts';

jest.useFakeTimers();
test('calls the queued callback after 200 milliseconds', () => {
    const callback = jest.fn()

    Clock.queue({ "onTick": callback }, 200);
    Clock.start();

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(250);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});