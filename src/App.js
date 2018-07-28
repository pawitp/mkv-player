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

  onDrop = (accept, reject) => {
    if (accept.length > 0) {
      const file = accept[0];
      this.setState({ loading: true });
      mkvExtract(file, (error, files) => {
        let subtitle;
        const fonts = [];
        for (let f of files) {
          if (f.name.endsWith(".ass") || f.name.endsWith(".ssa"))
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

  render() {
    if (this.state.video) {
      const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: this.state.video,
          type: 'video/webm'
        }],
        subtitle: this.state.subtitle,
        fonts: this.state.fonts
      };
      console.log(videoJsOptions);
      return (
        <VideoPlayer { ...videoJsOptions } />
      )
    } else {
      const loading = this.state.loading ? <Loading /> : "";
      return (
        <div className="App">
          {loading}
          <h1>Web-based MKV Player with ASS/SSA subtitle</h1>
          <Dropzone onDrop={this.onDrop}>
            <p>Drop a file or click here to select a file.</p>
          </Dropzone>
          <p>
            All decoding is done locally on your computer. No files are uploaded.
          </p>
          <p>Made with XXX</p>
          <p>Want a better UI? Contribute now!</p>
        </div>
      );
    }
  }
}

export default App;
