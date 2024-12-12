import { initSimnet } from '@hirosystems/clarinet-sdk';
import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get('wallet_1')!;

describe('stx-defi', () => {
  it('allows users to deposit STX', () => {
    const amount = 1000;
    const deposit = simnet.callPublicFn('defi', 'deposit', [Cl.uint(amount)], wallet1);
    expect(deposit.result).toBeOk(Cl.bool(true));

    const totalDeposits = simnet.getDataVar('defi', 'total-deposits');
    expect(totalDeposits).toBeUint(amount);

    const balance = simnet.callReadOnlyFn('defi', 'get-balance-by-sender', [], wallet1);
    expect(balance.result).toBeOk(
      Cl.some(
        Cl.tuple({
          amount: Cl.uint(amount),
        })
      )
    );
  });
});