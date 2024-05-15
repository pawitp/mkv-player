# mkv-player
Web-based MKV player with subtitle support.

Try it out now: https://mkv-player.netlify.app/

This is a Javascript web-app to play .mkv files with embedded .ass or .ssa
subtitles. Javascript is used to extract the fonts and subtitles before
being rendered using a WebAssembly version of libass.

Especially useful for Chromebooks where there are no native video player
with .ass or .ssa support available.
