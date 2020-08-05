import installMentions from './Mentions';

export default function install(config) {
  return [installMentions].reduce((acc, apply) => apply(acc), config);
}
