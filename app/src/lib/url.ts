/** Base-aware URL helper. The site is served from the root of
    blueprintfitnessldn.com; this keeps working if `base` ever changes again. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (p = '') => `${BASE}/${String(p).replace(/^\//, '')}`;
export const asset = (p: string) => url(p);
