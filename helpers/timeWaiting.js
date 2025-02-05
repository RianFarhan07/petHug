function timeWaiting(createdAt) {
  // Pastikan createdAt adalah objek Date
  const date = new Date(createdAt);
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 0) return "Invalid date";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  if (seconds < 86400) {
    return "Less than a day ago";
  }

  for (const interval of intervals) {
    const result = Math.floor(seconds / interval.seconds);
    if (result >= 1 && interval.label === "day") {
      return `${result} ${interval.label}${result > 1 ? "s" : ""} ago`;
    }
  }

  return `${seconds} seconds ago`;
}

module.exports = {
  timeWaiting,
};
