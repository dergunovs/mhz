import type { IUserToken } from 'mhz-contracts';

export function decodeToken(decode?: (token: string) => IUserToken | null, authorizationHeader?: string) {
  const token = authorizationHeader ? authorizationHeader.split('Bearer ')[1] : undefined;

  return token && decode ? decode(token) : null;
}
