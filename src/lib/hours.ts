export function getOpenStatus(): { open: boolean; label: string } {
  const now = new Date();
  const t = now.getHours() + now.getMinutes() / 60;

  // Open every day, 11:00 AM – 7:30 PM
  const open = t >= 11 && t < 19.5;

  return { open, label: open ? "Open Now" : "Closed" };
}
