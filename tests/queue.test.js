import { jest }  from '@jest/globals';
import { clock } from '../src/clock.ts';

jest.useFakeTimers();
test('calls the queued callback after 200 milliseconds', () => {
    const callback = jest.fn()

    clock.queue({ "onTick": callback }, 200);
    clock.start();

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(250);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});