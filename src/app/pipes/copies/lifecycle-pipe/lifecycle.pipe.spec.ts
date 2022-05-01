import { LifecyclePipe } from './lifecycle.pipe';

describe('LifecyclePipe', () => {
  it('create an instance', () => {
    const pipe = new LifecyclePipe();
    expect(pipe).toBeTruthy();
  });
});
