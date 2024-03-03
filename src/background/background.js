chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
      chrome.tabs.create({
        url: "src/onboarding/onboarding.html"
      });
    }
  });