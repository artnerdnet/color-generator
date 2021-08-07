export const decToHex = (value) => {
  return value.toString(16).padStart(2, "0").toUpperCase();
};

export const rgbToHex = (r, g, b) => {
  return "#" + decToHex(r) + decToHex(g) + decToHex(b);
};

export const copyToClipboard = (toCopy) => {
  navigator.clipboard.writeText(toCopy);
};