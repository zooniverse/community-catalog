# Source Code Documentation

Hello fellow developers (and/or future me)! This doc should give you an idea of how the Community Catalog code is structured.

Items with ⭐️ are likely the items future devs would want to modify once the Catalog's core functionality has coalesced. For example, if you want to add new Zooniverse projects to the Catalog, look at projects.json.

## / (Root)

⭐️ **config.js:** contains general config data for the website, e.g. the URL for the indexed Subjects database.

index.html: HTML template for the website.

main.js: main entrypoint for the website/app.

⭐️ **projects.json:** contains the config data for the Zooniverse projects featured on the Catalog. Please also find the matching config on [subject-set-search-api](https://github.com/zooniverse/subject-set-search-api/blob/main/src/projects.js)

router.js: defines website routes/paths.

**strings.json:** contains all the text used on the website.

## /App

Main website/app component.

## /components

Various components used by pages.

## /helpers

Contains utility functions. Each function fulfils a niche role and should have additional docs in their comments.

## /pages

The website is organised into a few basic page templates.

**HomePage:** Catalog home page. Lists all projects.
- Path: `/`
- Example: https://community-catalog.zooniverse.org/

**ProjectPage:** individual project home page. Shows highlights (e.g. example Subjects) to get users started on exploring the project data.
- Path: `/projects/{project_owner}/{project_name}`
- Example: https://community-catalog.zooniverse.org/projects/darkeshard/community-catalog

**SearchPage:** advanced search form and search results. Users go here when they submit a search query.
- Path: `/projects/{project_owner}/{project_name}/search/?query={search_query}`
- Example: https://community-catalog.zooniverse.org/projects/darkeshard/community-catalog/search?query=barbados

**SubjectPage:** shows a single Subject and all its Talk + database details. Allows users to further interact with the specific Subject, e.g. classifying it (note: individual Subject classification is only supported on the [FEM](http://github.com/zooniverse/front-end-monorepo) classifier) or viewing the Talk discussion of it.
- Path: `/projects/{project_owner}/{project_name}/subject/{subject_id}`
- Example: https://community-catalog.zooniverse.org/projects/darkeshard/community-catalog/subject/87892458

## /store

App-wide data store.
