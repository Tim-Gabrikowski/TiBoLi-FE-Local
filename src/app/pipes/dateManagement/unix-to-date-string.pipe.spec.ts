import { UnixToDateStringPipe } from './unix-to-date-string.pipe';

describe('UnixToDateStringPipe', () => {
  it('create an instance', () => {
    const pipe = new UnixToDateStringPipe();
    expect(pipe).toBeTruthy();
  });
});
