import { useRef, useState, type FormEvent } from 'react';

export interface StudioOption {
  slug: string;
  name: string;
  formValue: string;
}

interface Props {
  studios: StudioOption[];
  /**
   * Fixed studio for a per-studio landing page. When set, the selector is
   * replaced by a read-only field carrying this value as `location`.
   */
  fixedStudio?: string;
  /** where the visitor lands after a successful submit */
  successHref: string;
  /**
   * Becomes the form's id and name. HighLevel's tracking script reads the id
   * first, so this is the label the submission shows up under in the CRM
   * (without it, every form on the site reports as "Unidentified Form").
   * Must be a valid HTML id - no spaces.
   */
  formId: string;
  heading?: string;
  intro?: string;
  submitLabel?: string;
}

type Field = 'name' | 'email' | 'phone' | 'location' | 'confirm';
type Errors = Partial<Record<Field, string>>;

/* keep the filled-in form in the DOM long enough for the tracking script's
   50ms post-click re-read to find it populated */
const HOLD_MS = 400;

const WS = String.fromCharCode.apply(null, [32, 9, 10, 13, 12, 11]) as string;
const hasWs = (s: string) => s.split('').some((c) => WS.indexOf(c) !== -1);

function isEmail(v: string) {
  if (!v || hasWs(v)) return false;
  const at = v.indexOf('@');
  if (at < 1 || v.indexOf('@', at + 1) !== -1) return false;
  const dom = v.slice(at + 1);
  const dot = dom.indexOf('.');
  return dot >= 1 && dot <= dom.length - 2;
}
const isPhone = (v: string) => new RegExp('^[+0-9][0-9' + WS + '()-]{6,}$').test(v);

export default function EnquiryForm({
  studios,
  fixedStudio,
  successHref,
  formId,
  heading = 'Start with a friendly chat',
  intro = 'Pop your details in and one of the team will give you a ring — no hard sell, ever.',
  submitLabel = 'Book my friendly chat',
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  /* The fields are UNCONTROLLED on purpose. HighLevel's tracking script reads
     the submission straight off the DOM with new FormData(form), so the DOM has
     to be the single source of truth. Controlled inputs broke that: this island
     hydrates on scroll, and hydration resets a controlled input to its initial
     React state - wiping anything the browser had autofilled before the section
     came into view, and handing the tracker a form full of empty strings. */
  const read = () => {
    const d = new FormData(formRef.current as HTMLFormElement);
    const g = (k: string) => String(d.get(k) ?? '').trim();
    return {
      name: g('name'), email: g('email'), phone: g('phone'),
      location: g('location'), message: g('message'),
      confirm: d.get('confirm') != null,
    };
  };

  const clear = (k: Field) => () => {
    setErrors((s) => (s[k] ? { ...s, [k]: undefined } : s));
  };

  function validate(v: ReturnType<typeof read>): Errors {
    const e: Errors = {};
    if (!v.name) e.name = 'Please tell us your name.';
    if (!isEmail(v.email)) e.email = 'That email doesn’t look right.';
    if (!isPhone(v.phone)) e.phone = 'Please add a number so the team can give you a ring.';
    if (!v.location) e.location = 'Pick whichever studio is closest — “not sure yet” is fine.';
    if (!v.confirm) e.confirm = 'Please tick to confirm your details are correct.';
    return e;
  }

  /* HighLevel's external tracking script is what delivers this submission to
     the CRM - there is no POST of our own. It listens for the form's native
     submit event in the CAPTURE phase, bound to the form element itself, so it
     reads the fields before this handler runs: preventDefault() below stops the
     browser navigating, not the tracker. It also re-reads the form 50ms after
     any click on a submit button, which is why the success state is held back
     briefly rather than swapped in instantly - that fallback has to find the
     form still mounted and still populated.

     Requirements this form has to keep meeting (HighLevel's own list):
     a real <form> in the page DOM (never an iframe), a `name` on every field we
     want captured, none of them disabled, type="email" and type="tel" so
     contacts can be matched, and a native <button type="submit">. Note that
     hidden inputs are explicitly skipped by the tracker, which is why a fixed
     studio is carried by a read-only visible field rather than a hidden one.

     The click fallback fires on EVERY press of the button, including one that
     fails the validation below, so a half-filled form can reach the CRM.
     Submissions matched by email collapse onto the same contact, so this shows
     up as partial-lead capture rather than duplicates - guard the workflow on
     email being present. */
  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const values = read();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      const el = formRef.current?.querySelector<HTMLElement>('[name="' + first + '"]');
      el?.focus();
      return;
    }

    /* The HighLevel workflow filters on this `location` value; all three studio
       tracking scripts are loaded on the main site, so the event is attributed
       to each and then routed by location at the workflow level. */
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'blueprint_enquiry', ...values });

    window.setTimeout(() => setSent(true), HOLD_MS);
    window.setTimeout(() => { window.location.href = successHref; }, 2500);
  }

  if (sent) {
    return (
      <div className="form-success show" role="status">
        <span className="stamp">Plan approved</span>
        <h3 className="h-2" style={{ marginTop: '1.2rem' }}>Lovely — you’re in.</h3>
        <p style={{ color: '#EAF1FB' }}>Taking you to your next steps…</p>
        <p><a className="btn btn-ghost" href={successHref}>Or go there now</a></p>
      </div>
    );
  }

  return (
    <>
      <p className="annotation" style={{ margin: '0 0 .2rem' }}>{intro}</p>
      <h3 className="h-3" style={{ marginBottom: '.9rem' }}>{heading}</h3>
      <form id={formId} name={formId} ref={formRef} onSubmit={onSubmit} noValidate>
        <div className={`field${errors.name ? ' invalid' : ''}`}>
          <label htmlFor="eq-name">Name</label>
          <input id="eq-name" name="name" type="text" autoComplete="name" onInput={clear('name')} />
          <p className="err">{errors.name}</p>
        </div>
        <div className={`field${errors.email ? ' invalid' : ''}`}>
          <label htmlFor="eq-email">Email</label>
          <input id="eq-email" name="email" type="email" autoComplete="email" onInput={clear('email')} />
          <p className="err">{errors.email}</p>
        </div>
        <div className={`field${errors.phone ? ' invalid' : ''}`}>
          <label htmlFor="eq-phone">Phone number</label>
          <input id="eq-phone" name="phone" type="tel" autoComplete="tel" onInput={clear('phone')} />
          <p className="err">{errors.phone}</p>
        </div>

        <div className={`field${errors.location ? ' invalid' : ''}`}>
          <label htmlFor="eq-loc">Which studio?</label>
          {fixedStudio ? (
            /* read-only rather than hidden: the tracker skips hidden inputs, so
               a hidden field would drop `location` from the CRM submission */
            <input id="eq-loc" name="location" type="text" readOnly defaultValue={fixedStudio}
                   tabIndex={-1} aria-readonly="true" style={{ opacity: .75, cursor: 'default' }} />
          ) : (
            <select id="eq-loc" name="location" defaultValue="" onChange={clear('location')}>
              <option value="">Choose a studio…</option>
              {studios.map((s) => (<option key={s.slug} value={s.formValue}>{s.name}</option>))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          )}
          <p className="err">{errors.location}</p>
        </div>

        <div className="field">
          <label htmlFor="eq-msg">Anything we should know? <span style={{ opacity: .6, fontWeight: 500 }}>(optional)</span></label>
          <textarea id="eq-msg" name="message" rows={4} />
        </div>

        <div className={`field${errors.confirm ? ' invalid' : ''}`}>
          <label className="check-field">
            <input type="checkbox" name="confirm" onChange={clear('confirm')} />
            <span>I confirm the details above are correct.</span>
          </label>
          <p className="err">{errors.confirm}</p>
        </div>

        <button className="btn btn-primary btn-big" type="submit" style={{ width: '100%' }}>{submitLabel}</button>
      </form>
    </>
  );
}
