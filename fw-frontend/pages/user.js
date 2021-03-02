import Head from 'next/head'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { changeAntdTheme } from 'dynamic-antd-theme';

import { Container, Main} from '../styles/User.module'
import UserCard from "../components/UserCard";
import EditModal from "../components/EditModal"

export default function User() {
  const me = useSelector(state => state.user.me);

  useEffect(()=>{
    if(me.theme){
      console.log({me})
      changeAntdTheme(me.theme)
    }
  }, me)
  return (
    <Container>
      <Main>
        <UserCard data={me} hideActions={true} />
      </Main>
    </Container>
  )
}