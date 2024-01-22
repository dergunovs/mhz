import { describe, expect, test, vi } from 'vitest';

import { decodeToken } from './decodeToken.js';

describe('decodeToken', () => {
  test('decodes token', async () => {
    const decode = vi.fn().mockImplementation((token: string) => token);
    const token = 'Bearer 123';
    const tokenWithoutBearer = token.split('Bearer ')[1];

    const decodedToken = decodeToken(decode, token);

    expect(decode).toBeCalledTimes(1);
    expect(decode).toBeCalledWith(tokenWithoutBearer);

    expect(decodedToken).toEqual(tokenWithoutBearer);
  });

  test('returns null without args', async () => {
    const decodedToken = decodeToken();

    expect(decodedToken).toEqual(null);
  });
});
