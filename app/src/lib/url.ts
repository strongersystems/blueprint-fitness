/** Base-aware URL helper — the site is served from /blueprint-fitness/. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (p = '') => `${BASE}/${String(p).replace(/^\//, '')}`;
export const asset = (p: string) => url(p);
