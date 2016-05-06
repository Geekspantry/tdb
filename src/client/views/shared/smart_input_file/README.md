# smartInputFile
Uploads a local file to the server

## Usage
```handlebars
{{> smartInputFile }}
```

There's callbacks functions for all states of the process.

- onFileSelected(**file**): When the user selects a file (client input file object).

- onUploadBegin(**fileObj**): When upload has been started. We already can track the state of the file now using the `fileObj._id`.

- onUploadError(**error**): When some error occurred while uploading the file for the server.

- onUploadSuccess(**fileObj**): When the file is already on the server.

## Examples

```handlebars
{{> smartInputFile onUploadSuccess=showSuccessAlert }}
```
```js
Template.uploadView.helpers({
  showSuccessAlert(fileObj){
    alert(`The file ${fileObj._id} was uploaded!`);
  }
});
```
