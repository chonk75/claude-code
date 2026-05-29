# Voice demo recordings

Drop your ElevenLabs call recordings here, then point the site at them.

## How to publish a demo

1. Export your call as an `.mp3` (or `.wav`) and copy it into this folder, e.g.
   `public/demos/new-patient.mp3`.

2. Open `lib/config.ts`, find the `voiceDemos` array, and set the matching
   item's `audioSrc` to the public path (note: no `public/` prefix):

   ```ts
   {
     id: "new-patient",
     title: "New patient — booking a cleaning",
     clinic: "Bright Smile Dental",
     // ...
     audioSrc: "/demos/new-patient.mp3",  // ← was ""
   }
   ```

3. Save. The card on the homepage automatically turns from
   "Demo coming soon" into a working audio player. That's it.

You can add as many demos as you like — just add more objects to the
`voiceDemos` array with their own `audioSrc`.
