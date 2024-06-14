chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    if (request.darkMode) {
      document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
      let media = document.querySelectorAll('img, video');
      media.forEach((mediaItem) => {
        mediaItem.style.filter = 'invert(1) hue-rotate(180deg)';
      });
    } else {
      document.documentElement.style.filter = 'invert(0) hue-rotate(0deg)';
      let media = document.querySelectorAll('img, video');
      media.forEach((mediaItem) => {
        mediaItem.style.filter = 'invert(0) hue-rotate(0deg)';
      });
    }
  } else if (request.action === "boldText") {
    document.querySelectorAll('*').forEach((el) => {
      if (request.boldText) {
        el.style.fontWeight = 'bold';
      } else {
        el.style.fontWeight = 'normal';
      }
    });
  } else if (request.action === "changeFont") {
    document.querySelectorAll('*').forEach((el) => {
      el.style.fontFamily = request.font;
    });
  } else if (request.action === "changeTheme") {
    switch (request.theme) {
      case 'default':
        document.documentElement.style.filter = '';
        break;
      case 'sepia':
        document.documentElement.style.filter = 'sepia(1)';
        break;
      case 'grayscale':
        document.documentElement.style.filter = 'grayscale(1)';
        break;
      case 'inverted':
        document.documentElement.style.filter = 'invert(1)';
        break;
      case 'highContrast':
        document.documentElement.style.filter = 'contrast(2)';
        break;
      case 'nightMode':
        document.documentElement.style.filter = 'brightness(0.5)';
        break;
      default:
        document.documentElement.style.filter = '';
        break;
    }
  }
  sendResponse({ status: "done" });
  return true;
});
