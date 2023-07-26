document.addEventListener('DOMContentLoaded', () => {
    const blueButton = document.getElementById('blueButton');
    const blackButton = document.getElementById('blackButton');
    const whiteButton = document.getElementById('whiteButton');

    // Processing when button is clicked
    blueButton.addEventListener('click', () => {
        saveLastButtonClicked(1);
    });
    blackButton.addEventListener('click', () => {
        saveLastButtonClicked(2);
    });
    whiteButton.addEventListener('click', () => {
        saveLastButtonClicked(3);
    });

    // Save the last button pressed
    function saveLastButtonClicked(buttonValue) {
        chrome.storage.sync.set({ lastButtonClicked: buttonValue });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { lastButtonClicked: buttonValue });
        });
    }
});
