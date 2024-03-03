import {readStorage, strRepeat, writeStorage} from "../utils.js";

const STORAGE_KEY = 'my_ext_template';
const STORAGE_AREA = 'sync';

const popupBtn = document.getElementById('my_ext-popup_btn');
popupBtn.addEventListener('click', async () => {
    const storageData = await readStorage(STORAGE_KEY, STORAGE_AREA);
    storageData.clickCnt++;
    writeStorage(STORAGE_KEY, storageData, STORAGE_AREA);
});

let storageData = await readStorage(STORAGE_KEY, STORAGE_AREA);
if (!storageData) {
    storageData = {clickCnt: 0}
    writeStorage(STORAGE_KEY, storageData, STORAGE_AREA);
}
if (storageData.clickCnt > 0 && storageData.clickCnt < 10) {
    popupBtn.innerHTML = "Click me again" + strRepeat(".", storageData.clickCnt);
} else if (storageData.clickCnt >= 10) {
    popupBtn.innerHTML = "Stop clicking me now"
}



const resetBtn = document.getElementById('my_ext-reset_btn');
resetBtn.addEventListener('click', async () => {
    writeStorage(STORAGE_KEY, {clickCnt: 0}, STORAGE_AREA);
    popupBtn.innerHTML = "Now try to click me";
});