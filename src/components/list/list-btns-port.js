export function getExternalUrl(data) {
  return data.match(/External:\s+.*\n/g);
}
