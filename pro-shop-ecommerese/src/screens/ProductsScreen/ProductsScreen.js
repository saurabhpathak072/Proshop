import React,{useState,useEffect} from 'react'
import {Row,Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { listProductDetails } from '../../actions/productActions';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Ratings from '../../components/Ratings/Ratings';


const ProductsScreen = ({history,match}) => {
//    const [product, setProduct] = useState([]);
const [qty, setQty] = useState(1);
const dispatch = useDispatch();
const {loading,error,product} = useSelector(state=>state.productDetails);

   useEffect(()=>{
    //    const fetchProduct = async()=>{
    //        const {data} = await axios.get(`/api/products/${match.params.id}`)
    //        setProduct(data)
    //    }
    //    fetchProduct()
    // //    return ()=>{
    // //     fetchProduct();
    // //    }
    dispatch(listProductDetails(match.params.id))
   },[dispatch,match]);
 

   const addToCartHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
   }
    return (
        <>
         <Link className='btn btn-dark my-3' to='/'>
             Go Back
             </Link> 
    {loading ? <Loader/>:error? <Message variant='danger'>{error}</Message>:(
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>  
        <Col md={3}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
            <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
                <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                Description: {product.description}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Price:
                            </Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Row>
                            <Col>
                            Status :
                            </Col>
                            <Col>
                            {product.countInStock > 0 ? 'In Stocks': 'Out of Stocks'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {
                        product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                      {  [...Array(product.countInStock).keys()].map(x=>{
                                            return (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                    
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    }
                    <ListGroup.Item>
                        <Button
                         onClick={addToCartHandler}
                         className='btn-block'
                         type='button'
                         disabled={product.countInStock === 0}
                        >
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        </Row>  

    )}
          
        </>
    )
}

export default withRouter(ProductsScreen);
