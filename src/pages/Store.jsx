import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context-data";
import { BrandService, CategoryService, ProductService } from "../utility/utils";
import { Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Product from "../components/Product";

function Store() {
  let [brands, setbrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products,setProducts] = useState([])
  let[productToShow,setProductToShow] = useState([])
  let[txt,setxt] = useState('')

  //get data from context
  let user = useAuth();

  useEffect(() => {
    (async () => {
      //get brand from db
      let brandRes = await BrandService.fetchBrands();
      let brandResBody = await brandRes.json();
      brandResBody.forEach((ele) => {
        ele.isChecked = true;
      });
      console.log(brandResBody);
      setbrands(brandResBody);
      //get categories from db
      let catRes = await CategoryService.fetchCatagory();
      let catResBody = await catRes.json();
      catResBody.forEach((ele) => {
        ele.isChecked = true;
      });
      console.log(catResBody);
      setCategories(catResBody);
  //get Products from DB
  let productRes = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/products?productName_like=${txt}`,{method:"GET"})
if(productRes.ok){
  let productResBody  = await productRes.json()
productResBody.forEach(ele=>{
  //setbrand in product
ele.brand= BrandService.getBrandByBrandId(brandResBody,ele.brandId)
// set catefory in Product
ele.category = CategoryService.getCategoryByCategoryId(catResBody,ele.categoryId)
// st isordered deafult to false
  ele.isOrdered=false
})
console.log(productResBody);
setProducts(productResBody)
setProductToShow(productResBody)

}

    })();
  }, [txt]);

  //update brand is checkd
  let updateBrandIsChecked = (para) =>{
    // console.log(para);
    //brandData = array
    let brandsData = brands.map(brd=>{
      if(brd.id==para) brd.isChecked = !brd.isChecked
      return brd
    })
    // console.log(brandsData);
    setbrands(brandsData)
    updateProductToShow()
  }
    //update category is checkd
    let updateCategoryIsChecked = (para) =>{
      // console.log(para);
      let catData = categories.map(ele=>{
        if(ele.id==para) ele.isChecked = !ele.isChecked
        return ele
      })
      // console.log(catData);
      setCategories(catData)
      updateProductToShow()


    }

// update ProductToShow
let updateProductToShow = () =>{
  setProductToShow(
    products
    .filter((prod)=>{
    return categories.filter(category=>category.id==prod.categoryId && category.isChecked ) .length>0
  })
.filter(prod=>{
  return brands.filter(brand=>brand.id==prod.brandId && brand.isChecked).length>0
})
)
}

    //product add to cart
  let onADDtoCartClick = useCallback(async(prod)=>{
let newOrder ={
  userId:user?.data?.currentUserId,
  productId:prod.id,
  quantity:1,
  isPaymentCompleted:false
}
let postOrder = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/orders`,{method:'POST',body:JSON.stringify(newOrder),headers:{"Content-Type":"application/json"}})
if(postOrder.ok){
  let postOrderBody = await postOrder.json()
  console.log(postOrderBody);
  //toatify

  let prods = products.map(p=>{
    if(p.id==prod.id) p.isOrdered = true
    return p
  })
  console.log(prods);
  setProducts(prods)
  updateProductToShow()
}
// console.log(products);
    },[user.data.currentUserId,productToShow])


  return (
    <div className="">

      <div className="mt-5">
        <Form.Control
          type="text"
          placeholder="Search Product"
          className="w-50 border border border-3 border-dark-subtle mx-auto fs-5 rounded-5 ps-4"
          value={txt}
          onChange={(e)=>setxt(e.target.value)}
        />
      </div>
      {/* store body */}

      <div className="row gx-0 mt-5 ">

        {/* left */}
        <div className="col-sm-3 ps-4 pe-5 border-end border-1 border-black-50 ">
          <h4 className="mb-3 text-uppercase text-dark-emphasis">Brands</h4>
          <ListGroup>
            {brands.map((ele) => {
              return (
                <ListGroup.Item key={ele.id}>
                  <input
                    type="checkbox"
                    className="form-check-input mx-2"
                    name=""
                    id=""
                    checked={ele.isChecked}
                    onChange={()=>updateBrandIsChecked(ele.id)}
                  />
                  <span>{ele.brandName}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
         
          {/* categories */}
          <h4 className="mt-4 mb-3 text-uppercase text-dark-emphasis">Categories</h4>
          <ListGroup>
            {categories.map((ele) => {
              return (
                <ListGroup.Item key={ele.id}>
                  <input
                    type="checkbox"
                    className="form-check-input mx-2"
                    name=""
                    id=""
                    checked={ele.isChecked}
                    onChange={()=>updateCategoryIsChecked(ele.id)}
                  />
                  <span>{ele.categoryName}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>

        {/* right */}
        <div className="col-sm-9 rounded-3 d-flex flex-wrap justify-content-evenly ">

          {/* product card */}
          {
            productToShow && productToShow.map(prod=>{
              return <Product key={prod.id} 
              product={prod}
              onADDtoCartClick={onADDtoCartClick}

              />
            })
          }
        </div>

      </div>
    </div>
  );
}

export default Store;
