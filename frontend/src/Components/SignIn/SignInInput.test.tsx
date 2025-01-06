import SignInLogic from "./SignInLogic";
import { expect, jest, test } from '@jest/globals';

const demo = jest.fn();

test('demo', () => {
    expect(demo()).toBeUndefined();
});