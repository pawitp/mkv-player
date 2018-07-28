/* global SubtitlesOctopus */
import React, { Component } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";

class VideoPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {
      var options = {
        video: this.videoNode,
        subUrl: this.props.subtitle,
        fonts: this.props.fonts,
        workerUrl: "/subtitles-octopus/subtitles-octopus-worker.js"
      };
      this.subtitlesOctopus = new SubtitlesOctopus(options);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.subtitlesOctopus) {
      this.subtitlesOctopus.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
