import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get('wallet_1')!;

describe('stx-defi', () => {
  it('allows users to deposit STX', () => {
    const amount = 1000;
    const deposit = simnet.callPublicFn('defi', 'deposit', [Cl.uint(amount)], wallet1);
    expect(deposit.result).toBeOk(Cl.bool(true));
  });
});