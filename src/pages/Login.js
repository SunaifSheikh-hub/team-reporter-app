import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, onAuthStateChanged, db } from "../routes/Firebase";

const Login = () => {
  // const loginHandler = () => {
  //   window.location.href = "/home";
  //   console.log('homePage')
  // }
  let navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const email = values.email;
    const password = values.password;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email,user.password)
        navigate('/home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
         console.log(error);
      });
    };
    
      useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const lastLoggedin=new Date();
            user.lastLoggedin=lastLoggedin;
            console.log(user.uid,user.lastLoggedin);
           
            // ...
          } else {
            // User is signed out
            // ...
            console.log("no user has logged in")
          }
        });
      },[])


  
  return (
    <div className='container'>
      <div className='logo'>
        <h1>Login Page</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="10"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/">Sign up Here</Link>
          </Form.Item>
        </Form>
      </div></div>
  );
};


export default Login
