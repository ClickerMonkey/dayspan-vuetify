
import en from './en'
import { VLocaleInput } from '../types';

export default {
  'en': en,
  'en-US': en
} as {
  [locale: string]: VLocaleInput
};

export const defaultLocale: string = 'en'
