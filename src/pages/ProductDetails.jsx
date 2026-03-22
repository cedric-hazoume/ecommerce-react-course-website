import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'


const ProductDetails = () => {
  const  {id} = useParams()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()

  const { addToCart, cartItems } = useCart();
  

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProduct = getProductById(parseInt(id))

      if (!foundProduct) {
        navigate('/')
        return;
      }

      setProduct(foundProduct)
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div className='page'><p>Loading...</p></div>
  }

  const productInCart = cartItems.find(item => item.id === product.id);

  const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : 0;

  return (
    <div className='page'>
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">
            <h1 className='product-detail-name'>{product?.name}</h1>
            <p className='product-detail-price'>Price: ${product?.price.toFixed(2)}</p>
            <p className='product-detail-description'>{product?.description}</p>
            <button 
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
