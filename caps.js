"use strict";

const event = require('./event-pool');
require("./driver");
require("./vendor/vendor");

event.on("pickup", (payload) => {
  event.on("in-transit", () => {
    console.log(`Driver: picked up ${payload.Address.zipcode}`);
    console.log(`EVENT { event: 'in-transit',
    time: 2020-03-06T18:27:18.738Z,
    payload:
     { store: ${process.env.storeName},
       orderID: ${payload.Address.zipcode},
       customer: ${payload.customer},
       address: ${payload.Address.city + payload.Address.state} }}`);
  });
});

