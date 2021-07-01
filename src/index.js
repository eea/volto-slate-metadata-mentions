import installPlugins from './plugins';
import installWidgetsView from '@eeacms/volto-widgets-view';

const applyConfig = (config) => {
  if (!config.widgets.view) {
    config = installWidgetsView(config);
  }

  // Restrict slate metadata mentions to Layout only
  if (config.settings.layoutOnlySlateMetadataMentions === undefined) {
    config.settings.layoutOnlySlateMetadataMentions = false;
  }

  return installPlugins(config);
};

export default applyConfig;
