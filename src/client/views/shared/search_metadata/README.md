# searchMetadata
Get metadata of a website.

## Usage
```handlebars
{{> searchMetadata onSuccess=onFetchMetadataSuccess }}
```

- onSuccess(**metadata**): Returns `title`, `decription`, `image` and `url` from the website.

## Examples

```handlebars
{{> searchMetadata onSuccess=showSuccessAlert }}
```
```js
Template.metadataView.helpers({
  showSuccessAlert(metadata){
    alert(`The website ${metadata.title} is awesome!`);
  }
});
```
