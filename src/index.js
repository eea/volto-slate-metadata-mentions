import installPlugins from './plugins';

const applyConfig = (config) => {
  return installPlugins(config);
};

export default applyConfig;
