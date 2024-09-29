import React from 'react'


   function App1(props) {

    

    const paymentHandler = async (event) => {
        const amount = props.data;
        const currency = 'INR';
        const receiptId = '1234567890';
         const response = await fetch('http://localhost:4000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            })
        });
        const order = await response.json();
        console.log('order', order);

        var option = {
            key:"",
            amount,
            currency,
            name:"Deepak Panwar",
            description: "Test Transaction",
            image:"",
            order_id:order.id,
            handler: async function(response) {
                alert("Transaction Successful");
            },
            prefill: {
                name: "Deepak Panwar",
                email: "deepakpanwar@example.com",
                contact: "9000000000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        } 

        var rzp1 = new Razorpay(option);
        rzp1.on("payment.failed", function(response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata);
            alert(response.error.metadata.payment_id);
        })
          rzp1.open();
          event.preventDefault();
    }
  return (
    <div>
        
      <button className='button' onClick={paymentHandler} >PROCEED TO CHECKOUT</button>
    </div>
  )
}

export default App1
