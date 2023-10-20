import { jest }  from '@jest/globals';
import { clock } from '../src/clock.ts';

jest.useFakeTimers();
test('calls the interval callback every 200 milliseconds', () => {
    const callback = jest.fn()

    clock.addInterval({ "onTick": callback }, 200);
    clock.start();

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(250);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(200);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(2);
});