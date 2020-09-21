import installPlugins from './plugins';
import installWidgetsView from '@eeacms/volto-widgets-view';

const applyConfig = (config) => {
  if (!config.widgets.view) {
    config = installWidgetsView(config);
  }
  return installPlugins(config);
};

export default applyConfig;
