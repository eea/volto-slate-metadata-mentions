# volto-slate-metadata-mentions
[![Releases](https://img.shields.io/github/v/release/eea/volto-slate-metadata-mentions)](https://github.com/eea/volto-slate-metadata-mentions/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate-metadata-mentions%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate-metadata-mentions/job/master/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate-metadata-mentions%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate-metadata-mentions/job/develop/display/redirect)

[Volto Slate](https://github.com/eea/volto-slate/tree/develop) Metadata Mentions

## Features

### Dynamically insert any Document metadata within your slate text blocks

![Insert metadata](https://github.com/eea/volto-slate-metadata-mentions/raw/docs/docs/description.gif)

### Combine multiple metadata in one slate text block

![Combine multiple metadata](https://github.com/eea/volto-slate-metadata-mentions/raw/docs/docs/multiple.gif)

### Apply styles

![Style metadata entries](https://github.com/eea/volto-slate-metadata-mentions/raw/docs/docs/style.gif)

### Preview metadata

![Preview metadata](https://github.com/eea/volto-slate-metadata-mentions/raw/docs/docs/preview.gif)

### Easily locate and edit metadata within the right sidebar

![Edit](https://github.com/eea/volto-slate-metadata-mentions/raw/docs/docs/edit.gif)

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project \
                     --addon volto-slate:asDefault \
                     --addon @eeacms/volto-slate-metadata-mentions

   $ cd my-volto-project
   $ yarn add -W @eeacms/volto-slate-metadata-mentions
   ```

1. If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "volto-slate:asDefault",
       "@eeacms/volto-slate-metadata-mentions"
   ],

   "dependencies": {
       "@eeacms/volto-slate-metadata-mentions": "^2.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](DEVELOP.md).

## See also

- [volto-metadata-block](https://github.com/eea/volto-metadata-block)

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
