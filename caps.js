"use strict";

require('dotenv').config()
const { Socket } = require('socket.io-client');

const port=3000
const io=require('socket.io')(port)//  http://localhost:3000
const capsNamespace=io.of('/caps') // http://localhost:3000/caps

capsNamespace.on('connection',(socket)=>{
  console.log('im connect')
  socket.on('pickup',(payload)=>{
    console.log(`EVENT { event: 'pickup',
    time: 2020-03-06T18:27:17.732Z,
    payload:
     { store: ${process.env.STORE_NAME},
       orderID: ${payload.orderId},
       customer: ${payload.customer},
       address: ${payload.address} }}`);
       console.log(`Driver: picked up ${payload.orderId}`);
   
    
    capsNamespace.emit('pickup',payload)
   
  })
 
  socket.on('in-transit',(payload)=>{
      
  
    console.log(`EVENT { event: 'in-transit',
    time: 2020-03-06T18:27:18.738Z,
    payload:
     { store: ${process.env.STORE_NAME},
       orderID: ${payload.orderId},
       customer: ${payload.customer},
       address: ${payload.address}`)
      
       

       capsNamespace.emit('in-transit',payload)  
  })
  socket.on('delivered',(payload)=>{

    console.log(`VENDOR: Thank you for delivering  ${payload.orderId}`);
  console.log(`EVENT { event: 'delivered',
  time:${new Date().toString()},
  payload:
   { store: ${process.env.STORE_NAME},
     orderID: ${payload.orderId},
     customer: ${payload.customer},
     address: ${payload.address}`);

  capsNamespace.emit("delivered",payload)
     
})


})