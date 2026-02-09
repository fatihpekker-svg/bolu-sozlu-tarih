import React, { useEffect, useRef, useState } from 'react';
import './AudioMeter.css';

const AudioMeter = ({ analyserLeft, analyserRight }) => {
    const [leftLevel, setLeftLevel] = useState(0);
    const [rightLevel, setRightLevel] = useState(0);
    const [leftPeak, setLeftPeak] = useState(0);
    const [rightPeak, setRightPeak] = useState(0);
    const animationRef = useRef();
    const leftPeakTimeout = useRef();
    const rightPeakTimeout = useRef();

    useEffect(() => {
        if (!analyserLeft || !analyserRight) return;

        const bufferLength = analyserLeft.fftSize;
        const leftDataArray = new Uint8Array(bufferLength);
        const rightDataArray = new Uint8Array(bufferLength);

        const updateLevels = () => {
            // Get time domain data for both channels
            analyserLeft.getByteTimeDomainData(leftDataArray);
            analyserRight.getByteTimeDomainData(rightDataArray);

            // Calculate RMS (Root Mean Square) for accurate level
            const calculateRMS = (dataArray) => {
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const normalized = (dataArray[i] - 128) / 128;
                    sum += normalized * normalized;
                }
                return Math.sqrt(sum / dataArray.length);
            };

            const leftRMS = calculateRMS(leftDataArray);
            const rightRMS = calculateRMS(rightDataArray);

            // Convert RMS to Decibels
            // 20 * log10(rms) gives dB relative to full scale (0 dBFS)
            const toDB = (rms) => {
                if (rms < 0.0001) return -60; // Floor at -60dB
                return 20 * Math.log10(rms);
            };

            const leftDBVal = toDB(leftRMS);
            const rightDBVal = toDB(rightRMS);

            // Map dB to 0-1 range for display
            // Range: -60dB (0%) to 0dB (100%)
            const MIN_DB = -60;
            const mapDBtoHeight = (db) => {
                return Math.max(0, Math.min(1, (db - MIN_DB) / (0 - MIN_DB)));
            };

            const leftHeight = mapDBtoHeight(leftDBVal);
            const rightHeight = mapDBtoHeight(rightDBVal);

            setLeftLevel(leftHeight);
            setRightLevel(rightHeight);

            // Update peaks
            if (leftHeight > leftPeak) {
                setLeftPeak(leftHeight);
                clearTimeout(leftPeakTimeout.current);
                leftPeakTimeout.current = setTimeout(() => {
                    setLeftPeak(0);
                }, 1500);
            }

            if (rightHeight > rightPeak) {
                setRightPeak(rightHeight);
                clearTimeout(rightPeakTimeout.current);
                rightPeakTimeout.current = setTimeout(() => {
                    setRightPeak(0);
                }, 1500);
            }

            animationRef.current = requestAnimationFrame(updateLevels);
        };

        updateLevels();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            clearTimeout(leftPeakTimeout.current);
            clearTimeout(rightPeakTimeout.current);
        };
    }, [analyserLeft, analyserRight, leftPeak, rightPeak]);

    const getMeterColor = (level) => {
        if (level > 0.85) return '#ef4444'; // Red - clipping
        if (level > 0.7) return '#fbbf24'; // Yellow - hot
        return '#4ade80'; // Green - normal
    };

    return (
        <div className="audio-meter">
            <div className="meter-channel">
                <div className="meter-label">L</div>
                <div className="meter-bar-container">
                    <div className="meter-scale">
                        <span>0</span>
                        <span>-6</span>
                        <span>-12</span>
                        <span>-18</span>
                        <span>-24</span>
                        <span>-∞</span>
                    </div>
                    <div className="meter-bar">
                        <div
                            className="meter-fill"
                            style={{
                                height: `${leftLevel * 100}%`,
                                backgroundColor: getMeterColor(leftLevel)
                            }}
                        />
                        {leftPeak > 0 && (
                            <div
                                className="meter-peak"
                                style={{ bottom: `${leftPeak * 100}%` }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="meter-channel">
                <div className="meter-label">R</div>
                <div className="meter-bar-container">
                    <div className="meter-scale">
                        <span>0</span>
                        <span>-6</span>
                        <span>-12</span>
                        <span>-18</span>
                        <span>-24</span>
                        <span>-∞</span>
                    </div>
                    <div className="meter-bar">
                        <div
                            className="meter-fill"
                            style={{
                                height: `${rightLevel * 100}%`,
                                backgroundColor: getMeterColor(rightLevel)
                            }}
                        />
                        {rightPeak > 0 && (
                            <div
                                className="meter-peak"
                                style={{ bottom: `${rightPeak * 100}%` }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioMeter;
