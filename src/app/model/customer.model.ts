export interface Customer {
  id: string;          // required
  firstName: string;    // required
  lastName: string;     // required
  gender: string;      //
  dob: Date;
  country: string; // dropdown
  maritalStatus: string;
  street?: string;
  city?: string;
  // contacts?: ContactModel;
  primaryPhone: string;
  primaryEmail: string;
}
