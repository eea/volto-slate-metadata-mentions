# volto-slate-metadata-mentions

[![Releases](https://img.shields.io/github/v/release/eea/volto-slate-metadata-mentions)](https://github.com/eea/volto-slate-metadata-mentions/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate-metadata-mentions%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate-metadata-mentions/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate-metadata-mentions%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate-metadata-mentions/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-metadata-mentions-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-metadata-mentions-develop)


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
   
### Upgrading to 6.x
   
This version requires: `@plone/volto >= 16.0.0.alpha.15` (`volto-slate` part of Volto Core).

## See also

* [volto-metadata-block](https://github.com/eea/volto-metadata-block)


## Getting started

### Try volto-slate-metadata-mentions with Docker

      git clone https://github.com/eea/volto-slate-metadata-mentions.git
      cd volto-slate-metadata-mentions
      make
      make start

Go to http://localhost:3000

### Add volto-slate-metadata-mentions to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-slate-metadata-mentions"
   ],

   "dependencies": {
       "@eeacms/volto-slate-metadata-mentions": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-slate-metadata-mentions
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-slate-metadata-mentions/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-slate-metadata-mentions/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-slate-metadata-mentions/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
