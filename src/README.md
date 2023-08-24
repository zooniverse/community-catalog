# Source Code Documentation

Hello fellow developers (and/or future me)! This doc should give you an idea of how the Community Catalog code is structured.

Items with ⭐️ are likely the items future devs would want to modify once the Catalog's core functionality has coalesced. For example, if you want to add new Zooniverse projects to the Catalog, look at projects.json.

If you want a basic overview of how the app's overall structure _from a user's point of view,_ maybe start with the [/pages](https://github.com/zooniverse/community-catalog/tree/master/src#pages) folder

## / (Root)

⭐️ **config.js:** contains general config data for the website, e.g. the URL for the indexed Subjects database.

index.html: HTML template for the website.

main.js: main entrypoint for the website/app.

⭐️ **projects.json:** aka Projects Config List, contains the config data for the Zooniverse projects featured on the Catalog. Please also find the matching config on [subject-set-search-api](https://github.com/zooniverse/subject-set-search-api/blob/main/src/projects.js)

router.js: defines website routes/paths.

**strings.json:** contains all the text used on the website.

<details>
<summary>Additional Info: Project Config</summary>

This section describes how a "project config" item in projects.json is structured. Most fields are **optional,** as the Catalog is built with fallbacks in mind. When in doubt, look at _Community Catalog (Stable Test Project)_ as a template. 

- `name`: display name for the project.
- `slug`: project slug.
- `id`: Zooniverse project ID.
- `avatar`: project avatar (image), displayed on the LandingPage. (URL to an image file)
- `description`: exactly what it says.
- `hidden`: whether this project should be visible on the LandingPage. (boolean, default false)
- `metadata_fields`: the fields/columns from the Subject's metadata that we want to show. aka the "institutional metadata" we see on the SubjectPage. (array of strings)
- `metadata_fields_to_search_for_keywords`: the fields/columns from the Subject's metadata that we'll search through, when we have a search query. (array of strings)
- `metadata_fields_aliases`: renames  (dictionary object)
- `sensitive_content_conditions`: conditions that mark whether a Subject is considered to have sensitive content. Data is in the format:
    ```
    [
      {
        field  // name of a metadata field
        values  // array of possible values
      },
      ...
    ]
    // If a Subject has ANY field that contains ANY of the listed values, then the Subject has sensitive content.
    ```
- `keywords_to_always_suggest`: these keywords will always be listed in the KeywordsList component. (array of strings)
- `keywords_to_never_suggest`: these keywords will never be listed in the KeywordsList component. (array of strings)
- `advanced_search`: unused. (Previously, the Catalog had a much more advanced search function.)
- `example_query`: query to be used for the SearchResultsList on the ProjectPage. Helps to highlight the initial Subjects a volunteer sees. (string)
- `example_subjects`: defines the Subjects to be highlighted/displayed on the ProjectPage's carousel. (array of objects)
- `title_field`: defines which metadata field best _describes_ the Subject. For example, if projectConfig.title_field="short_info", and subject1234.metadata.short_info="A picture of a cat", then Subject 1234 will have the title "A picture of a cat". (string)
- `classify_url`: URL to classify a specific Subject, on the FEM Classifier (string template, with `{subject_id}` placeholder)
- `classify_url`: URL to view a specific Subject on Talk (string template, with `{subject_id}` placeholder)
</details>

## /App

Main website/app component.

## /components

Various components used by pages.

**AdvancedSearchForm:** unused.

**Footer:** website footer.

**Header:** website header. Displays more controls when viewing a Project, e.g. a search bar.

**KeywordsList:** works similarly to the "Popular Tags" on a project's Talk page, and pulls the data from Talk.

**Link:** wrapper for `<Link>` from 'react-router-dom'

**ProjectCard:** small cards that link to various projects. Used on LandingPage.

**ProjectContainer:** figures out what's the currently selected project, by looking at the URL.

**RandomButton:** click this button to view a random Subject in the project.

**SearchResultsList:** given a query (`?query=whatever`), display all search results from the database and from Talk.

**SubjectActionsPanel:** allows users to take actions with the Subject, e.g. go to Classify it. Used on SubjectPage.

**SubjectDiscussion:** aka QuickTalk. Shows the subject discussion from Talk. Used on SubjectPage.

**SubjectImage:** displays the Subject. (Specifically, the first image the Subject has.) Simpler version of SubjectViewer. Used everywhere!

**SubjectKeywords:** displays keywords tagged to the Subject. Pulls data from Talk. Used on SubjectPage.

**SubjectMetadata:** displays the institutional metadata of the Subject. Used on the SubjectPage.

**SubjectViewer:** displays the Subject. Allows the user to view all its images, if the Subject has multiple images. Used on SubjectPage, where the Subject is the focus.

**Tester:** unused.

## /helpers

Contains utility functions. Each function fulfils a niche role and should have additional docs in their comments.

## /pages

The website is organised into a few basic page templates.

**LandingPage:** Catalog home page. Lists all projects.
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
