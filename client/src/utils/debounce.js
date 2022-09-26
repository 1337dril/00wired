export default function debounce(cb, delay) {
  let timeout = null;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    const ctx = this;
    timeout = setTimeout(() => {
      timeout = null;
      cb.apply(ctx, args);
    }, delay);
  };
}
