Template.cropImage.onRendered(function() {
  this.cropper = this.$('#image').cropper({
    aspectRatio: this.data.aspectRatio || 1,
  });

  this.data.getCropper(this.cropper);
});