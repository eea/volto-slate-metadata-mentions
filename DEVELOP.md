# volto-slate-metadata-mentions

## Develop

Before starting make sure your development environment is properly set. See [Volto Developer Documentation](https://docs.voltocms.com/getting-started/install/)

1.  Make sure you have installed `yo`, `@plone/generator-volto` and `mrs-developer`

        npm install -g yo @plone/generator-volto mrs-developer

1.  Create new volto app

        yo @plone/volto my-volto-project --skip-install \
                --workspace src/addons/volto-slate-metadata-mentions \
                --addon @eeacms/volto-slate-metadata-mentions
        cd my-volto-project

1.  Add the following to `mrs.developer.json`:

        {
            "volto-slate-metadata-mentions": {
                "url": "https://github.com/eea/volto-slate-metadata-mentions.git",
                "package": "@eeacms/volto-slate-metadata-mentions",
                "branch": "develop",
                "path": "src"
            }
        }

1.  Install

        yarn develop
        yarn

1.  Start backend

        docker pull plone
        docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone

    ...wait for backend to setup and start - `Ready to handle requests`:

        docker logs -f plone

    ...you can also check http://localhost:8080/Plone

1.  Start frontend

        yarn start

1.  Go to http://localhost:3000

1.  Happy hacking!

        cd src/addons/volto-slate-metadata-mentions/
