const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
    // Dialog APIs
    openFileDialog: (options) => ipcRenderer.invoke('dialog:openFile', options),
    saveFileDialog: (options) => ipcRenderer.invoke('dialog:saveFile', options),

    // File system APIs
    readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
    writeFile: (filePath, data) => ipcRenderer.invoke('fs:writeFile', filePath, data),
    writeBinaryFile: (filePath, data) => ipcRenderer.invoke('fs:writeBinaryFile', filePath, data),
    readVideoFile: (filePath) => ipcRenderer.invoke('fs:readVideoFile', filePath),

    // Menu event listeners
    onMenuEvent: (channel, callback) => {
        const validChannels = [
            'menu-new-project',
            'menu-open-project',
            'menu-save-project',
            'menu-import-media',
            'menu-export',
            'menu-undo',
            'menu-redo',
            'menu-cut',
            'menu-delete',
            'menu-about'
        ];

        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    },

    removeMenuListener: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    }
});
