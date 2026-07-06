# Drop your audio clips here

The playlist section looks for these exact filenames (matched in `wrappedData.topSongs` inside `script.js`):

| File                      | Song              | Artist(s)                          |
|---------------------------|-------------------|-------------------------------------|
| `nuestra-cancion.mp3`     | Nuestra Canción   | Monsieur Periné, Vicente García     |
| `haseen.mp3`              | Haseen            | Talwiinder, NDS, Rippy Grewal       |
| `gallan-4.mp3`            | Gallan 4          | Talwiinder                          |
| `dhundhala.mp3`           | Dhundhala         | Yashraj, Dropped Out, Talwiinder    |
| `paro.mp3`                | Paro              | Aditya Rikhari                      |

Short 20–30 second clips work best (keeps the repo light and playback instant).

Until these files exist, clicking play just quietly does nothing (no console errors, no crash) —
the button gives a small shake to let you know. Drop the mp3s in and it works immediately, no
code changes needed.

If you want different filenames, update the `file` path for each song in the
`wrappedData.topSongs` array near the top of `script.js`.
