"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from "react";
import { styled } from "@mui/material/styles";

const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundColor: "#000",
});

interface CachedVideoPlayerProps {
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

export interface CachedVideoPlayerRef {
  getVideoElement: () => HTMLVideoElement | null;
  play: () => Promise<void>;
  pause: () => void;
}

const CachedVideoPlayer = forwardRef<CachedVideoPlayerRef, CachedVideoPlayerProps>(
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
    const streamIdRef = useRef<string>("");
    const isPlayingRef = useRef(false);
    const isInitializedRef = useRef(false);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getVideoElement: () => videoRef.current,
      play: async () => {
        if (!videoRef.current) throw new Error('Video element not available');
        return videoRef.current.play();
      },
      pause: () => videoRef.current?.pause(),
    }), []);

    // Memoized stream ID to prevent unnecessary updates
    const getStreamId = useCallback((s: MediaStream | null | undefined) => {
      if (!s) return "null";
      return s.id || `${playerId}-${s.getVideoTracks().length}-${s.getAudioTracks().length}`;
    }, [playerId]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Set video properties once
      video.muted = muted;
      video.autoplay = autoPlay;
      video.playsInline = playsInline;

      const newStreamId = getStreamId(stream);
      const currentStreamId = streamIdRef.current;

      // Only update if stream actually changed
      if (currentStreamId !== newStreamId) {
        
        // Clean up old stream
        if (currentStreamRef.current && currentStreamRef.current !== stream) {
          const oldTracks = currentStreamRef.current.getTracks();
          oldTracks.forEach(track => {
            track.stop();
          });
          video.srcObject = null;
          isPlayingRef.current = false;
        }

        // Set new stream
        if (stream) {
          video.srcObject = stream;
          currentStreamRef.current = stream;
          streamIdRef.current = newStreamId;

          const videoTracks = stream.getVideoTracks();
          if (videoTracks.length > 0) {
            
            // Minimal event listeners
            videoTracks.forEach((track, index) => {
              const handleTrackEnd = () => {
              };
              track.addEventListener('ended', handleTrackEnd);
            });

            // Initialize video element only once
            if (!isInitializedRef.current) {
              const handleLoadedMetadata = () => {
                attemptPlay();
              };

              const handleCanPlay = () => {
                attemptPlay();
              };

              const handlePlay = () => {
                isPlayingRef.current = true;
                onVideoLoad?.();
              };

              const handlePause = () => {
                isPlayingRef.current = false;
              };

              const handleError = (e: Event) => {
                const error = (e.target as HTMLVideoElement).error;
                const errorObj = error ? new Error(error.message) : new Error('Video playback error');
                onVideoError?.(errorObj);
                isPlayingRef.current = false;
              };

              video.addEventListener('loadedmetadata', handleLoadedMetadata);
              video.addEventListener('canplay', handleCanPlay);
              video.addEventListener('play', handlePlay);
              video.addEventListener('pause', handlePause);
              video.addEventListener('error', handleError);
              
              isInitializedRef.current = true;
              
              // Return cleanup function
              return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('play', handlePlay);
                video.removeEventListener('pause', handlePause);
                video.removeEventListener('error', handleError);
                isInitializedRef.current = false;
              };
            }

            // Attempt to play
            attemptPlay();
          } else {
            currentStreamRef.current = null;
            streamIdRef.current = "";
          }
        } else {
          // Clear video
          video.srcObject = null;
          currentStreamRef.current = null;
          streamIdRef.current = "null";
          isPlayingRef.current = false;
        }
      }

      // Play attempt function
      function attemptPlay() {
        if (!video || !stream || isPlayingRef.current) return;
        
        // Check if video is ready to play
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
          video.play().then(() => {
          }).catch(error => {
            const err = error instanceof Error ? error : new Error('Video play failed');
            console.warn(`[CachedVideoPlayer-${playerId}] Play failed:`, err);
            
            if (err.name !== 'NotAllowedError') {
              // Retry once after a short delay
              setTimeout(() => {
                if (video && video.readyState >= 2 && !isPlayingRef.current) {
                  video.play().catch(e => {
                    onVideoError?.(e instanceof Error ? e : new Error('Video retry failed'));
                  });
                }
              }, 1000);
            } else {
              onVideoError?.(err);
            }
          });
        } else {
          // Wait for video to be ready
          const checkReady = () => {
            if (video && video.readyState >= 2 && !isPlayingRef.current) {
              attemptPlay();
            } else if (video && video.readyState < 4) { // HAVE_ENOUGH_DATA
              setTimeout(checkReady, 100);
            }
          };
          checkReady();
        }
      }
    }, [stream, muted, autoPlay, playsInline, playerId, onVideoLoad, onVideoError, getStreamId]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (currentStreamRef.current) {
          currentStreamRef.current.getTracks().forEach(track => {
            track.stop();
          });
        }
      };
    }, []);

    return (
      <VideoElement
        ref={videoRef}
        className={className}
        style={style}
      />
    );
  }
);

CachedVideoPlayer.displayName = 'CachedVideoPlayer';

export default CachedVideoPlayer;
