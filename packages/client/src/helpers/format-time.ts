export const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}д`;
  }
  if (hours > 0) {
    return `${hours}ч`;
  }
  if (minutes > 0) {
    return `${minutes}м`;
  }
  return 'только что';
}; 