import { DaysToExpirationMsgPipe } from './days-to-expiration-msg.pipe';

describe('DaysToExpirationMsgPipe', () => {
  it('create an instance', () => {
    const pipe = new DaysToExpirationMsgPipe();
    expect(pipe).toBeTruthy();
  });
});
