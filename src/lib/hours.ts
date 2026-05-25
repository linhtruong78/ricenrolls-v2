export function getOpenStatus(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const t = now.getHours() + now.getMinutes() / 60;

  let open = false;
  if (day >= 1 && day <= 4) open = t >= 11 && t < 19;
  else if (day === 5)        open = t >= 11 && t < 20;
  else if (day === 6)        open = t >= 12 && t < 19;
  else if (day === 0)        open = t >= 15 && t < 19;

  return { open, label: open ? "Open Now" : "Closed" };
}
