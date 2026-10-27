<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Obor pages render from one template (src/routes/$obor.tsx) fed by src/data/obory.ts; add new obory as data only.
- Shared visual primitives (Button, Reveal, Photo and LiveChat) keep homepage and data-driven industry pages consistent without duplicating industry data.
- Keep photo mappings separate from industry business data, with 1600/800px WebP asset pointers and one responsive Photo primitive, to preserve content and avoid expiring hotlinks.
- Homepage floating call examples derive from industry transcripts and pause offscreen; pointer parallax is desktop-only and disabled for reduced motion to keep the experience lightweight and accessible.
- All visual colors and effects are defined as semantic global CSS tokens; feature components reference those tokens rather than independent color values.
