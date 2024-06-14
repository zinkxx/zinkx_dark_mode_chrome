chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'autoDarkMode') {
    chrome.storage.local.get(['startHour', 'endHour'], (result) => {
      const now = new Date();
      const currentHour = now.getHours();
      if (currentHour >= result.startHour.split(':')[0] || currentHour < result.endHour.split(':')[0]) {
        chrome.storage.local.set({ darkMode: true });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode' });
        });
      } else {
        chrome.storage.local.set({ darkMode: false });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode' });
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'setAutoDarkMode') {
    chrome.alarms.clear('autoDarkMode', () => {
      chrome.alarms.create('autoDarkMode', { periodInMinutes: 60 });
    });
  }
});
