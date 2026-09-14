/** Local product: no Grok install chrome, no grok.com injector. */
export default async function grokPwaMiddleware(
  _event: unknown,
  next: () => unknown | Promise<unknown>,
) {
  return next();
}
