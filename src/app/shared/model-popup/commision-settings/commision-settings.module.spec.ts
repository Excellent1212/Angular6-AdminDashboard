import { CommisionSettingsModule } from './commision-settings.module';

describe('CommisionSettingsModule', () => {
  let commisionSettingsModule: CommisionSettingsModule;

  beforeEach(() => {
    commisionSettingsModule = new CommisionSettingsModule();
  });

  it('should create an instance', () => {
    expect(commisionSettingsModule).toBeTruthy();
  });
});
