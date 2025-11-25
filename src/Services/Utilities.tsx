// Mark this file as a module
export {};

// ------------------------------
// FORMAT DATE FUNCTION
// ------------------------------
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { year: 'numeric' as const, month: 'short' as const };
  return date.toLocaleString('en-US', options);
};

// ------------------------------
// TIME AGO FUNCTION
// ------------------------------
const timeAgo = (time: string): string => {
  const now = new Date();
  const postDate = new Date(time);
  const diff = now.getTime() - postDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else {
    return `${months} months ago`;
  }
};

// ------------------------------
// GET BASE64 FUNCTION
// ------------------------------
const getBase64 = (file: File | Blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// ------------------------------
// EXPORT FUNCTIONS
// ------------------------------
export { formatDate, timeAgo, getBase64 };
