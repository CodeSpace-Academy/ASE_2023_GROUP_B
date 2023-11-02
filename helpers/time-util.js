 export function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} hour ${remainingMinutes} minutes`;
    } else if (hours > 0) {
      return `${hours} hour`;
    } else {
      return `${remainingMinutes} minutes`;
    }
  }
  