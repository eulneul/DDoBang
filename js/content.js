window.addEventListener('message', function(event) {
  if (event.origin !== "https://pcmap.place.naver.com") {
      return;
  }
});
