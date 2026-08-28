import { useCallback, useEffect, useRef, useState } from 'react';
import EnquiryForm, { type StudioOption } from './EnquiryForm.tsx';

interface Props {
  studios: StudioOption[];
  fixedStudio?: string;
  successHref: string;
  formId: string;
  heading?: string;
  intro?: string;
  submitLabel?: string;
}

/* The enquiry form in a lightbox.

   This renders the overlay ONLY - the button that opens it lives wherever the
   page wants it, marked `data-enquiry-trigger`, and a delegated listener picks
   up a click on any of them. That split is not cosmetic: `position: fixed` is
   trapped by any ancestor with a transform, and the page's cards and sections
   are transformed by the motion kit, so an overlay nested in the card is
   confined to that column instead of covering the viewport. Rendering it into
   the layout's `body-end` slot keeps it a direct child of <body>.

   The form ships in the initial DOM rather than being mounted on open. Either
   way HighLevel's tracking script finds it (it re-scans on a MutationObserver,
   verified), but shipping it up front means the first scan picks it up and
   capture never depends on observer timing.

   Without JavaScript the lightbox cannot open, so it stops being a lightbox:
   `.no-js` styling renders the panel inline and the page swaps the dead trigger
   for a plain anchor down to it. */
export default function EnquiryLightbox(form: Props) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);      // drives the fade/slide
  const overlay = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setShown(false);
    window.setTimeout(() => setOpen(false), 250);
    document.body.classList.remove('modal-open');
    lastFocus.current?.focus();
  }, []);

  const show = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
    document.body.classList.add('modal-open');
    window.requestAnimationFrame(() => setShown(true));
    window.setTimeout(() => {
      /* preventScroll: focusing the first field would otherwise scroll the
         modal's own overflow container and hide the heading above it */
      overlay.current?.querySelector<HTMLInputElement>('input, select')?.focus({ preventScroll: true });
    }, 200);
  }, []);

  /* any button on the page marked data-enquiry-trigger opens it, delegated so
     it also covers triggers added later (the hero CTA, wired in main.js) */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.('[data-enquiry-trigger]');
      if (!t) return;
      e.preventDefault();
      show();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) close(); };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, show, close]);

  /* keep focus inside the dialog while it is open */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !overlay.current) return;
    const items = overlay.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div id="enquiry" ref={overlay} className={`signup-overlay${shown ? ' show' : ''}`} hidden={!open}
         onClick={(e) => { if (e.target === overlay.current) close(); }}
         onKeyDown={onKeyDown}>
      <div className="signup-modal" role="dialog" aria-modal="true" aria-label={form.heading ?? 'Enquiry form'}>
        <button type="button" className="signup-close" aria-label="Close" onClick={close}>&times;</button>
        <EnquiryForm {...form} />
      </div>
    </div>
  );
}
