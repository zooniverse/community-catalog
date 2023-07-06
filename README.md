# Zooniverse Community Catalog

Welcome to the Community Catalog, a Zooniverse-powered website for exploring
community-tagged images.

**Users:** you can view the website at https://community-catalog.zooniverse.org/

**Developers:**
- Please see the source code documentation in [/src](src/README.md)
- If you want to add/modify Zooniverse projects to/in the Catalog, please see [src/projects.json](src/projects.json) and the equivalent in [subject-set-search-api](https://github.com/zooniverse/subject-set-search-api/blob/main/src/projects.js)
- If you want to modify other config settings, please see [src/config.js](src/config.js)

## Development

This project is a React website that connects to various Zooniverse
databases/services.

Requires:
- node 18 and npm 9

External requirements:
- `zooniverse.org`: required for user auth.
- `talk.zooniverse.org`: required for Talk keyword (aka tags/hashtags) searches.
- `subject-set-search-api.zooniverse.org`: required for database searches.

How to run the website on your computer:
- Add `local.zooniverse.org` as an alias for `localhost` to your _hosts_ file.
- Run `npm install` (or `npm ci`) to install dependencies.
- Run `npm start` to start the local dev server.
- Open `https://local.zooniverse.org:8080?env=production` in your browser to view the website.
  - Please be sure to send the **environment to production,** as even local development requires access to production data.

How to deploy the website to community-catalog.zooniverse.org:
- Deploys are performed via GitHub actions.
  - Option 1: Check the `#deploys` channel on our Zooniverse Slack for the
    necessary chat commands.
  - Option 2: manually update the `production-release` tag to the latest commit
    in this repo (or the commit you wish to deploy).
- Monitor progress on the [GitHub Actions tab](https://github.com/zooniverse/community-catalog/actions)
  of this repo.

How to update the indexed Subjects database:
- The database needs to be manually updated whenever the projects add new Subjects.
- There should be a lita command on the Zooniverse Slack that automates this.
- See [subject-set-search-api](https://github.com/zooniverse/subject-set-search-api) for additional details.

### Developer Notes

**Scope & Lifespan**
@shaunanoordin 2022.12.13:
- `community-catalog` is meant to be a "fast development" custom front end, with
  a specific experimental goal and a **limited** lifespan.
- Starting code was based off _a very stripped down version_ of
  [create-react-app v5](https://github.com/facebook/create-react-app) and
  [Front-End-Monorepo](https://github.com/zooniverse/front-end-monorepo).
  Dependencies are kept at a minimum to make maintenance easier.
- This repo should be archived after (TODO: INSERT INITIAL LIFESPAN DATE HERE).

**Auth & Login**
@shaunanoordin 2023.01.05
- Unlike many of our earlier CFEs (custom front ends), the Community Catalog
  doesn't use `oauth` from `panoptes-client` for logins.
- Instead, the CC relies on the trust afforded across the entire Zooniverse
  domain. If you're on any `*.zooniverse.org` site, you're also logged in to
  `community-catalog.zooniverse.org`
- This reason (along with other CORS-related API calls) is why, when
  testing/developing on local, you need to have `local.zooniverse.org:8080`
  set up.
