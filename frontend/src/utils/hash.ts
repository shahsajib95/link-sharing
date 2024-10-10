import CryptoJS from "crypto-js";

const secret = process.env.NEXT_PUBLIC_HASH_SECRET as string;

const createHash = (text: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), secret).toString();
};

const removeHash = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, secret);
  try {
    const texts = bytes.toString(CryptoJS.enc.Utf8);
    return texts.slice(1, -1);
  } catch (err) {
    return "";
  }
};

export { createHash, removeHash };
