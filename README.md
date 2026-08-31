# Self Link Highlighter

Bolds links that point to the note you are currently viewing, the way
MediaWiki render self-links.

## Why

When a note is embedded with `![[...]]`, the embedded content may contain
links back to the note you are reading. Obsidian renders these as ordinary
links, so there is no visual cue that you are already there. This plugin
renders them as plain bold text instead.

## Behaviour

| Situation | Result |
| --- | --- |
| `[[A]]` inside A | bold |
| `[[B]]` inside A | normal link |
| `[[A]]` inside `![[B]]` while viewing A | bold |

Aliases (`[[A\|label]]`) and heading links (`[[A#section]]`) are recognised
as self-links.

## Customising

Add a CSS snippet targeting `.is-self-link` to change the appearance:

    .is-self-link {
      color: var(--text-accent);
    }

## Limitations

Self-links are resolved once, when the content is rendered. If another pane
is focused at that moment, the wrong note may be used as the reference.
Reopening the note fixes it.