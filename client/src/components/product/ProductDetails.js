import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReview from '../review/ListReview'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { 
  getProductDetails, 
  clearErrors,
  newReview
} from '../../actions/productActions'

import { addItemToCart } from '../../actions/cartActions'
//import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = ({ match }) => {

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { 
    loading, 
    error, 
    product: {
      _id,
      name,
      images,
      title,
      ratings,
      numOfReviews,
      price,
      description,
      seller,
      stock,
      reviews
    } 
  } = useSelector(state => state.productDetails);

  const { user } = useSelector(state => state.auth);
  const { error: reviewError, success } = useSelector(state => 
    state.newReview)
 
  useEffect(() => {

    dispatch(getProductDetails(match.params.id));

    if(error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if(reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors);
    }

    if (success) {
      alert.success('Review posted. Thank you for giving us your opinion');
    }

  }, [dispatch, alert, error, match.params.id, reviewError, success])

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success('Item Added to Cart');
  }

  const increaseQty = () => {
    const count = document.querySelector('.count');

    if(count.valueAsNumber >= stock) return;

    const qty = count.valueAsNumber+1;
    setQuantity(qty);
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if(count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber-1;
    setQuantity(qty);
  }

  const setUserRatings= () => {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function(e) {
        star.addEventListener(e, showRatings);
      })
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if(e.type === 'click') {
          if(index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }
        if(e.type === 'mouseover') {
          if(index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }
        if(e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', match.params.id);

    dispatch(newReview(formData));
  }

  return ( 
    <>
    {loading ? <Loader /> : (
      <>
       <MetaData title={name}  />
      <div className="row f-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <Carousel pause='hover'>
          {images && images.map(image => (
            <Carousel.Item key={image.public_id}>
              <img
                className="d-block w-100"
                src={image.url} 
                alt={title}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="col-12 col-lg-5 mt-5">
      <h3>{name}</h3>
      <p id="product_id">Product # {_id}</p>

      <hr/>

      <div className="rating-outer">
        <div 
          className="rating-inner" 
          style={{ width: `${(ratings/5) * 100}%` }}></div>
      </div>
      <span id="no_of_reviews">{numOfReviews}</span>

      <hr/>

      <p id="product_price">{price}</p>
      <div className="stockCounter d-inline">
        <span className="btn btn-danger minus" 
        onClick={decreaseQty}>-</span>
        <input 
        type="number" 
        className="form-control count d-inline" 
        value={quantity}
        readOnly 
        />
        <span className="btn btn-primary plus" 
        onClick={increaseQty}>+</span>
      </div>
      <button 
      type="button" 
      id="cart_btn" 
      className="btn btn-primary d-inline ml-4" 
      disabled={stock === 0}
      onClick={addToCart}>Add to Cart</button>

      <hr/>

      <p>Status: 
        <span
        id="stock_status" 
        className={stock > 0 ? 'greenColor' : 'redColor'}>
          {stock > 0 ? "In Stock" : "Out ofStock"}
        </span>
      </p>

      <hr/>

      <h4 className="mt-2">Description:</h4>
      <p>{description}</p>

      <hr/>
      
      <p id="product_seller mb-3">
        Sold by: <strong>{seller}</strong>
      </p>

      {user ? <button 
        id="review_btn" 
        type="button" 
        className="btn btn-primary mt-4" 
        data-toggle="modal" 
        data-target="#ratingModal"
        onClick={setUserRatings}
        >
        Submit Your Review
        </button> : <div className="alert alert-danger mt-5">
        <p class="muted">
          Only logged in users can post reviews. <Link to="/login">Login Here</Link>
        </p>
        
        <p class="muted">
          Don't have an account ? <Link to="/register">Register Here</Link>
        </p>
        
        </div>
      }
				
      <div className="row mt-2 mb-5">
        <div className="rating w-50">

          <div 
            className="modal fade" 
            id="ratingModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="ratingModalLabel" 
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button 
                  type="button" 
                  className="close" 
                  data-dismiss="modal" 
                  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <ul className="stars" >
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                  </ul>

                  <textarea 
                    name="review" 
                    id="review" 
                    className="form-control mt-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    >
                  </textarea>

                  <button 
                    className="btn my-3 float-right review-btn px-4 text-white" 
                    data-dismiss="modal" 
                    aria-label="Close"
                    onClick={reviewHandler}
                    >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {reviews && reviews.length > 0 && (
    <ListReview reviews={reviews} />
  )}
  </>
  )}
  </>
)}

export default ProductDetails
