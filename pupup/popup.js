let isDarkMode = false;
let isBoldText = false;
let isAutoDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['darkMode', 'boldText', 'selectedFont', 'selectedTheme', 'startHour', 'endHour', 'autoDarkMode'], (result) => {
    isDarkMode = result.darkMode || false;
    isBoldText = result.boldText || false;
    isAutoDarkMode = result.autoDarkMode || false;
    const selectedFont = result.selectedFont || 'Arial';
    const selectedTheme = result.selectedTheme || 'default';
    const startHour = result.startHour !== undefined ? result.startHour : '18:00';
    const endHour = result.endHour !== undefined ? result.endHour : '06:00';

    document.getElementById('toggleDarkMode').checked = isDarkMode;
    document.getElementById('boldText').checked = isBoldText;
    document.getElementById('fontSelector').value = selectedFont;
    document.getElementById('themeSelector').value = selectedTheme;
    document.getElementById('startHour').value = startHour;
    document.getElementById('endHour').value = endHour;
    document.getElementById('autoDarkMode').checked = isAutoDarkMode;
  });
});

document.getElementById('toggleDarkMode').addEventListener('change', () => {
  isDarkMode = !isDarkMode;
  chrome.storage.local.set({ darkMode: isDarkMode });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode", darkMode: isDarkMode });
  });
});

document.getElementById('boldText').addEventListener('change', () => {
  isBoldText = !isBoldText;
  chrome.storage.local.set({ boldText: isBoldText });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "boldText", boldText: isBoldText });
  });
});

document.getElementById('fontSelector').addEventListener('change', (event) => {
  const selectedFont = event.target.value;
  chrome.storage.local.set({ selectedFont });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "changeFont", font: selectedFont });
  });
});

document.getElementById('themeSelector').addEventListener('change', (event) => {
  const selectedTheme = event.target.value;
  chrome.storage.local.set({ selectedTheme });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "changeTheme", theme: selectedTheme });
  });
});

document.getElementById('startHour').addEventListener('change', (event) => {
  const startHour = event.target.value;
  chrome.storage.local.set({ startHour: startHour });
  chrome.runtime.sendMessage({ action: "setAutoDarkMode" });
});

document.getElementById('endHour').addEventListener('change', (event) => {
  const endHour = event.target.value;
  chrome.storage.local.set({ endHour: endHour });
  chrome.runtime.sendMessage({ action: "setAutoDarkMode" });
});

document.getElementById('autoDarkMode').addEventListener('change', () => {
  isAutoDarkMode = !isAutoDarkMode;
  chrome.storage.local.set({ autoDarkMode: isAutoDarkMode });
  chrome.runtime.sendMessage({ action: "setAutoDarkMode" });
});

document.getElementById('githubButton').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/zinkxx' });
});

document.getElementById('websiteButton').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://devtechnic.online' });
});
