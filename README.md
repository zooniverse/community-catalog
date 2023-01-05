# Zooniverse Community Catalog

Welcome to the Community Catalog, a Zooniverse-powered website for exploring
community-tagged images.

## Development

This project is a React website that connects to various Zooniverse
databases/services.

Requires:
- node 16 and npm 8

External requirements:
- `zooniverse.org`: required for user auth.

How to run the website on your computer:
- Add `local.zooniverse.org` as an alias for `localhost` to your _hosts_ file.
- Run `npm install` (or `npm ci`) to install dependencies.
- Run `npm start` to start the local dev server.
- Open `https://local.zooniverse.org:8080` in your browser to view the website.

How to deploy the website to community-catalog.zooniverse.org:
- Deploys are performed via GitHub actions.
  - Option 1: Check the `#deploys` channel on our Zooniverse Slack for the
    necessary chat commands.
  - Option 2: manually update the `production-release` tag to the latest commit
    in this repo (or the commit you wish to deploy).
- Monitor progress on the [GitHub Actions tab](https://github.com/zooniverse/community-catalog/actions)
  of this repo.  

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
  doesn't use oAuth for authentication.
- Instead, the CC relies on the trust afforded across the entire Zooniverse
  domain. If you're on any `*.zooniverse.org` site, you're also logged in to
  `community-catalog.zooniverse.org`
- This reason (along with other CORS-related API calls) is why, when
  testing/developing on local, you need to have `local.zooniverse.org:8080`
  set up.
