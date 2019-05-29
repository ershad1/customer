const Customer = require("../models/customer");

exports.createCustomer = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dob: req.body.dob,
    country: req.body.country,
    maritalStatus: req.body.maritalStatus,
    street: req.body.street,
    city: req.body.city,
    primaryPhone: req.body.primaryPhone,
    primaryEmail: req.body.primaryEmail,
  });
  customer
    .save()
    .then(createdCustomer => {
      res.status(201).json({
        message: "Customer added successfully",
        post: {
          ...createdCustomer,
          id: createdCustomer._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a customer failed!"
      });
    });
};

exports.updateCustomer = (req, res, next) => {

  const customer = new Customer({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dob: req.body.dob,
    country: req.body.country,
    maritalStatus: req.body.maritalStatus,
    street: req.body.street,
    city: req.body.city,
    primaryPhone: req.body.primaryPhone,
    primaryEmail: req.body.primaryEmail,
  });
  Customer.updateOne({ _id: req.params.id}, customer)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.getCustomers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const customerQuery = Customer.find();
  let fetchedCustomers;
  if (pageSize && currentPage) {
    customerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  customerQuery
    .then(documents => {
      fetchedCustomers = documents;
      return Customer.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Customers fetched successfully!",
        customers: fetchedCustomers,
        maxCustomers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching customer failed!"
      });
    });
};

exports.getCustomer = (req, res, next) => {
  Customer.findById(req.params.id)
    .then(customer => {
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Customer not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching customer failed!"
      });
    });
};

exports.deleteCustomer = (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id})
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting customer failed!"
      });
    });
};
