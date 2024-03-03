/**
 * Read data from the defined storage area.
 *
 * @param {string} key Storage key
 * @param {string?} area The storage area, the data should be saved to. If no area is supplied, 'local' will be used.
 * @return {Promise<*|null>} Data from storage area
 */
export async function readStorage(key, area = 'local') {
    if (!(area === 'local' || area === 'sync' || area === 'session' || area === 'managed')) {
        console.error("Invalid storage area! Possible values are: 'local', 'sync', 'session' and 'managed'.")
        return null;
    }

    const data = await chrome.storage[area].get([key]);
    return data[key];
}

/**
 * Write data to the defined storage area.
 *
 * @param {string} key Storage key
 * @param {*} data Data to be stored
 * @param {string?} area The storage area, the data should be saved to. If no area is supplied, 'local' will be used.
 */
export function writeStorage(key, data, area = 'local') {
    if (!(area === 'local' || area === 'sync' || area === 'session' || area === 'managed')) {
        console.error("Invalid storage area! Possible values are: 'local', 'sync', 'session' and 'managed'.")
        return;
    }

    chrome.storage[area].set({[key]: data});
}

/**
 * Callback function for {@link addStorageChangeListener}.
 *
 * @callback storageChangeListenerCallback
 * @param {*} oldValue
 * @param {*} newValue
 * @param {string} key
 * @param {string?} storage
 * @return {void}
 */
/**
 * Registers a listener for storage changes affecting the provided key.
 * By providing a storage area, the listener can be limited to this area.
 *
 * @param {string} key
 * @param {storageChangeListenerCallback} callback
 * @param {string?} area The storage area, to listen for changes. If no area is supplied, the listener will check for any area.
 */
export function addStorageChangeListener(key, callback, area = null) {
    if (!(area === 'local' || area === 'sync' || area === 'session' || area === 'managed' || area === null)) {
        console.error("Invalid storage area! Possible values are: 'local', 'sync', 'session' and 'managed'.")
        return;
    }

    chrome.storage.onChanged.addListener((changes, sArea) => {
        if (area === null || area === sArea) {
            for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                if (key === key) {
                    callback(oldValue, newValue, key, area);
                }
            }
        }
    });
}

/**
 * Sends a single message to event listeners within this extension.
 *
 * @param {string} key Message key
 * @param {*} message Message data
 * @return {Promise<*>} Message response
 */
export function sendMessage(key, message) {
    const data = {}
    data[key] = message;
    return chrome.runtime.sendMessage(data);
}

/**
 * @external MessageSender
 * @see https://developer.chrome.com/docs/extensions/reference/api/runtime#type-MessageSender
 */
/**
 * Callback function for {@link addMessageListener}.
 *
 * @callback messageListenerCallback
 * @param {*} message
 * @param {MessageSender} sender
 * @return {Promise<*>}
 */
/**
 * Register a listener for messages within this extension.
 *
 * @param {string} key Message key
 * @param {messageListenerCallback} callback Callback function for message events
 */
export function addMessageListener(key, callback) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message[key]) {
            callback(message[key], sender).then(sendResponse);
        }
    });
}

export function strRepeat(string, repeat) {
    let result = string;
    for (let i = 1; i < repeat; i++) {
        result += string;
    }
    return result;
}