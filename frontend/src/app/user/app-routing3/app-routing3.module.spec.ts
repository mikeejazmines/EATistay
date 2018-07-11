import { AppRouting3Module } from './app-routing3.module';

describe('AppRouting3Module', () => {
  let appRouting3Module: AppRouting3Module;

  beforeEach(() => {
    appRouting3Module = new AppRouting3Module();
  });

  it('should create an instance', () => {
    expect(appRouting3Module).toBeTruthy();
  });
});
