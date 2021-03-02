import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Head from 'next/head';
import { Button } from "antd";
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { changeAntdTheme } from 'dynamic-antd-theme';
import { Container, Main, StyledRow, StyledCol, ButtonsContainer } from '../styles/Admin.module';
import UserCard from "../components/UserCard";
import EditModal from "../components/EditModal";
import UserAPI from "../api/user";

export default function Admin() {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [errorForm, setErrorForm] = useState("");
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({});
    const [formRef, setFormRef] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        changeAntdTheme("#1890ff")
        getUsers();
    }, [])

    const getUsers = async () => {
        setError("");
        setLoading(true)
        try {
            const result = await UserAPI.getUsersClient(token, 1);
            if (result.data) {
                setUsersData(result.data)
            }
            setLoading(false);
        } catch (error) {
            setError(error || "Error");
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {

        if (isEdit) {
            const body = { ...e, id: formData.id || formData._id }
            updateUser(JSON.stringify(body))
        } else {
            createNewUser(JSON.stringify(e))
        }
    }

    const createNewUser = async (payload) => {
        setErrorForm("")
        try {
            const result = await UserAPI.createUserClient(token, payload);
            if (result.data) {
                setUsersData(oldUsersData => [result.data.user, ...oldUsersData])
                setShowModal(false)
                formRef.resetFields()
            }
        } catch (error) {
            setErrorForm(error || "Error")
        }
    }

    const updateUser = async (payload) => {
        setErrorForm("")
        try {
            const result = await UserAPI.updateUserClient(token, payload);
            if (result.data) {
                getUsers();
                setShowModal(false);
                setFormData({});
                formRef.resetFields()
            }
        } catch (error) {
            setErrorForm(error || "Error")
        }
    }

    const deleteUser = async (payload) => {
        try {
            const result = await UserAPI.deleteUserClient(token, payload);
            if (result.data) {
                getUsers();
                setSelectedUser([])
            }
        } catch (error) {
            setSelectedUser([])
        }
    }

    const onChecked = (e, id) => {
        const isChecked = e.target.checked

        if(selectedUser.includes(id)) {
            const index = selectedUser.indexOf(id)
            if (index > -1) {
                const removed = selectedUser
                removed.splice(index, 1)
                setSelectedUser(oldSelected => [...removed])
              }
            return
        }
        setSelectedUser(oldSelected => [...oldSelected, id])
    }
    return (
        <>
            <EditModal
                handleCancel={() => {
                    setShowModal(false)
                    setErrorForm("")
                    setFormData({})
                }}
                formRef={(node) => setFormRef(node)}
                data={formData}
                isEdit={isEdit}
                handleOk={handleSubmit}
                isModalVisible={showModal}
                error={errorForm}
            />
            <Container>
                <ButtonsContainer>
                    <Button onClick={() => {
                        setShowModal(true)
                        setIsEdit(false)
                    }} style={{ marginRight: "1rem" }} type="primary" shape="round" icon={<PlusOutlined />} size={'small'}>
                        Add User
                    </Button>
                    {selectedUser.length > 0 && (
                        <Button
                        onClick={()=> {
                            deleteUser(JSON.stringify(selectedUser))
                        }}
                         type="danger" shape="round" icon={<DeleteOutlined />} size={'small'}>
                            Remove Selected
                        </Button>
                    )}

                </ButtonsContainer>
                <Main>
                    <StyledRow gutter={[{ xs: 8, sm: 16, md: 24, lg: 24 }, 24]}>
                        {usersData.map((el) => (
                            !el.isAdmin && (
                                <StyledCol
                                    key={el.id + " usercol"}
                                    xs={{ span: 24 }}
                                    sm={{ span: 24 }}
                                    md={{ span: 8 }}
                                    lg={{ span: 8 }}
                                    xl={{ span: 6 }}
                                >
                                    <UserCard
                                        checked={selectedUser.includes(el.id || el._id)}
                                        onEdit={() => {
                                            setFormData(el)
                                            setIsEdit(true)
                                            setShowModal(true)
                                        }}
                                        onDelete={() => {
                                            const id = el.id || el._id
                                            const payload = JSON.stringify([id])
                                            setSelectedUser([]);
                                            deleteUser(payload)
                                        }}
                                        onSelectCheckbox={(e)=> {
                                            const id = el.id || el_id
                                            onChecked(e, id)
                                        }}
                                        cardImage={`https://avatars.dicebear.com/v2/avataaars/${el.username}.svg?options[mood][]=happy`}
                                        data={el}
                                    />
                                </StyledCol>
                            )


                        ))}
                    </StyledRow>
                </Main>
            </Container>
        </>
    )
}