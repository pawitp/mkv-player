import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Loading from "./components/Loading";
import VideoPlayer from "./components/VideoPlayer";
import mkvExtract from "./lib/mkvExtract";
import "./App.css";

class App extends Component {
  state = {
    loading: false,
    video: null,
    subtitle: null,
    fonts: []
  };

  dropZoneRef = React.createRef();

  onDrop = (accept, reject) => {
    if (accept.length > 0) {
      const file = accept[0];
      this.setState({ loading: true });
      mkvExtract(file, (error, files) => {
        let subtitle;
        const fonts = [];
        for (let f of files) {
          if ((f.name.endsWith(".ass") || f.name.endsWith(".ssa")) && !subtitle)
            subtitle = URL.createObjectURL(new Blob([f.data]));
          else if (f.name.endsWith(".ttf"))
            fonts.push(URL.createObjectURL(new Blob([f.data])));
        }
        this.setState({
          loading: false,
          video: file.preview,
          subtitle: subtitle,
          fonts: fonts
        });
      });
    }
  };

  componentDidMount() {
    const dropZone = this.dropZoneRef.current;
    window.addEventListener("dragenter", dropZone.onDragEnter);
    window.addEventListener("dragleave", dropZone.onDragLeave);
    window.addEventListener("dragover", dropZone.onDragOver);
    window.addEventListener("drop", dropZone.onDrop);
  }

  render() {
    if (this.state.video) {
      const videoJsOptions = {
        autoplay: true,
        controls: true,
        fluid: true,
        sources: [
          {
            src: this.state.video,
            type: "video/webm"
          }
        ],
        subtitle: this.state.subtitle,
        fonts: this.state.fonts
      };
      console.log(videoJsOptions);
      return <VideoPlayer {...videoJsOptions} />;
    } else {
      const loading = this.state.loading ? <Loading /> : "";
      return (
        <div className="App">
          {loading}
          <h1>Web-based MKV Player with ASS/SSA subtitle</h1>
          <Dropzone onDrop={this.onDrop} ref={this.dropZoneRef}>
            <p className="drop">
              Drop a file anywhere on this page or click here to select a file.
            </p>
          </Dropzone>
          <p>
            All decoding is done locally on your computer. No files are
            uploaded.
          </p>
          <p>
            Local caching is performed. You may access this website even without
            Internet access.
          </p>
          <p>
            Made with <a href="https://reactjs.org/">React</a>,{" "}
            <a href="https://videojs.com/">video.js</a>,{" "}
            <a href="https://github.com/themasch/node-ebml">node-ebml</a>,{" "}
            <a href="https://github.com/qgustavor/mkv-extract">mkv-extract</a>{" "}
            and{" "}
            <a href="https://github.com/Dador/JavascriptSubtitlesOctopus">
              SubtitlesOctopus
            </a>.
          </p>
          <p>
            Want a better UI?{" "}
            <a href="https://github.com/pawitp/mkv-player">Contribute now!</a>
          </p>
        </div>
      );
    }
  }
}

export default App;
