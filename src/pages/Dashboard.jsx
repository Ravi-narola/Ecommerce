import React, { useCallback, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoReloadCircleSharp } from "react-icons/io5";
import { useAuth } from '../context-data';
import { OrderService, ProductService } from '../utility/utils';
import Order from '../components/Order';

function Dashboard() {

let [orders,setOrders] = useState([])

//get context data
  let  {data} =useAuth()


let loadFromDb = useCallback(async()=>{

  let orderResp = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/orders?userId=${data.currentUserId}`)
  if(orderResp.ok){
    let orderRespBody = await orderResp.json()
    // console.log(orderRespBody);

    //get products
    let prodResp =  await ProductService.fetchProducts() 
    if(prodResp.ok){
      let prodRespBody = await prodResp.json()
      // console.log(prodRespBody);

 //merge the matching product with ordr productID
 orderRespBody.forEach(ele=>{
  ele.product = ProductService.getProductByProductID(
    prodRespBody,ele.productId)
 })

    }
   
    setOrders(orderRespBody)
  }else{
    console.log('orders not Fetched Sunccessfully');
  }

},[data?.currentUserId])

useEffect(()=>{
  document.title='Dashboard'
  loadFromDb()
},[data?.currentUserId, loadFromDb])

//buy now click
let onBuyNow = useCallback(async(orderId,userId,productId,quantity)=>{
    // console.log(orderId,userId,productId,quantity);
  
if(window.confirm('Wanna Buy !!!!!')){
  let updateOrder = {
    id:orderId,
    userId:userId,
    productId:productId,
    quantity:quantity,
    isPaymentCompleted:true
  }

  let res = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/orders/${orderId}`,{method:'PUT',body:JSON.stringify(updateOrder),headers:{"Content-type":"application/json"}})
  let resBody = await res.json()
  console.log(resBody);

  loadFromDb()
}


},[loadFromDb])

//on deeltee click
let onDeleteClick = useCallback(async(orderId)=>{
if(window.confirm('Remove From BAG ?')){
  let res = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/orders/${orderId}`,{method:"DELETE"})
  let resBody = await res.json()
  console.log(resBody);
  
  loadFromDb()
}
 
},[loadFromDb])


  return (
   <div className="">
    
    <h4 className="dashboard_bg rounded-bottom-5 border-top border-black-50 d-flex flex-wrap justify-content-between align-items-center bg-light text-success">
      DASHBOARD
      <button onClick={loadFromDb} className='fs-5 btn-outline-success btn'>Refresh <IoReloadCircleSharp className='fs-2'  /></button>
    </h4>
    <Container>
      <Row>
        {/* prevorder */}
        <Col  xs={12} md={6} className='my-3 border-end border-1  '>
          <h4 className='border-bottom text-center pt-2 pb-3 text-uppercase'>Previous Orders</h4>

          {OrderService.getPrevOrders(orders).length === 0 ? <h4 className='text-danger fst-italic my-5 py-2 w-50 text-center mx-auto border-2 border-bottom fw-normal'>No Previous Items </h4>:'' }
            
          <div className='d-flex flex-wrap justify-content-between'>
          {
              OrderService.getPrevOrders(orders).map(ele=>{
                return <Order key={ele.id}
                orderId={ele.id}
                productId={ele.productId}
                userId={ele.userId}
                isPaymentCompleted={ele.isPaymentCompleted}
                quantity={ele.quantity}
                price={ele.product?.price}
                productName={ele.product?.productName}
                onBuyNow={onBuyNow}
                onDeleteClick={onDeleteClick}
                />
              })
            }
          </div>

        </Col>

           {/* prevorder */}
        <Col xs={12} md={6} className='my-3'>
          <h4 className='border-bottom text-center pt-2 pb-3 text-uppercase'>My Cart</h4>
            
          {OrderService.getCart(orders).length === 0 ? <h4 className='text-danger fst-italic my-5 py-2 w-50 text-center mx-auto border-2 border-bottom fw-normal'>No Items In Bag</h4>:'' }

          <div className='d-flex flex-wrap justify-content-between '>
            {
              OrderService.getCart(orders).map(ele=>{
                return <Order key={ele.id}
                      orderId={ele.id}
                      productId={ele.productId}
                      userId={ele.userId}
                      isPaymentCompleted={ele.isPaymentCompleted}
                      quantity={ele.quantity}
                      price={ele.product?.price}
                      productName={ele.product?.productName}
                      onBuyNow={onBuyNow}
                      onDeleteClick={onDeleteClick}
                    />
              })
            }
          </div>

        </Col>
      </Row>
    </Container>
   </div>
  )
}

export default Dashboard