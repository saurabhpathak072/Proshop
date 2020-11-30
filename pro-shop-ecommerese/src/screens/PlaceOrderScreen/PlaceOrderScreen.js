import React,{useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import Message from '../../components/Message/Message';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import {createOrder} from '../../actions/orderActions';

const PlaceOrderScreen = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch();
    const addDecimal =(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    //calculate Price
    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc,item)=>acc + item.price * item.qty,0))
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 :100)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state=>state.orderCreate)
    const { order,success,error } = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history,success])
    const placeOrderHandler = ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
        }))
    }
    return (
        <>
          <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address</strong>
                                {' '}{cart.shippingAddress.address}, 
                                {' '}{cart.shippingAddress.city} 
                                {' '}{cart.shippingAddress.postalCode} ,
                                {' '}{cart.shippingAddress.country},
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message>:(
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item,index)=>{
                                        return(
                                            <ListGroup key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                         src={item.image} 
                                                         alt={item.name} 
                                                         fluid 
                                                         rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                         to={`/product/${item.product}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X {item.price} = $ {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup>
                                        )
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>Pricce</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                                {error && <Message variant='danger'>{}</Message>}
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                         </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default withRouter(PlaceOrderScreen);
