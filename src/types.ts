export interface Product {
  name: string;
  description: string | null;
  images: string[];
}

export interface Section {
  price: string;
  products: Product[];
}

export type ProductMap = Record<string, Section>;

export interface User {
  iss: string; // Issuer Identifier
  sub: string; // Subject Identifier
  aud: string; // Audience(s)
  iat: number; // Issued At
  exp: number; // Expiration Time
  auth_time?: number; // Authentication Time
  nonce?: string; // Value used to associate a Client session with an ID Token
  acr?: string; // Authentication Context Class Reference
  amr?: string[]; // Authentication Methods References
  azp?: string; // Authorized party - the party to which the ID Token was issued
  
  // Additional claims specific to Google
  email?: string;
  email_verified?: boolean;
  at_hash?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
}
