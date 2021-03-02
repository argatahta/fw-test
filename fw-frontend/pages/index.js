import { useState } from "react";
import { useDispatch } from "react-redux";
import Head from 'next/head'
import { useRouter } from "next/router";

import { Container, Main} from '../styles/Home.module'
import LoginForm from "../components/LoginForm";
import UserAPI from "../api/user";
import { saveMe } from "../redux/actions/user";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    const {password, email, isAdmin} = values
    setError("");
    setLoading(true)
    try {
      const result = await UserAPI.clientLogin(email, password);
      if (result.data) {
        dispatch(saveMe(result.data))
        if(result.data.user.isAdmin) {
          router.push("/admin")
          return 
        }
        router.push("/user");
      }
      setLoading(false);
    } catch (error) {
      setError(error || "Error");
      setLoading(false);
    }
  }

  return (
    <Container>
      <Main>
        <LoginForm error={error} onLogin={handleLogin} isLoading={loading} />
      </Main>
    </Container>
  )
}
