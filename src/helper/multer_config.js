/*
This file contains configuration for storing files uploaded from '/admin/upload' endpoint
*/

import multer from 'multer';
import path from 'path';

// multer config for uploading pricing json files
const pricingStore = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/pricing'));
  },
  // the filename will be <date>.json format. This format is used by '/admin/update-pricing' endpoint
  filename: function(req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10);
    cb(null, currentDate + '-updatePricing.json');
    console.log(file.originalname);
  },
});

// multer config for uploading new laptops json files
const newLaptopsStore = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/new'));
  },
  // the filename will be <date>.json format. This format is used by '/admin/new-laptop' endpoint
  filename: function(req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10);
    cb(null, currentDate + '-newLaptops.json');
    console.log(file.originalname);
  },
});

// only json files are allowed
const fileFilter = function(req, file, cb) {
  const extname = path.extname(file.originalname);
  if (extname !== '.json') {
    return cb(new Error('Only JSON files are allowed'));
  }
  cb(null, true);
};

export {pricingStore, newLaptopsStore, fileFilter};
