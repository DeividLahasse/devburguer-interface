import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 16px;
`;

export const EditButton = styled.button`
  background: ${(props) => props.theme.darkwhite};
  height:32px;
  width:32px;
  border-radius:8px;
  margin:0 auto;
  cursor: pointer;
  
  display:flex;
  align-items:center;
  justify-content:center;

  svg{
    height:18px;
    height:18px;
  }


    &:hover {
    background-color:${(props) => props.theme.purple};

    
  }


  svg {
   
     background:${(props) => props.theme.white};
   
  }


`;