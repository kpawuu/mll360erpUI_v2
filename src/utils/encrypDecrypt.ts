// Using Web Crypto API instead of Node.js crypto module
// This makes the code compatible with browser environments

// Secret key and initialization vector settings
// In a production environment, these should be stored securely
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-secret-key-must-be-32-chars';
const IV_LENGTH = 16; // For AES, this is always 16 bytes

/**
 * Converts a string to an ArrayBuffer
 */
function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

/**
 * Converts an ArrayBuffer to a string
 */
function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(new Uint8Array(buffer));
}

/**
 * Converts a base64 string to an ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Converts an ArrayBuffer to a base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Derives a key from a password using PBKDF2
 */
async function deriveKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  // Use a salt (ideally this would be stored/retrieved securely)
  const salt = encoder.encode('salt-for-key-derivation');
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts a string using AES-CBC encryption.
 * 
 * @param text - The string to encrypt
 * @returns The encrypted string in base64 format with IV prepended
 */
export const encrypt = async (text: string): Promise<string> => {
  try {
    // Generate a random initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    
    // Derive the key from the encryption key
    const key = await deriveKey(ENCRYPTION_KEY);
    
    // Encrypt the text
    const encodedText = new TextEncoder().encode(text);
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv
      },
      key,
      encodedText
    );
    
    // Convert the encrypted data to base64
    const encryptedBase64 = arrayBufferToBase64(encryptedBuffer);
    
    // Convert IV to base64 and prepend to the encrypted string with a delimiter
    const ivBase64 = arrayBufferToBase64(iv);
    
    return `${ivBase64}:${encryptedBase64}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts a string that was encrypted using the encrypt function.
 * 
 * @param encryptedText - The encrypted string in the format "iv:encryptedData" (both base64 encoded)
 * @returns The decrypted string
 */
export const decrypt = async (encryptedText: string): Promise<string> => {
  try {
    // Validate input
    if (!encryptedText || typeof encryptedText !== 'string') {
      throw new Error('Invalid encrypted text: input must be a non-empty string');
    }

    // Split the encrypted text to get the IV and the actual encrypted data
    const textParts = encryptedText.split(':');
    if (textParts.length !== 2) {
      throw new Error('Invalid encrypted text format: expected format is "iv:encryptedData"');
    }
    
    // Validate parts are not empty
    if (!textParts[0] || !textParts[1]) {
      throw new Error('Invalid encrypted text format: IV or encrypted data is empty');
    }
    
    // Extract the IV and encrypted data
    const iv = base64ToArrayBuffer(textParts[0]);
    const encryptedData = base64ToArrayBuffer(textParts[1]);
    
    // Derive the key from the encryption key
    const key = await deriveKey(ENCRYPTION_KEY);
    
    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: new Uint8Array(iv)
      },
      key,
      encryptedData
    );
    
    // Convert the decrypted buffer to a string
    return new TextDecoder().decode(new Uint8Array(decryptedBuffer));
  } catch (error) {
    console.error('Decryption error:', error);
    if (error instanceof Error) {
      throw error; // Re-throw the original error with its specific message
    }
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Generates a secure random token of specified length.
 * 
 * @param length - The length of the token to generate (default: 32)
 * @returns A random hex string of the specified length
 */
export const generateToken = (length: number = 32): string => {
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(randomValues)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Creates a hash of a string using SHA-256.
 * 
 * @param text - The string to hash
 * @returns A Promise that resolves to the hashed string
 */
export const hash = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert the hash to a hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Creates an HMAC signature for data verification.
 * 
 * @param text - The string to sign
 * @param secret - The secret key to use for signing
 * @returns A Promise that resolves to the HMAC signature
 */
export const createHmac = async (text: string, secret: string): Promise<string> => {
  const encoder = new TextEncoder();
  
  // Import the secret key
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );
  
  // Sign the text
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(text)
  );
  
  // Convert the signature to a hex string
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};
