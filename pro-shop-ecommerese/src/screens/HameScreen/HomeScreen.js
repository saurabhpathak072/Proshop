import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import Product from '../../components/Product/Product';
// import axios from 'axios';
import {listProducts} from '../../actions/productActions';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state=>state.productList);

    const {loading,error,products}=productList;
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        dispatch(listProducts())
        // const fetchProducts=async()=>{
        //     const {data} = await axios.get('/api/products')
        //     setProducts(data);
        // }
        // fetchProducts();
        // return () => {
        //     fetchProducts();
        // }
    }, [dispatch])
    return (
        <>
            <h1>Latest Product</h1>  
    {loading ? <Loader/>:error ? <Message variant='danger'>{error}</Message>:            <Row>
                {
                    products.map(product=>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product products={product}/>
                        </Col>
                    ))
                }
                </Row> }

        </>
    )
}

export default HomeScreen
