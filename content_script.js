let lastButtonClicked = 1;
let isFirstTime = true;

/**
 * Initialization
 */
function fetchLastButtonClicked() {
  chrome.storage.sync.get({ lastButtonClicked: 1 }, (data) => {
    lastButtonClicked = data.lastButtonClicked;
    isFirstTime = false;
    changeIconColor();
  });
}

/**
 * Receive message from popup.js
 */
chrome.runtime.onMessage.addListener((message) => {
  if (!isFirstTime) {
    lastButtonClicked = message.lastButtonClicked;
    changeIconColor();
  }
});

/**
 * Change Twitter icon (DOM monitoring support)
 * 
 * @param {string} targetPathData 
 * @param {string} newPathData 
 */
function replaceTwitterIcons(targetPathData, newPathData) {
  const observer = new MutationObserver((mutationsList) => {
    changeIconColor();
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const addedNodes = mutation.addedNodes;
        for (const node of addedNodes) {
          if (node instanceof Element) {
            const pathElements = node.querySelectorAll('path');
            pathElements.forEach((path) => {
              if (path.getAttribute('d') === targetPathData) {
                path.setAttribute('d', newPathData);
              }
            });
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Change Twitter icon
 * 
 * @param {string} targetPathData 
 * @param {string} newPathData 
 */
function replaceTwitterIconsTop(targetPathData, newPathData) {
  const pathElements = document.querySelectorAll('path');
  pathElements.forEach((path) => {
    if (path.getAttribute('d') === targetPathData) {
      path.setAttribute('d', newPathData);
    }
  });
}

/**
 * Change Favicon
 */
function changeFaviconHref() {
  const linkElement = document.querySelector('link[rel="shortcut icon"]');
  if (linkElement) {
    linkElement.setAttribute('href', chrome.runtime.getURL('icons/icon_32.png'));
  }
}

/**
 * Change icon color
 */
function changeIconColor() {
  const newColorValue = getNewIconColor();
  // PC
  const targetElement = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div > div > div:nth-child(1) > div.css-1dbjc4n.r-dnmrzs.r-1vvnge1 > h1 > a > div > svg > g");
  if (targetElement) {
    targetElement.setAttribute('style', `color: ${newColorValue};`);
    return;
  }
  // Mobile(White)
  const targetElementMobile = document.querySelector("#layers > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1e5uvyk.r-6026j.r-dkhcqf.r-axxi2z.r-18jm5s1 > div > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > svg > g");
  if (targetElementMobile) {
    targetElementMobile.setAttribute('style', `color: ${newColorValue};`);
    return;
  }
  // Mobile(Dark)
  const targetElementMobileDark = document.querySelector("#layers > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1e5uvyk.r-ii8lfi.r-dkhcqf.r-axxi2z.r-18jm5s1 > div > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > svg > g");
  if (targetElementMobileDark) {
    targetElementMobileDark.setAttribute('style', `color: ${newColorValue};`);
    return;
  }
  // Mobile(Black)
  const targetElementMobileBlack = document.querySelector("#layers > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1e5uvyk.r-5zmot.r-dkhcqf.r-axxi2z.r-18jm5s1 > div > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > svg > g");
  if (targetElementMobileBlack) {
    targetElementMobileBlack.setAttribute('style', `color: ${newColorValue};`);
    return;
  }
}

/**
 * Get the color of the icon after the change.
 * 
 * @return {string}
 */
function getNewIconColor() {
  switch (lastButtonClicked) {
    case 1:
      // blue
      return 'rgb(29, 161, 242)';
    case 2:
      // black
      return 'rgb(15, 20, 25)';
    case 3:
      // white
      return 'rgb(247, 249, 249)';
    default:
      return 'rgb(29, 161, 242)';
  }
}

// Replace "X" at the end of the page title with "Twitter"
function replaceLastXWithTwitter() {
  const pageTitle = document.title;
  const modifiedTitle = pageTitle.replace(/X$/, 'Twitter');
  document.title = modifiedTitle;
}

// Replace user title of tweet page (for JP lang page.)
function replaceUserTitleWithTwitter() {
  const pageTitle = document.title;
  const modifiedTitle = pageTitle.replace(/(.*)ユーザーの(.+)さん/, '$2さんはTwitterを使っています');
  document.title = modifiedTitle;
}

// Performs DOM monitoring and executes processing when there is a change in the title
let lastTitle = document.title;
const titleObserver = new MutationObserver(() => {
  if (document.title !== lastTitle) {
    replaceLastXWithTwitter();
    replaceUserTitleWithTwitter();
    lastTitle = document.title;
  }
});

const targetPathData = 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';
const newPathData = 'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z';

// 初回取得
fetchLastButtonClicked();
// Change Favicon
window.addEventListener('load', changeFaviconHref);
// Splash screen
replaceTwitterIconsTop(targetPathData, newPathData);
// DOM monitoring
replaceTwitterIcons(targetPathData, newPathData);
// Title monitoring
titleObserver.observe(document, { subtree: true, characterData: true, childList: true });
