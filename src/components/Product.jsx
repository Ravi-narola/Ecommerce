import React from 'react'
import { Button } from 'react-bootstrap'
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function Product({product,onADDtoCartClick}) {

  let {productName,price,brand,category,rating,isOrdered} = product

  return (
    <div>
      <div className='text-dark border p-3 m-3 rounded bg-light' style={{width:'300px'}}>
        <h3 className="fs-2 py-4 ">{productName}</h3>
          <div className=" text-dark-emphasis  ">
            <h6>Brand : {brand.brandName}</h6>
            <h6>Category : {category.categoryName}</h6>
          </div>
          
          <div className="rating text-warning my-2">
            {
              [...Array(rating).keys()].map(ele=>{
                return <FaStar key={ele} />
              })
            }
            {
              [...Array(5-rating).keys()].map(ele=>{
                return <CiStar key={ele} />
              })
            }
          </div>
          
          <h4><BiRupee className='fs-6 mb-2 text-dark-emphasis '/>
            {price.toFixed(2)}
          </h4>
        
        <hr />

        <div className="mt-2">
          {
            isOrdered===false 
          ?
            <Button onClick={()=>onADDtoCartClick(product)} variant='outline-warning' className='mx-auto d-block '>Add To Cart</Button>
          :
            <span className='text-success text-center d-block '>Product Added !</span>
          }
        </div>
      </div>
    </div>
  )
}

export default Product