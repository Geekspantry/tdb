# searchRemoteFile
Download a file from another website and uploads to our servers.

## Usage
```handlebars
{{> searchRemoteFile }}
```

There's callbacks functions for all states of the process.

- onDownloadBegin(): When the remote file download starts. No return objects.

- onDownloadError(**error**): When the remote file can't be downloaded. Sometimes the website doens't allow us to download its files.

- onUploadBegin(**fileId**, **url**): When upload has been started. We already can track the state of the file now using the `fileId`.

- onUploadError(**error**): When some error occurred while uploading the file for the server.

- onUploadSuccess(**fileObj**): When the file is already on the server.

## Examples

```handlebars
{{> searchRemoteFile onUploadSuccess=showSuccessAlert }}
```
```js
Template.uploadView.helpers({
  showSuccessAlert(fileObj){
    alert(`The file ${fileObj._id} was uploaded!`);
  }
});
```
