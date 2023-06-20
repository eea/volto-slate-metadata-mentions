import installPlugins from './plugins';
import installWidgetsView from '@eeacms/volto-widgets-view';

const applyConfig = (config) => {
  // Restrict slate metadata mentions to Layout only
  config.settings.layoutOnlySlateMetadataMentions =
    config.settings.layoutOnlySlateMetadataMentions ?? false;

  return installPlugins(config);
};

export default applyConfig;
