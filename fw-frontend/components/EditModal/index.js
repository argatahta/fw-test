import React from "react";
import { Modal, Button, Form, Input, Spin, Select, Tag } from 'antd';
import { CompactPicker } from 'react-color';

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Wrapper } from "./styles";

const formOptions = {
    labelCol: { span: 8 },
    labelAlign: "left"
}

export default function EditModal(props) {
    const [formRef, setFormRef] = React.useState(null);
    const [theme, setTheme] = React.useState('#000000');
    const onFinish = () => {
        formRef.validateFields()
            .then(values => {
                values.theme = theme.split('#')[1]
                props.handleOk(values)
                // formRef.resetFields();
            })
            .catch(errorInfo => {
                console.log({ errorInfo })
            })
    };

    React.useEffect(()=> {
        if(props.isEdit) {
            setTheme(props.data.theme)
        }
    }, props.data.theme)

    React.useEffect(()=>{
        if(formRef && props.isModalVisible && props.isEdit) {
            formRef.setFieldsValue(props.data)
        }
    }, [props.isModalVisible, formRef])

    const saveFormRef = React.useCallback(node => {
        if (node) {
            setFormRef(node);
            if(props.formRef) {
                props.formRef(node)
            }
        }
    }, []);

    const onHandleCancel = () => {
        formRef.resetFields();
        if (props.handleCancel) {
            props.handleCancel();
        }
    }
    return (
        <Wrapper>
            <Modal title={props.isEdit ? "Edit Form" : "Create Form"}
                visible={props.isModalVisible}
                onOk={onFinish}
                onCancel={onHandleCancel}
                confirmLoading={props.ModalConfirmLoading}
            >
                <Form
                    ref={saveFormRef}
                    name="edit"
                    className="edit-form"
                >
                    <Form.Item
                        {...formOptions}
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input user First Name!',
                            },
                        ]}
                    >
                        <Input
                        />
                    </Form.Item>

                    <Form.Item
                        {...formOptions}
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input user Last name!',
                            },
                        ]}
                    >
                        <Input
                             />
                    </Form.Item>

                    <Form.Item
                        {...formOptions}
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Please input a valid email'
                            },
                            {
                                required: true,
                                message: 'Please input user Email!',
                            }
                        ]}
                    >
                        <Input
                            value={props.data.email} />
                    </Form.Item>

                    <Form.Item
                        {...formOptions}
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input user Username!',
                            }
                        ]}
                    >
                        <Input
                            value={props.data.username}
                        />
                    </Form.Item>
                    {!props.isEdit && (
                        <>
                            <Form.Item
                                {...formOptions}
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input user Password!',
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    value={props.data.password}
                                />
                            </Form.Item>

                            <Form.Item
                                {...formOptions}
                                label="Confirm Password"
                                name="password_confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input user Password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    })
                                ]}
                            >
                                <Input
                                    type="password"
                                    value={props.data.password_confirm}
                                />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item
                        {...formOptions}
                        label="Company"
                        name="company"
                        rules={[
                            {
                                required: true,
                                message: 'Please input user Company!',
                            }
                        ]}
                    >
                        <Input
                            value={props.data.company}
                        />
                    </Form.Item>
                    <Form.Item
                        {...formOptions}
                        label="Website"
                        name="website"
                        rules={[
                            {
                                required: true,
                                message: 'Please input user Website!',
                            }
                        ]}
                    >
                        <Input
                            value={props.data.website}
                        />
                    </Form.Item>

                    <Form.Item
                        {...formOptions}
                        label="Theme"
                    // name="theme"
                    >
                        <CompactPicker
                            color={theme}
                            onChangeComplete={(color) => {
                                setTheme(color.hex)
                            }}
                        />
                    </Form.Item>
                    <div style={{ color: "red", marginBottom: "0.5rem", textAlign: "right" }}>
                        {props.error}
                    </div>
                </Form>
            </Modal>
        </Wrapper>

    )
}

EditModal.defaultProps = {
    handleOk: () => { },
    handleCancel: () => { },
    isModalVisible: false,
    ModalConfirmLoading: false,
    isEdit: true,
    data: {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        company: "",
        website: "",
        theme: "#000000"
    },
    error: "",
    formRef: () => { }
}