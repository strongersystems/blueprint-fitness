import { useState, type FormEvent } from 'react';

export interface StudioOption {
  slug: string;
  name: string;
  formValue: string;
}

interface Props {
  studios: StudioOption[];
  /**
   * Fixed studio for a per-studio landing page. When set, the selector is
   * hidden and this value is submitted as `location`.
   */
  fixedStudio?: string;
  /** where the visitor lands after a successful submit */
  successHref: string;
  heading?: string;
  intro?: string;
  submitLabel?: string;
}

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'location' | 'confirm', string>>;

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
  heading = 'Start with a friendly chat',
  intro = 'Pop your details in and one of the team will give you a ring — no hard sell, ever.',
  submitLabel = 'Book my friendly chat',
}: Props) {
  const [values, setValues] = useState({
    name: '', email: '', phone: '',
    location: fixedStudio ?? '', message: '', confirm: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = 'Please tell us your name.';
    if (!isEmail(values.email.trim())) e.email = 'That email doesn’t look right.';
    if (!isPhone(values.phone.trim())) e.phone = 'Please add a number so the team can give you a ring.';
    if (!values.location) e.location = 'Pick whichever studio is closest — “not sure yet” is fine.';
    if (!values.confirm) e.confirm = 'Please tick to confirm your details are correct.';
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    /* The HighLevel workflow filters on this `location` value; all three
       studio tracking scripts are loaded on this page, so the event is
       attributed and then routed by location at the workflow level. */
    const payload = { ...values, location: fixedStudio ?? values.location };
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'blueprint_enquiry', ...payload });

    setSent(true);
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
      <span className="form-note">Placeholder form — not yet wired to the CRM</span>
      <p className="annotation" style={{ margin: '0 0 .2rem' }}>{intro}</p>
      <h3 className="h-3" style={{ marginBottom: '.9rem' }}>{heading}</h3>
      <form onSubmit={onSubmit} noValidate>
        <div className={`field${errors.name ? ' invalid' : ''}`}>
          <label htmlFor="eq-name">Name</label>
          <input id="eq-name" name="name" type="text" autoComplete="name" value={values.name} onChange={set('name')} />
          <p className="err">{errors.name}</p>
        </div>
        <div className={`field${errors.email ? ' invalid' : ''}`}>
          <label htmlFor="eq-email">Email</label>
          <input id="eq-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} />
          <p className="err">{errors.email}</p>
        </div>
        <div className={`field${errors.phone ? ' invalid' : ''}`}>
          <label htmlFor="eq-phone">Phone number</label>
          <input id="eq-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} />
          <p className="err">{errors.phone}</p>
        </div>

        {!fixedStudio && (
          <div className={`field${errors.location ? ' invalid' : ''}`}>
            <label htmlFor="eq-loc">Which studio?</label>
            <select id="eq-loc" name="location" value={values.location} onChange={set('location')}>
              <option value="">Choose a studio…</option>
              {studios.map((s) => (<option key={s.slug} value={s.formValue}>{s.name}</option>))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
            <p className="err">{errors.location}</p>
          </div>
        )}

        <div className="field">
          <label htmlFor="eq-msg">Anything we should know? <span style={{ opacity: .6, fontWeight: 500 }}>(optional)</span></label>
          <textarea id="eq-msg" name="message" rows={4} value={values.message} onChange={set('message')} />
        </div>

        <div className={`field${errors.confirm ? ' invalid' : ''}`}>
          <label className="check-field">
            <input type="checkbox" name="confirm" checked={values.confirm} onChange={set('confirm')} />
            <span>I confirm the details above are correct.</span>
          </label>
          <p className="err">{errors.confirm}</p>
        </div>

        <button className="btn btn-primary btn-big" type="submit" style={{ width: '100%' }}>{submitLabel}</button>
      </form>
    </>
  );
}
