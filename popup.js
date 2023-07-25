document.addEventListener('DOMContentLoaded', () => {
    const blueForDark = document.getElementById('blueForDark');

    // Save the state of the checkbox and set the initial value
    chrome.storage.sync.get({ blueForDark: false }, (data) => {
        blueForDark.checked = data.blueForDark;
    });

    // Monitor checkbox changes
    blueForDark.addEventListener('change', () => {
        chrome.storage.sync.set({ blueForDark: blueForDark.checked });
        // Send a message to `content_script` when the state of a checkbox is changed
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { blueForDark: blueForDark.checked });
        });
    });
});