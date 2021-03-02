import styled from 'styled-components';

export const CardImage = styled.img`
    width: 100%;
    height: 200px;
    background-color: var(--primary-color);
    // background-color: @primary-color;
`

export const DescriptionRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.5rem;
    color: rgba(0,0,0,0.65);

    p {
        margin: 0;
    }
`
