import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './ProductDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct } from '../actions/product.js';
// import products from '../data.js';

function ProductDetail(props) { // Route path='/product/:id'


  const [qty, setQty] = useState(1);
  // const product = products.find(p => p._id === props.match.params.id);
  // const [product, setProduct] = useState({});
  const productDetail = useSelector(state => state.productDetail);
  const { product, loading, error } = productDetail;
  const dispatch = useDispatch();

  useEffect( () => {
    //const fetchData = async (id) => {
    //  const {data} = await axios.get(`/api/product/${id}`);
    //  setProduct(data);
    //}
    //fetchData(props.match.params.id);
    dispatch(detailProduct(props.match.params.id));
    return () => {};
  }, []);

  const handleAddToCart = () =>{
    props.history.push("/cart/" + props.match.params.id + "?qty="+ qty)
  }

  return loading? <div> กำลัง load อยู่นะครับ </div> :
          error? <div className="error"> ERRRR {error} </div> : (
    <div>
      <div className="detail">
        <div className="detail-image">
          <img src={product.url} />
        </div>
        <div className="detail-info">
          <ul>
            <li><h4>{product.name}</h4></li>
            <li>{product.stars} ( 100 reviews )</li>
            <li>Price: <b>฿{product.price}</b></li>
            <li>Brand: <i>{product.brand}</i></li>
          </ul>
        </div>
        <div className="detail-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.countInStock > 0 ? "มีของ" : "ขาดของ" } </li>
            <li>จำนวนที่ต้องการ: <select value = {qty} onChange={(e) => {setQty(e.target.value)}}>
                {[...Array(product.countInStock).keys()].map(x=>
                  <option key={x+1} value={x+1}>{x+1}</option>
                  )}
              </select>
            </li>
            <li>
              {product.countInStock > 0 && <button onClick={handleAddToCart} className="checkout primary">เพิ่มลงตะกร้า</button> 
              } 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
