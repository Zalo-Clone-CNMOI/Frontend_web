"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { styled } from "@mui/material/styles";

const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundColor: "#000",
});

interface VideoPlayerProps {
  stream?: MediaStream | null;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onVideoLoad?: () => void;
  onVideoError?: (error: Error) => void;
  playerId?: string;
}

export interface VideoPlayerRef {
  getVideoElement: () => HTMLVideoElement | null;
  play: () => Promise<void>;
  pause: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ 
    stream, 
    muted = false, 
    autoPlay = true, 
    playsInline = true, 
    className,
    style,
    onVideoLoad,
    onVideoError,
    playerId = "default"
  }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const currentStreamRef = useRef<MediaStream | null>(null);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getVideoElement: () => videoRef.current,
      play: () => videoRef.current?.play() || Promise.reject(new Error('Video element not available')),
      pause: () => videoRef.current?.pause(),
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Set video properties
      video.muted = muted;
      video.autoplay = autoPlay;
      video.playsInline = playsInline;

      // Only update stream if it actually changed
      if (video.srcObject !== stream) {
        console.log(`[VideoPlayer-${playerId}] Stream changed, updating from ${currentStreamRef.current?.id || 'null'} to ${stream?.id || 'null'}`);
        
        // Remove old stream tracks
        if (currentStreamRef.current && currentStreamRef.current !== stream) {
          currentStreamRef.current.getTracks().forEach(track => {
            track.stop();
          });
          video.srcObject = null;
        }

        // Set new stream
        if (stream) {
          video.srcObject = stream;
          currentStreamRef.current = stream;

          // Handle video tracks
          const videoTracks = stream.getVideoTracks();
          if (videoTracks.length > 0) {
            console.log(`[VideoPlayer] Setting video stream with ${videoTracks.length} tracks`);
            
            // Minimal event listeners for video tracks
            videoTracks.forEach((track, index) => {
              const handleTrackEnd = () => {
                console.log(`[VideoPlayer] Video track ${index} ended`);
              };
              
              track.addEventListener('ended', handleTrackEnd);
            });

            // Debounced play function to prevent multiple rapid calls
            let playTimeout: NodeJS.Timeout;
            const debouncedPlay = () => {
              clearTimeout(playTimeout);
              playTimeout = setTimeout(async () => {
                try {
                  if (video.paused && video.readyState >= 2) { // HAVE_CURRENT_DATA
                    await video.play();
                    console.log(`[VideoPlayer] Video play successful`);
                    onVideoLoad?.();
                  }
                } catch (error) {
                  const err = error instanceof Error ? error : new Error('Video play failed');
                  console.warn(`[VideoPlayer] Video play failed:`, err);
                  
                  // Only retry for specific errors
                  if (err.name !== 'NotAllowedError') {
                    setTimeout(() => {
                      video.play().catch(e => {
                        console.error(`[VideoPlayer] Retry failed:`, e);
                        onVideoError?.(e instanceof Error ? e : new Error('Video retry failed'));
                      });
                    }, 500);
                  } else {
                    onVideoError?.(err);
                  }
                }
              }, 50);
            };

            // Set up video element event listeners
            const handleLoadedMetadata = () => {
              console.log(`[VideoPlayer] Video metadata loaded`);
              debouncedPlay();
            };

            const handleCanPlay = () => {
              console.log(`[VideoPlayer] Video can play`);
              debouncedPlay();
            };

            const handlePlay = () => {
              console.log(`[VideoPlayer] Video is playing`);
              onVideoLoad?.();
            };

            const handleError = (e: Event) => {
              const error = (e.target as HTMLVideoElement).error;
              console.error(`[VideoPlayer] Video error:`, error);
              const errorObj = error ? new Error(error.message) : new Error('Video playback error');
              onVideoError?.(errorObj);
            };

            // Add event listeners
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('play', handlePlay);
            video.addEventListener('error', handleError);

            // Initial play attempt
            debouncedPlay();

            // Clean up function
            return () => {
              clearTimeout(playTimeout);
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('play', handlePlay);
              video.removeEventListener('error', handleError);
              
              videoTracks.forEach((track) => {
                track.removeEventListener('ended', () => {});
              });
            };
          } else {
            console.warn(`[VideoPlayer] No video tracks found in stream`);
            currentStreamRef.current = null;
          }
        } else {
          // Clear video
          video.srcObject = null;
          currentStreamRef.current = null;
        }
      }
    }, [stream, muted, autoPlay, playsInline, onVideoLoad, onVideoError, playerId]);

    return (
      <VideoElement
        ref={videoRef}
        className={className}
        style={style}
      />
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
