export const convertMarksToHtml = (str) => {
  if (!str) return str;
  return str.replace(/==([^=]+)==/g, "<mark>$1</mark>");
};

export const convertHtmlToMarks = (str) => {
  if (!str) return str;
  return str.replace(/<mark[^>]*>(.*?)<\/mark>/g, "==$1==");
};