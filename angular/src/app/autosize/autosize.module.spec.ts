import { AutosizeModule } from './autosize.module';

describe('AutosizeModule', () => {
  let autosizeModule: AutosizeModule;

  beforeEach(() => {
    autosizeModule = new AutosizeModule();
  });

  it('should create an instance', () => {
    expect(autosizeModule).toBeTruthy();
  });
});
