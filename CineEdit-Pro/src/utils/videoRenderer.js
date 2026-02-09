
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class VideoRenderer {
    constructor() {
        this.ffmpeg = new FFmpeg();
        this.loaded = false;
    }

    async load() {
        if (this.loaded) return;

        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        try {
            await this.ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            this.loaded = true;
            console.log('FFmpeg loaded successfully');
        } catch (error) {
            console.error('Failed to load FFmpeg:', error);
            throw error;
        }
    }

    async renderTimeline(tracks, options = {}, onProgress) {
        if (!this.loaded) {
            await this.load();
        }

        const {
            outputName = 'output.mp4'
        } = options;

        this.ffmpeg.on('progress', ({ progress }) => {
            if (onProgress) {
                // Progress is 0-1
                onProgress(Math.round(progress * 100));
            }
        });

        // 1. Collect all clips
        const allClips = [];
        tracks.forEach((track, trackIndex) => {
            // Assuming track structure has clips array
            if (track.clips) {
                track.clips.forEach(clip => {
                    // Add track info for layering (higher index = on top)
                    allClips.push({ ...clip, trackIndex });
                });
            }
        });

        if (allClips.length === 0) {
            throw new Error("No clips to render");
        }

        // 2. Write files to FFmpeg FS
        const inputFiles = [];

        for (let i = 0; i < allClips.length; i++) {
            const clip = allClips[i];
            // Simple filename generation to avoid issues
            if (!clip.path) {
                console.error('Clip missing path:', clip);
                throw new Error(`Clip ${clip.name} is missing file path. Please remove and re-add it.`);
            }
            const ext = clip.path.split('.').pop();
            const filename = `input_${i}.${ext}`;

            try {
                let fileData;
                // Check if running in Electron
                if (window.electron && window.electron.readVideoFile) {
                    const result = await window.electron.readVideoFile(clip.path);
                    if (result.success) {
                        fileData = new Uint8Array(result.data);
                    } else {
                        throw new Error(`Failed to read file: ${clip.path}. Error: ${result.error}`);
                    }
                } else {
                    // Fallback using fetchFile (works for urls/blobs)
                    fileData = await fetchFile(clip.path);
                }

                await this.ffmpeg.writeFile(filename, fileData);
                inputFiles.push({ filename, ...clip });

                console.log(`Wrote ${filename} to FFmpeg FS`);
            } catch (err) {
                console.error(`Error writing file ${clip.path}:`, err);
                throw err;
            }
        }

        // 3. Build FFmpeg Command
        // For MVP: Simple Concatenation of the first track or single clip
        // Complex composition requires complex filter graphs.
        // Let's implement a simplified version: Render the first clip only for verification

        const inputArgs = [];
        const filterComplex = [];

        // Input arguments
        inputFiles.forEach(file => {
            inputArgs.push('-i', file.filename);
        });

        // Construct a filter complex to scale/overlay
        // Basic case: Just transcode the first input for now to ensure pipeline works
        // Improvements: Add concat filter here

        // Command execution
        const args = [
            ...inputArgs,
            // Just take the first video and audio stream for now
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            outputName
        ];

        console.log('Running FFmpeg with args:', args);

        try {
            await this.ffmpeg.exec(args);
        } catch (e) {
            console.error('FFmpeg execution failed:', e);
            throw e;
        }

        // 4. Read Result
        const data = await this.ffmpeg.readFile(outputName);

        // cleanup for next run could be added here

        return new Blob([data.buffer], { type: 'video/mp4' });
    }
}

export default new VideoRenderer();
