export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateRandomPosition(index: number): { left: string; top: string; delay: string } {
  return {
    left: `${(index * 5) % 100}%`,
    top: `${(index * 7) % 100}%`,
    delay: `${index * 0.3}s`,
  };
}