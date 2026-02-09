# CineEdit Pro

Professional desktop video editor built with Electron, React, and FFmpeg.

## Features

🎬 **Multi-Track Timeline**
- Unlimited video and audio tracks
- Drag-and-drop editing
- Precision trimming and cutting
- Zoom and scroll controls

🎨 **Effects & Transitions**
- Video effects (brightness, contrast, saturation, blur, sharpen)
- Transitions (fade, dissolve, wipe, zoom)
- Drag-and-drop effect application

📁 **Media Management**
- Import videos, audio, and images
- Organized media browser
- Thumbnail preview

🖥️ **Professional Preview**
- Real-time video preview
- Frame-by-frame navigation
- Timecode display

💾 **Export Options**
- Multiple formats (MP4, MOV, WebM)
- Quality presets (4K, 1080p, 720p, 480p)
- Progress tracking

## Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run dist
```

## Development

```bash
# Start React dev server
npm start

# In another terminal, start Electron
npm run electron

# Or run both concurrently
npm run dev
```

## Usage

1. **Import Media**: Click the + button in Media Browser or use File > Import Media
2. **Add to Timeline**: Drag media from browser to timeline tracks
3. **Edit**: Use timeline tools to cut, trim, and arrange clips
4. **Apply Effects**: Drag effects from Effects panel onto clips
5. **Export**: File > Export Video to render your project

## Keyboard Shortcuts

- `Space` - Play/Pause
- `C` - Cut at playhead
- `Delete` - Delete selected clips
- `Cmd+Z` - Undo
- `Cmd+Shift+Z` - Redo
- `Cmd+S` - Save project
- `Cmd+E` - Export video
- `Arrow Keys` - Navigate frames

## Tech Stack

- **Electron** - Desktop application framework
- **React** - UI components
- **FFmpeg** - Video processing
- **Wavesurfer.js** - Audio waveforms
- **Fabric.js** - Canvas manipulation

## Project Structure

```
CineEdit-Pro/
├── electron/          # Electron main process
│   ├── main.js       # Application entry
│   └── preload.js    # IPC bridge
├── src/
│   ├── components/   # React components
│   ├── store/        # State management
│   ├── utils/        # Helper functions
│   ├── App.js        # Main app component
│   └── index.js      # React entry
├── public/           # Static assets
└── package.json      # Dependencies
```

## License

MIT

---

**CineEdit Pro** - Professional video editing for everyone 🎬
