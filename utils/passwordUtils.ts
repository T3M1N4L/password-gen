import { generate } from 'generate-password-browser';
import zxcvbn from 'zxcvbn';
import { formatDistanceToNow } from 'date-fns';

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  easyToSay: boolean;
  easyToRead: boolean;
  allCharacters: boolean;
};

export const generatePassword = (options: PasswordOptions): string => {
  // Handle "easy to say" passwords
  if (options.easyToSay) {
    return generate({
      length: options.length,
      numbers: false,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: options.easyToRead,
      strict: true,
    });
  }

  // Standard password generation
  return generate({
    length: options.length,
    numbers: options.numbers,
    uppercase: options.uppercase,
    lowercase: options.lowercase,
    symbols: options.symbols,
    excludeSimilarCharacters: options.easyToRead,
    strict: true,
  });
};

export const getPasswordStrength = (password: string): number => {
  return zxcvbn(password).score;
};

export const getTimeToCrack = (password: string): string => {
  const result = zxcvbn(password);
  const crackTimeSeconds = result.crack_times_seconds.offline_slow_hashing_1e4_per_second;

  if (crackTimeSeconds === Infinity) {
    return 'centuries';
  }

  if (crackTimeSeconds >= 1e9 * 365 * 24 * 60 * 60) {
    return 'billions of years';
  } else if (crackTimeSeconds >= 1e6 * 365 * 24 * 60 * 60) {
    return 'millions of years';
  } else if (crackTimeSeconds >= 1000 * 365 * 24 * 60 * 60) {
    return 'thousands of years';
  } else {
    return formatDistanceToNow(new Date(Date.now() + crackTimeSeconds * 1000), { addSuffix: true });
  }
};

