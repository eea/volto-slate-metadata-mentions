import { withMentions } from './extensions';

export default function install(config) {
  const { slate } = config.settings;
  slate.extensions = [...(slate.extensions || []), withMentions];
  return config;
}
