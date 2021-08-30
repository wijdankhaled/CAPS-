"use strict";
require("dotenv").config()
const io =require('socket.io-client')
const host= 'http://localhost:3000/caps'
const connectioncapsNameSpace=io.connect(host)

const faker = require("faker");

connectioncapsNameSpace.on("delivered",(payload)=>{
  console.log(`VENDOR: Thank you for delivering  ${payload.orderId}`);
  console.log(`EVENT { event: 'delivered',
  time:${new Date().toString()},
  payload:
   { store: ${process.env.STORE_NAME},
     orderID: ${payload.orderId},
     customer: ${payload.customer},
     address: ${payload.address}`);

})


setInterval(()=>{

    let order={
        store:process.env.STORE_NAME,
        orderId:faker.datatype.uuid(),
        customer:faker.name.findName(),
        address:faker.address.streetAddress(),
       
    }
    connectioncapsNameSpace.emit('pickup',order)
    

},5000)

