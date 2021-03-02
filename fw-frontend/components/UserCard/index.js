import React from "react";
import PropTypes from 'prop-types'

import { Card, Avatar, Checkbox } from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { CardImage, DescriptionRow } from "./styles";

const { Meta } = Card;

export default function UserCard(props) {
    return (
        <Card
            style={{ width: "100%" }}
            cover={
                <CardImage
                    alt="usercard"
                    src={props.cardImage}
                />
            }
            actions={props.hideActions ? []: [
                <Checkbox checked={props.checked} onChange={props.onSelectCheckbox} />,
                <EditOutlined onClick={props.onEdit} key="edit" />,
                <DeleteOutlined onClick={props.onDelete} key="remove" />,
            ]}
        >
            <Meta
                title={`${props.data.firstName} ${props.data.lastName}`}
                description={
                    <>
                        <DescriptionRow>
                            <MailOutlined style={{ marginRight: "1rem" }} />
                            <p>{props.data.email}</p>
                        </DescriptionRow>
                        <DescriptionRow>
                            <UserOutlined style={{ marginRight: "1rem" }} />
                            <p>{props.data.username}</p>
                        </DescriptionRow>
                        <DescriptionRow>
                            <HomeOutlined style={{ marginRight: "1rem" }} />
                            <p>{props.data.company}</p>
                        </DescriptionRow>
                        <DescriptionRow>
                            <GlobalOutlined style={{ marginRight: "1rem" }} />
                            <p>{props.data.website}</p>
                        </DescriptionRow>
                    </>
                }
            />
        </Card>
    )
}

UserCard.defaultProps = {
    cardImage: "https://avatars.dicebear.com/v2/avataaars/jinggo.svg?options[mood][]=happy",
    data: {
        firstName: "Unnamed",
        lastName: "",
        email: "",
        username: "",
        company: "",
        website: ""
    },
    onSelectCheckbox: ()=>{},
    onEdit: ()=>{},
    onDelete: ()=>{},
    hideActions: false
}