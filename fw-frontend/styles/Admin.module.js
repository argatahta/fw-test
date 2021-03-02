import styled from "styled-components";
import {Row, Col} from "antd";

export const Container = styled.div`
min-height: 100vh;
width: 100%;
padding: 1rem;
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction: column;
`

export const Main = styled.div`
justify-content: flex-start;
align-items: flex-start;
width: 100%;
`

export const StyledRow = styled(Row)`
    margin-left: 0;
    margin-right: 0;
`

export const StyledCol = styled(Col)`
    padding-left: 0;
    padding-right: 0;
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    margin-bottom: 1rem;
`

