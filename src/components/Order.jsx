import React, { useState } from 'react'
import { BiRupee } from 'react-icons/bi';

function Order(props) {

let [data] = useState(props)
// console.log(data);

let {isPaymentCompleted, orderId, price, productId,productName, quantity,userId,onBuyNow,    onDeleteClick
    } = data

    console.log(isPaymentCompleted);

    // console.log('Order COMPO');
  return (
    <div className='border bg-light p-3 rounded-2 my-3 m-auto' style={{width:'300px'}}>
        <h4 className='fst-italic pb-2 border-bottom text-center mt-5 pb-5'>{productName}</h4>
        
        <h6 className='text-dark-emphasis pt-3'>Quantity : {quantity}</h6>
        <h6 className='text-dark-emphasis pb-2'>Price : <BiRupee className='fs-6 mb-1 text-dark-emphasis '/>{price.toFixed(2)}</h6>

          {
            isPaymentCompleted===true ?
            ""
            :
            <div className="buttons p-2 d-flex justify-content-evenly ">
              <button
                onClick={()=>onBuyNow(orderId,userId,productId,quantity)}
                className='btn btn-outline-warning'>Buy Now</button>
              <button
                onClick={()=>onDeleteClick(orderId)}
                className='btn btn-outline-danger'>Remove</button>
            </div>
          }

    </div>
  )
}

export default React.memo(Order)