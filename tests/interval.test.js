import { jest }  from '@jest/globals';
import { Clock } from '../src/clock.ts';

jest.useFakeTimers();
test('calls the interval callback every 200 milliseconds', () => {
    const callback = jest.fn()

    Clock.addInterval({ "onTick": callback }, 200);
    Clock.start();

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(250);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(200);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(2);
});