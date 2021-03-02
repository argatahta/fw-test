import React from 'react';

import { Form, Input, Button, Spin } from 'antd';
import { LockOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons';
import { Wrapper } from "./styles";

export default function LoginForm(props) {
    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.onLogin(values);
    };

    return (
        <Wrapper>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item className="login-form-title">
                    <h2>User Login</h2>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        {
                            type: 'email',
                            message: 'Please input a valid email'
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                    />
                </Form.Item>
                <div style={{ color: "red", marginBottom: "0.5rem", textAlign: "right" }}>
                    {props.error}
                </div>
                <Form.Item>
                    <Button disabled={props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                        {props.isLoading ? <LoadingOutlined style={{ fontSize: 18 }} spin /> : "Log in"}
                    </Button>
                </Form.Item>
               
                {/* 
                <Form.Item>
                    Are you {isAdmin? "not admin" : "admin"}? <a onClick={()=>setIsAdmin(!isAdmin)}>Click here</a>
                </Form.Item> */}
            </Form>
        </Wrapper>

    );
}