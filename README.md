# volto-slate-metadata-mentions

[Volto Slate](https://github.com/eea/volto-slate/tree/develop) Metadata Mentions

[![Releases](https://img.shields.io/github/v/release/eea/volto-slate-metadata-mentions)](https://github.com/eea/volto-slate-metadata-mentions/releases)

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
    $ npm install -g @plone/create-volto-app
    $ create-volto-app my-volto-project
    $ cd my-volto-project
    ```

1. Update `package.json`:
    ``` JSON
    "addons": [
        "volto-slate:asDefault",
        "@eeacms/volto-widgets-view",
        "@eeacms/volto-slate-metadata-mentions"
    ],

    "dependencies": {
        "@plone/volto": "github:eea/volto#7.8.2-beta.2",
        "volto-slate": "github:eea/volto-slate#0.4.9",
        "@eeacms/volto-widgets-view": "github:eea/volto-widgets-view#0.2.4"
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

See [DEVELOP.md](docs/DEVELOP.md).

## See also

* [volto-metadata-block](https://github.com/eea/volto-metadata-block)

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](docs/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)

