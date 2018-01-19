export function generateHash(text: string): string {
  const payloadString = JSON.stringify({
    text: text
  });
  return `#@query=${payloadString}`;
}