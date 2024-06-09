window.addEventListener('message', function(event) {
  if (event.origin !== "https://pcmap.place.naver.com") {
      return;
  }
  if (event.data.type === 'insertImage') {
      let iframe = document.querySelector('#entryIframe');
      if (iframe) {
          let targetElement = iframe.contentWindow.document.querySelector('#app-root > div > div > div > div.place_section.no_margin.OP4V8 > div.X0C1I');
          if (!targetElement){
            console.log('No target')
          }
          let img = document.createElement('img');
          img.src = event.data.image;
          targetElement.insertBefore(img, targetElement.firstChild);
      }
  }
});
