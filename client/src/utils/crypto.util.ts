/**
 * Crypto utility for securely encrypting/decrypting localStorage values
 * Uses Web Crypto API with AES-GCM for authenticated encryption
 * Now stores a single combined string instead of JSON object
 */

// #region CONFIGURATION
const ENCRYPTION_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // 32-byte key for AES-256
const DELIMITER = '|'; // Used to separate IV from ciphertext
// #endregion

// #region HELPER FUNCTIONS
async function stringToArrayBuffer(str: string): Promise<ArrayBuffer> {
    return new TextEncoder().encode(str).buffer;
}

async function arrayBufferToString(buffer: ArrayBuffer): Promise<string> {
    return new TextDecoder().decode(buffer);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
// #endregion

// #region CRYPTO FUNCTIONS
async function getCryptoKey(): Promise<CryptoKey> {
    const keyBuffer = await stringToArrayBuffer(ENCRYPTION_KEY);
    return crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );
}

export async function encryptBoolean(value: boolean): Promise<string> {
    try {
        const cryptoKey = await getCryptoKey();
        const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
        const encodedValue = new TextEncoder().encode(value.toString());
        
        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            encodedValue
        );

        // Combine IV and ciphertext into a single string
        return `${arrayBufferToBase64(iv.buffer)}${DELIMITER}${arrayBufferToBase64(ciphertext)}`;
    } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Failed to encrypt data');
    }
}

export async function decryptBoolean(encryptedValue: string): Promise<boolean> {
    try {
        if (!encryptedValue.includes(DELIMITER)) {
            throw new Error('Invalid encrypted format');
        }

        const cryptoKey = await getCryptoKey();
        const [ivPart, ciphertextPart] = encryptedValue.split(DELIMITER);
        
        const iv = base64ToArrayBuffer(ivPart);
        const ciphertext = base64ToArrayBuffer(ciphertextPart);
        
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            ciphertext
        );

        const decryptedString = await arrayBufferToString(decrypted);
        return decryptedString === 'true';
    } catch (error) {
        console.error('Decryption failed:', error);
        return false;
    }
}
// #endregion