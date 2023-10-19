import url from 'url';

export default function validateURL(inputURL) {
  try {
    const parsedURL = new URL(inputURL);
    // If the URL was successfully parsed, it is valid.
    return true;
  } catch (error) {
    // If an error is thrown, the URL is not valid.
    return false;
  }
}
