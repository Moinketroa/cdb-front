import { CustomUtilModule } from './custom-util.module';

describe('CustomUtilModule', () => {
  let customUtilModule: CustomUtilModule;

  beforeEach(() => {
    customUtilModule = new CustomUtilModule();
  });

  it('should create an instance', () => {
    expect(customUtilModule).toBeTruthy();
  });
});
