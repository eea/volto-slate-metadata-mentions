# @eeacms/volto-slate-metadata-mentions

[![Releases](https://img.shields.io/github/v/release/eea/volto-slate-metadata-mentions)](https://github.com/eea/volto-slate-metadata-mentions/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate-metadata-mentions%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate-metadata-mentions/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions)

[Volto Slate](https://6.dev-docs.plone.org/volto/configuration/volto-slate/) Metadata Mentions

## Features

### Dynamically insert any Document metadata within your slate text blocks

![Insert metadata](https://raw.githubusercontent.com/eea/volto-slate-metadata-mentions/docs/docs/description.gif)

### Combine multiple metadata in one slate text block

![Combine multiple metadata](https://raw.githubusercontent.com/eea/volto-slate-metadata-mentions/docs/docs/multiple.gif)

### Apply styles

![Style metadata entries](https://raw.githubusercontent.com/eea/volto-slate-metadata-mentions/docs/docs/style.gif)

### Preview metadata

![Preview metadata](https://raw.githubusercontent.com/eea/volto-slate-metadata-mentions/docs/docs/preview.gif)

### Easily locate and edit metadata within the right sidebar

![Edit](https://raw.githubusercontent.com/eea/volto-slate-metadata-mentions/docs/docs/edit.gif)

## Upgrade

### Upgrading to 10.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

The plugin keeps the same element types, the same settings and the same stored rich text, so
metadata mentions created with 9.x keep rendering unchanged. The release adds Volto 19 support and
moves the repository to the Volto 19 layout, where the published package lives in
`packages/volto-slate-metadata-mentions`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 9.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 9.x
  declared no peers.
- **The package no longer ships the repository tooling.** The Cypress specs and their support
  files, the Jest setup (`jest-addon.config.js`, `jest.setup.js`) and the Docker and Jenkins files
  are gone. The unit tests moved to Vitest and live next to the add-on, so nothing a site imports
  was removed.

### Upgrading to 6.x
   
This version requires: `@plone/volto >= 16.0.0.alpha.15` (`volto-slate` part of Volto Core).

## See also

* [volto-metadata-block](https://github.com/eea/volto-metadata-block)

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-slate-metadata-mentions": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-slate-metadata-mentions'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
