import React,{useState,useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getUserDetails,updateUserProfile} from '../../actions/userActions'
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message.js/Message';

const ProfileScreen = ({location,history}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
    
    useEffect(()=>{
        console.log("user",user);
        if(!userInfo){
            history.push('/')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history,userInfo,dispatch,user])
    const submitHandler=(e)=>{
        e.preventDefault()
        //DISPATCH REGISTER
        if(
            password!==confirmPassword
        ){
            setMessage('Password do not match')
        }else{
            //DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({
                id:user._id,name,email,password
            }))
        }
        
    }
    return (
        
            <Row>
                <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='info'>{message}</Message>}
                {success && <Message variant='success'>Profile Updated Successfully</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>
                    Name    
                    </Form.Label> 
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                    <Form.Label>
                    Email Address    
                    </Form.Label> 
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                    <Form.Label>
                    Password    
                    </Form.Label> 
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmpassword'>
                    <Form.Label>
                    Confirm Password    
                    </Form.Label> 
                    <Form.Control type='password' placeholder='Enter confirmpassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                       
                    <Button type='submit' variant='primary'>
                    Update  
                    </Button>   
                </Form> 
                
                </Col>
                <Col md={9}>
                    <h2>My Order</h2>
                </Col>
            </Row>
    )
}

export default withRouter(ProfileScreen)
