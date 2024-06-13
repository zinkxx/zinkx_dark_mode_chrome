let isBoldText = false;

function applyDarkMode() {
  const darkModeStyle = `
    * {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
      border-color: #333 !important;
    }
    img, video {
      filter: brightness(0.7) contrast(1.2);
    }
    a {
      color: #bb86fc !important;
    }
    iframe {
      filter: brightness(0.7) contrast(1.2);
    }
  `;

  if (!document.getElementById('dark-mode-style')) {
    const style = document.createElement('style');
    style.id = 'dark-mode-style';
    style.innerHTML = darkModeStyle;
    document.head.appendChild(style);
  }
}

function removeDarkMode() {
  const style = document.getElementById('dark-mode-style');
  if (style) {
    style.parentNode.removeChild(style);
  }
}

function toggleDarkMode() {
  if (document.getElementById('dark-mode-style')) {
    removeDarkMode();
  } else {
    applyDarkMode();
  }
}

function applyBoldText() {
  const boldTextStyle = `
    body, body *:not(script):not(style) {
      font-weight: bold !important;
    }
    input, textarea, select, button {
      font-weight: normal !important;
    }
  `;

  if (!document.getElementById('bold-text-style')) {
    const style = document.createElement('style');
    style.id = 'bold-text-style';
    style.innerHTML = boldTextStyle;
    document.head.appendChild(style);
  }
}

function removeBoldText() {
  const style = document.getElementById('bold-text-style');
  if (style) {
    style.parentNode.removeChild(style);
  }
}

function toggleBoldText() {
  if (isBoldText) {
    removeBoldText();
  } else {
    applyBoldText();
  }
  isBoldText = !isBoldText;
  chrome.storage.local.set({ boldText: isBoldText });
}

function applyFont(font) {
  const allTextNodes = document.querySelectorAll("body, body *:not(script):not(style):not(.icon):not(.bold-icon):not(.slider:before)");
  allTextNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node.style.fontFamily = font;
    }
  });
}

// Mesaj dinleyicisi ekleyin
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
    sendResponse({status: "darkModeToggled"});
  } else if (request.action === "boldText") {
    toggleBoldText();
    sendResponse({status: "boldTextToggled"});
  } else if (request.action === "changeFont") {
    applyFont(request.font);
    sendResponse({status: "fontChanged"});
  }
  return true;  // Asynchronous response will be sent
});

// Dark mode ve bold text durumlarını sayfa yüklemesinde uygula
chrome.storage.local.get(['darkMode', 'boldText', 'selectedFont'], (result) => {
  if (result.darkMode) {
    applyDarkMode();
  }
  if (result.boldText) {
    applyBoldText();
    isBoldText = true;
  }
  if (result.selectedFont) {
    applyFont(result.selectedFont);
  }
});
