import { AppRouting2Module } from './app-routing2.module';

describe('AppRouting2Module', () => {
  let appRouting2Module: AppRouting2Module;

  beforeEach(() => {
    appRouting2Module = new AppRouting2Module();
  });

  it('should create an instance', () => {
    expect(appRouting2Module).toBeTruthy();
  });
});
