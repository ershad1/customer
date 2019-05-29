export interface Contact {
  phone: Phone[];
  email: Email[];
}

export interface Phone {
  phone: string;
  type?: 'business' | 'home' | null;
}

export interface Email {
  email: string;
  type?: 'business' | 'home' | null;
}


