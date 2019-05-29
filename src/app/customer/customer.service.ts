import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Customer} from '../model/customer.model';

const BACKEND_URL = environment.apiUrl + '/customers/';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private customers: Customer[] = [];
  private customerUpdated = new Subject<{ customers: Customer[]; customerCount: number }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  form = this.formBuilder.group({
    id: [''],
    firstName: ['', Validators.compose(([Validators.required, Validators.minLength(2), Validators.maxLength(50)]))],
    lastName: ['', Validators.compose(([Validators.required, Validators.minLength(2), Validators.maxLength(50)]))],
    gender: ['', Validators.compose(([Validators.required]))],
    dob: ['', Validators.compose(([Validators.required]))],
    country: ['', Validators.compose(([Validators.required]))],
    maritalStatus: ['', Validators.compose(([Validators.required]))],
    street: [''],
    city: [''],
    // contacts: this.formBuilder.group({
    //   phone: this.formBuilder.array([this.createPhone()]),
    //   email: this.formBuilder.array([this.createEmail()])
    // }),
    primaryPhone: [''],
    primaryEmail: ['']

  });

  createPhone(): FormGroup {
    return this.formBuilder.group({
      phone: '',
      type: ''
    });
  }

  createEmail(): FormGroup {
    return this.formBuilder.group({
      email: '',
      type: ''
    });
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      country: '',
      maritalStatus: '',
      street: '',
      city: '',
      contacts: {
        phone: [{
          phone: '',
          type: ''
        }],
        email: [{
          email: '',
          type: ''
        }]
      },
      primaryPhone: '',
      primaryEmail: ''
    });
  }

  populateForm(entity) {
    this.form.patchValue(entity);
  }

  getCustomers(customersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${customersPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string; customers: any; maxCustomers: number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(customerData => {
        return {
          customers: customerData.customers.map(customer => {
            return {
              id: customer._id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              gender: customer.gender,
              dob: customer.dob,
              country: customer.country,
              maritalStatus: customer.maritalStatus,
              street: customer.street,
              city: customer.city,
              // contacts?: ContactModel;
              primaryPhone: customer.primaryPhone,
              primaryEmail: customer.primaryEmail
            };
          }),
          maxCustomers: customerData.maxCustomers
        };
      })
    )
    .subscribe(transformedCustomerData => {
      this.customers = transformedCustomerData.customers;
      this.customerUpdated.next({
        customers: [...this.customers],
        customerCount: transformedCustomerData.maxCustomers
      });
    });
  }

  getCustomerUpdateListener() {
    return this.customerUpdated.asObservable();
  }

  getCustomer(id: string) {
    return this.http.get<{
      _id: string;
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
    }>(BACKEND_URL + id);
  }

  addCustomer(
    // firstName: string,
    // lastName: string,
    // gender: string,
    // dob: Date,
    // country: string,
    // maritalStatus: string,
    // street: string,
    // city: string,
    // primaryPhone: string,
    // primaryEmail: string
    customer: Customer
  ) {
    // const customerData = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   gender: gender,
    //   dob: dob,
    //   country: country,
    //   maritalStatus: maritalStatus,
    //   street: street,
    //   city: city,
    //   primaryPhone: primaryPhone,
    //   primaryEmail: primaryEmail
    // };

    this.http
    .post<{ message: string; customer: Customer }>(
      BACKEND_URL,
      customer
    )
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });
  }

  updateCustomer(id: string, customer: Customer) {

    this.http
    .put(BACKEND_URL + id, customer)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  deleteCustomer(customerd: string) {
    return this.http.delete(BACKEND_URL + customerd);
  }
}
