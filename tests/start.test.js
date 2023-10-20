import { jest }  from '@jest/globals';
import { clock } from '../src/clock.ts';

jest.useFakeTimers();
test('calls the queued callback after 200 milliseconds', () => {
    const callback = jest.fn()

    clock.queue({ "onTick": callback }, 0);
    expect(callback).not.toBeCalled();

    clock.start();
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});