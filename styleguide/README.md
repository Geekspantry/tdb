# TDB Styleguide
A frontend reference for TDB developers.

## Guide

### Setup the Environment

Install gulp globally.
```
npm install -g gulp
```

Access the `styleguide` folder and install the depedencies.
```
cd styleguide
npm install
bower install
```

Run the development environment.
```
gulp serve
```

Your default browser will open automatically.

### Create new component
Components are located at `app/templates/components`. To create a component you need to create a new file with `.hbs` extension (handlebars) and import on `index.html` and register it on `main.js` file. The template name will be the name of your file.

#### Example
**app/templates/components/coolComponent.hbs**
```handlebars
<div class="cool-component">
	I am a so cool!
</div>
```

**app/scripts/main.js**

```js
// Register all components here
Handlebars.registerPartial('coolComponent', TDB.templates.coolComponent);
````

**app/index.html**
```html
<!-- templates dependencies -->
<script src="templates/components/coolComponent.js"></script>
<!-- end templates dependencies -->
```

Yes! Its `coolComponent.js` and not `coolComponent.hbs`, because our `gulp` tasks are building this automatically as a handlebars components. So don't worry, just import the `path/to/componentName.js`.

### Create a new route
A route needs a top level component to render it. The top level components (screens) are located in `app/templates`. To create a new route follow the next steps. 

#### Example

**app/templates/coolDashboard.hbs**
```handlebars
<div class="cool-dashboard">
    I'm a cool dashboard!
</div>
```
**app/scripts/main.js**
```js
// Register routes
TDBRouter.addRoute({
  path: '/coolDashboard',
  template: 'coolaDashboard',
});
```

**app/index.html**
```html
<!-- templates dependencies -->
<script src="templates/coolDashboard.js"></script>
<!-- end templates dependencies -->
```

Notes that we should pass the `#/yourRoute` followed by the `componentName`. Routes are hashes `#` followed by `/componentName`.

### Nested components
All your registered components (partials) can be used inside other components with the following syntax. Lets supose we want to use the `coolComponent` inside the `coolDashboard`.

**app/templates/coolDashboard.hbs**

```handlebars
<div class="cool-dashboard">
    I'm a cool dashboard!

    {{> coolComponent}}
</div>
```

## Styling with less
All the `.less` files are outside this project in the `src/client/stylesheets` folder. Every change will reflect on the TDB main application and right here automatically.

### Deploy to gh-pages
```
gulp deploy
```





