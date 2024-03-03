const sparklesRes = chrome.runtime.getURL('assets/sparkles.gif');
const ghStarContainer = document.querySelector('#repository-details-container>ul>* .starred').parentElement;

const starContainer = document.createElement('div');
starContainer.id = 'my_ext-star_container';

const sparkleContainer = document.createElement('div');
sparkleContainer.id = 'my_ext-sparkle_container';
sparkleContainer.style.backgroundImage = `url("${sparklesRes}")`;

ghStarContainer.parentElement.insertBefore(starContainer, ghStarContainer.nextElementSibling);
starContainer.append(sparkleContainer, ghStarContainer);