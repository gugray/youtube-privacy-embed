# A privacy-conscious way to embed YouTube videos in HTML pages

When you embed a video in your HTML page following YouTube's instructions, you are inviting almost a dozen external files from YouTube and Google into your visitor's browser. Some of it is simply extra content that makes your page slower to load, and some of it are trackers that invade your visitor's privacy.

I wrote up this alternative way of embedding videos for use in a website I'm building. It loads no external content until the user explicitly clicks on the video placeholder, which both makes your page lighter and respects your visitor's privacy. The solution is adapted from Nigel Brunner's solution, [A simple way to lazy load embedded YouTube videos using vanilla Javascript](https://www.nigelbunner.co.uk/blog/a-simple-way-to-lazy-load-embedded-youtube-videos-using-vanilla-javascript/).

To use it, include the HTML snippet and the Javascript shown below in your page. You can also find the stylesheet among the repository's files.

```html
<div class="youtube-container" id='vid-cVGAxMo-kiw'>
  <div class="video-placeholder">
    <img src='/images/THUMB-cVGAxMo-kiw.jpg' alt='Embedded video: The Muppets explain Phenomenology' class="video-snapshot-image" />
    <div class="overlay">
      <span class="title youtube-placeholder-label">
        The Muppets explain Phenomenology
      </span>
      <span class="notice youtube-placeholder-label">
        Click to activate embedded video. This will load third-party cookies from YouTube.
        <a href="https://github.com/gugray/youtube-privacy-embed" target="blank" title="What is this?">ⓘ</a>
      </span>
    </div>
    <img src="/video-player-button.svg" alt="Play video" class="video-player-button" />
  </div>  
</div>
```

```javascript
window.addEventListener("load", function () {
  const v = document.getElementsByClassName('youtube-container');
  function updateVideo() {
    const id = this.id.replace('vid-', '');
    const w = this.clientWidth;
    const h = this.clientHeight;
    this.innerHTML =
      '<iframe src="//www.youtube.com/embed/' + id +
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
```

In the HTML, replace the following parts with data specific to the video you are including:

- In the outer `div`, inside replace `id='vid-cVGAxMo-kiw'` the code at the end with your video's ID. This is the `v` paramter in the video's URL: https://youtube.com/watch?v=cVGAxMo-kiw
- In the `img`, specify your own snapshot. You can retrieve one of YouTube's four default thumbnails at `img.youtube.com/vi/cVGAxMo-kiw/0.jpg` (the numbers go from 0 to 3), or you can use a snapshot of your own. I have found that YouTube's thumbnails don't always have the same aspect ratio as the video, which is unfortunate because it means your page will re-flow when the user clicks the placeholder and the actual player from YouTube loads.
- In `<span class="title youtube-placeholder-label">` enter the video's title, or whatever title you would like to show.

This is of course a lot of work for each embedded video. If you're using a static site generator, there is a way to wrap this all up inside a reusable component. In Hugo those are called shortcodes, and mine looks like this:

```html
<div class="youtube-container" id='vid-{{ .Get "id" }}'>
  <div class="video-placeholder">
    <img src='{{ .Get "img" }}' alt='Embedded video: {{ .Get "title" }}' class="video-snapshot-image" />
    <div class="overlay">
      <span class="title youtube-placeholder-label">
        {{ .Get "title" }}
      </span>
      <span class="notice youtube-placeholder-label">
        Click to activate embedded video. This will load third-party cookies from YouTube.
        <a href="https://github.com/gugray/youtube-privacy-embed" target="blank" title="What is this?">ⓘ</a>
      </span>
    </div>
    <img src="/video-player-button.svg" alt="Play video" class="video-player-button" />
  </div>  
</div>
```

To include in markdown, you can then simply type:
```
{{< youtubevid id="cVGAxMo-kiw" img="/images/THUMB-cVGAxMo-kiw.jpg" title="The Muppets explain Phenomenology" >}}
```

There's more information about the privacy and performance impact of embedding YouTube videos directly here:  
[dri.es/how-to-remove-youtube-tracking](https://dri.es/how-to-remove-youtube-tracking)  
[axbom.blog/embed-youtube-videos-without-cookies](https://axbom.blog/embed-youtube-videos-without-cookies/)  
