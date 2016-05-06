# fetchImage

Use this compontent to get an cloudinary fetched image with your specified `width` and `height`.


## Example code


```html
<!-- HTML -->
<template name="view">
  {{> fetchImage src=imageUrl width=400 height=400 class="img-responsive"}}	
</template>
```


```js
// javascript
Template.view.helpers({
  imageUrl() {
  	return 'https://s3.amazonaws.com/www.appcelerator.com.images/Appcelerator.png'
  }
})
```

The component will send your image to cloudinary and resize it as you want.