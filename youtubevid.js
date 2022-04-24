window.addEventListener("load", function () {
  const v = document.getElementsByClassName('youtube-container');
  function updateVideo() {
    const id = this.id.replace('vid-', '');
    const w = this.clientWidth;
    const h = this.clientHeight;
    this.innerHTML =
      '<iframe src="//www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1" frameborder="0" width="' + w + '" height="' + h + '" allowfullscreen></iframe>';
  }
  for (i = 0; i < v.length; i++) {
    v[i].addEventListener("click", updateVideo);
  }
  const lbl = document.getElementsByClassName('youtube-placeholder-label');
  for (i = 0; i < lbl.length; i++) {
    lbl[i].addEventListener("click", function(e) {
      e.stopPropagation = true;
      e.cancelBubble = true;
    });
  }
});
