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
    onVideoError 
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
        // Remove old stream tracks
        if (currentStreamRef.current) {
          currentStreamRef.current.getTracks().forEach(track => {
            video.srcObject = null;
          });
        }

        // Set new stream
        if (stream) {
          video.srcObject = stream;
          currentStreamRef.current = stream;

          // Handle video tracks
          const videoTracks = stream.getVideoTracks();
          if (videoTracks.length > 0) {
            console.log(`[VideoPlayer] Setting video stream with ${videoTracks.length} tracks`);
            
            // Set up video track event listeners
            videoTracks.forEach((_, index) => {
              const track = videoTracks[index];
              console.log(`[VideoPlayer] Video track ${index}:`, track.enabled, track.readyState, track.muted);
              
              track.addEventListener('ended', () => {
                console.log(`[VideoPlayer] Video track ${index} ended`);
              });
              
              track.addEventListener('mute', () => {
                console.log(`[VideoPlayer] Video track ${index} muted`);
              });
              
              track.addEventListener('unmute', () => {
                console.log(`[VideoPlayer] Video track ${index} unmuted`);
              });
            });

            // Try to play the video
            const playVideo = async () => {
              try {
                await video.play();
                console.log(`[VideoPlayer] Video started playing successfully`);
                onVideoLoad?.();
              } catch (error) {
                console.warn(`[VideoPlayer] Video play failed:`, error);
                onVideoError?.(error instanceof Error ? error : new Error('Video play failed'));
              }
            };

            // Set up video element event listeners
            const handleLoadedMetadata = () => {
              console.log(`[VideoPlayer] Video metadata loaded`);
              playVideo();
            };

            const handleCanPlay = () => {
              console.log(`[VideoPlayer] Video can play`);
              if (video.paused) {
                playVideo();
              }
            };

            const handlePlay = () => {
              console.log(`[VideoPlayer] Video is playing`);
            };

            const handlePause = () => {
              console.log(`[VideoPlayer] Video is paused`);
            };

            const handleEnded = () => {
              console.log(`[VideoPlayer] Video ended`);
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
            video.addEventListener('pause', handlePause);
            video.addEventListener('ended', handleEnded);
            video.addEventListener('error', handleError);

            // Clean up function
            return () => {
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('play', handlePlay);
              video.removeEventListener('pause', handlePause);
              video.removeEventListener('ended', handleEnded);
              video.removeEventListener('error', handleError);
              
              videoTracks.forEach((track) => {
                track.removeEventListener('ended', () => {});
                track.removeEventListener('mute', () => {});
                track.removeEventListener('unmute', () => {});
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
    }, [stream, muted, autoPlay, playsInline, onVideoLoad, onVideoError]);

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
