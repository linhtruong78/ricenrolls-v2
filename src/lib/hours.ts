export function getOpenStatus(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const t = now.getHours() + now.getMinutes() / 60;

  let open = false;
  if (day >= 1 && day <= 6) open = t >= 12 && t < 20;
  // Sunday (day 0) — closed

  return { open, label: open ? "Open Now" : "Closed" };
}
