import CryptoJS from "crypto-js";

export const encrypt = (text) => {
    const key = "key";
    const encrypted = CryptoJS.enc.Hex.stringify(
        CryptoJS.enc.Utf8.parse(
            CryptoJS.AES.encrypt(text.toString(), key).toString()
        )
    );
    return encrypted;
};

export const decrypt = (text) => {
    const key = "key";
    const decrypted = CryptoJS.AES.decrypt(
        CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(text.toString())),
        key
    ).toString(CryptoJS.enc.Utf8);
    return decrypted;
};
