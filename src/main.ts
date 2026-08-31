import { Plugin, MarkdownPostProcessorContext } from 'obsidian';

export default class SelfLinkBoldPlugin extends Plugin {
  onload(): void {
    this.registerMarkdownPostProcessor(
      (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        // The note the user is actually looking at. Inside an embed this
        // differs from ctx.sourcePath, which points at the embedded note.

		// Read once at render time, so the result is frozen into the DOM. If another
		// pane has focus at that moment, the reference note may be wrong.
        const basePath =
          this.app.workspace.getActiveFile()?.path ?? ctx.sourcePath;


        el.querySelectorAll<HTMLAnchorElement>('a.internal-link').forEach((a) => {
          const href = (a.getAttribute('data-href') ?? '').replace(/[#|].*$/, '');
          if (!href) return;

          // Resolved against sourcePath: a link written inside an embedded note
          // must be resolved relative to that note, not the one being viewed.
          const dest = this.app.metadataCache.getFirstLinkpathDest(
            href,
            ctx.sourcePath,
          );
          if (dest?.path === basePath) a.addClass('is-self-link');
        });
      },
    );
  }
}