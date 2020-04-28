export default function sleepAsync(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}
