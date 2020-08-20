# volto-slate-metadata-mentions

[Volto Slate](https://github.com/eea/volto-slate/tree/develop) Metadata Mentions


## Develop

Before starting make sure your development environment is properly set. See [Volto Developer Documentation](https://docs.voltocms.com/getting-started/install/)

1. Install `mrs.developer`

        $ npm install -g mrs.developer

1. Install `@plone/create-volto-app`

        $ npm install -g @plone/create-volto-app

1. Create new volto app

        $ create-volto-app my-volto-project
        $ cd my-volto-project

1. Update `package.json` with the following information:

        {
            "scripts": {
                "develop": "missdev --config=jsconfig.json --output=addons"
            },

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
        }

1. Add the following to `mrs.developer.json`:

        {
            "volto-slate-metadata-mentions": {
                "url": "https://github.com/eea/volto-slate-metadata-mentions.git",
                "package": "@eeacms/volto-slate-metadata-mentions",
                "branch": "develop",
                "path": "src"
            }
        }

1. Install

        $ yarn develop
        $ yarn

1. Start backend

        $ docker run -d --name plone -p 8080:8080 -e SITE=Plone -e VERSIONS="plone.restapi=7.0.0a4" -e ADDONS="kitconcept.volto" plone:5

    ...wait for backend to setup and start - `Ready to handle requests`:

        $ docker logs -f plone

    ...you can also check http://localhost:8080/Plone

1. Start frontend

        $ yarn start

1. Go to http://localhost:3000

1. Happy hacking!

        $ cd src/addons/volto-slate-metadata-mentions/
