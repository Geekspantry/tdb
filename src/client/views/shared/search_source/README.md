# searchSource

- Will draw a search input, with an icon indicating status (loaded, loading or error), will print some search metadata (time to execute the query on elasticsearch and total number of results)
- Will bring new results as you type, with an input throttle delay

```handlebars
{{> searchSource}}
```

```js
@params
  source: {SearchSource} a SearchSource instance
  options: {Object} (optional) options to pass with the search method of SearchSource
``` 
### Pre defined search sources:
- `globalSearch`: will search for title and description on technologies, organizations, projects and attachments *
- `userSearch`: will search for fullName, username and email on users

### Example 
Search with `globalSearch` but only get results from technologies or organizations

```handlebars
<template name="mySearch">
  {{> searchSource source=globalSource options=getOptions}}
</template>
```

```js
Template.mySearch.helpers({
  globalSource() {
    return globalSearch;
  },
  getOptions: {
    types: ['technologies','organizations']
  }
})
```

### Best practices
Define your SearchSource's on a global namespace object called SearchSources.

Then retrieve your SearchSource intance with:
```handlebars
<template name="mySearch">
  {{> searchSource source=SearchSources.globalSearch options=getOptions}}
</template>
```
This works because there is a global template helper that returns our namespace:
```js
Template.registerHelper('SearchSources', () => SearchSources);
```
