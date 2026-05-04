"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback, useMemo } from "react";
import { styled } from "@mui/material/styles";

const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundColor: "#000",
  willChange: "transform", // Optimize for animations
});

interface StableVideoPlayerProps {
  stream?: MediaStream | null;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onVideoLoad?: () => void;
  onVideoError?: (error: Error) => void;
  playerId?: string; // Unique identifier for debugging
}

export interface StableVideoPlayerRef {
  getVideoElement: () => HTMLVideoElement | null;
  play: () => Promise<void>;
  pause: () => void;
}

const StableVideoPlayer = forwardRef<StableVideoPlayerRef, StableVideoPlayerProps>(
  ({ 
    stream, 
    muted = false, 
    autoPlay = true, 
    playsInline = true, 
    className,
    style,
    onVideoLoad,
    onVideoError,
    playerId = "unknown"
  }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const currentStreamRef = useRef<MediaStream | null>(null);
    const isInitializedRef = useRef(false);
    const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize stream ID to prevent unnecessary re-renders
    const streamId = useMemo(() => {
      if (!stream) return null;
      return stream.id || `${playerId}-${stream.getVideoTracks().length}`;
    }, [stream, playerId]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getVideoElement: () => videoRef.current,
      play: async () => {
        if (!videoRef.current) throw new Error('Video element not available');
        return videoRef.current.play();
      },
      pause: () => videoRef.current?.pause(),
    }), []);

    // Stable play function with debouncing
    const attemptPlay = useCallback(() => {
      if (!videoRef.current || !stream) return;
      
      // Clear any existing timeout
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
      
      // Debounce play attempts
      playTimeoutRef.current = setTimeout(async () => {
        try {
          if (videoRef.current && !videoRef.current.paused) {
            console.log(`[StableVideoPlayer-${playerId}] Video already playing`);
            onVideoLoad?.();
            return;
          }
          
          await videoRef.current!.play();
          console.log(`[StableVideoPlayer-${playerId}] Video play successful`);
          onVideoLoad?.();
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Video play failed');
          console.warn(`[StableVideoPlayer-${playerId}] Play failed:`, err);
          
          // Only retry for specific errors
          if (err.name === 'NotAllowedError') {
            console.warn(`[StableVideoPlayer-${playerId}] Play not allowed by user`);
            return;
          }
          
          // Retry once for other errors
          setTimeout(() => {
            videoRef.current?.play().catch(e => {
              console.error(`[StableVideoPlayer-${playerId}] Retry failed:`, e);
              onVideoError?.(e instanceof Error ? e : new Error('Video retry failed'));
            });
          }, 1000);
        }
      }, 100);
    }, [stream, playerId, onVideoLoad, onVideoError]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Set video properties once
      video.muted = muted;
      video.autoplay = autoPlay;
      video.playsInline = playsInline;

      // Only update stream if it actually changed
      if (video.srcObject !== stream) {
        console.log(`[StableVideoPlayer-${playerId}] Stream changed from ${currentStreamRef.current?.id || 'null'} to ${streamId || 'null'}`);
        
        // Clean up old stream
        if (currentStreamRef.current && currentStreamRef.current !== stream) {
          // Don't stop tracks to prevent camera flickering
          // Just clear the video element and update reference
          video.srcObject = null;
        }

        // Set new stream
        if (stream) {
          video.srcObject = stream;
          currentStreamRef.current = stream;

          const videoTracks = stream.getVideoTracks();
          if (videoTracks.length > 0) {
            console.log(`[StableVideoPlayer-${playerId}] Setting video stream with ${videoTracks.length} tracks`);
            
            // Set up minimal event listeners
            videoTracks.forEach((track, index) => {
              const handleTrackEnd = () => {
                console.log(`[StableVideoPlayer-${playerId}] Video track ${index} ended`);
              };
              
              track.addEventListener('ended', handleTrackEnd);
              
              // Store cleanup function
              return () => {
                track.removeEventListener('ended', handleTrackEnd);
              };
            });

            // Set up video element event listeners (only once)
            if (!isInitializedRef.current) {
              const handleLoadedMetadata = () => {
                console.log(`[StableVideoPlayer-${playerId}] Metadata loaded`);
                attemptPlay();
              };

              const handleCanPlay = () => {
                console.log(`[StableVideoPlayer-${playerId}] Can play`);
                if (video.paused) {
                  attemptPlay();
                }
              };

              const handlePlay = () => {
                console.log(`[StableVideoPlayer-${playerId}] Playing`);
                onVideoLoad?.();
              };

              const handleError = (e: Event) => {
                const error = (e.target as HTMLVideoElement).error;
                console.error(`[StableVideoPlayer-${playerId}] Video error:`, error);
                const errorObj = error ? new Error(error.message) : new Error('Video playback error');
                onVideoError?.(errorObj);
              };

              video.addEventListener('loadedmetadata', handleLoadedMetadata);
              video.addEventListener('canplay', handleCanPlay);
              video.addEventListener('play', handlePlay);
              video.addEventListener('error', handleError);
              
              isInitializedRef.current = true;
              
              // Return cleanup function
              return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('play', handlePlay);
                video.removeEventListener('error', handleError);
                isInitializedRef.current = false;
              };
            }

            // Attempt to play immediately
            attemptPlay();
          } else {
            console.warn(`[StableVideoPlayer-${playerId}] No video tracks found`);
            currentStreamRef.current = null;
          }
        } else {
          // Clear video
          video.srcObject = null;
          currentStreamRef.current = null;
        }
      }
    }, [stream, streamId, muted, autoPlay, playsInline, playerId, attemptPlay, onVideoLoad, onVideoError]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (playTimeoutRef.current) {
          clearTimeout(playTimeoutRef.current);
        }
        // Only stop tracks when component is actually unmounting
        // This prevents camera flickering during stream changes
        if (currentStreamRef.current) {
          currentStreamRef.current.getTracks().forEach(track => {
            track.stop?.();
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

StableVideoPlayer.displayName = 'StableVideoPlayer';

export default StableVideoPlayer;
