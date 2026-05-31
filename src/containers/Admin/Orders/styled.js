import Select from 'react-select';
import styled from 'styled-components';

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export const SelectStatus = styled(Select)`
width:240px;

`;

export const Filter = styled.div`

display: flex;
justify-content:center ;
margin: 28px 0;
gap: 50px;
`;

export const FilterOptions = styled.button`
cursor: pointer;
background: none;
border: none;
color:${(props) => props.$isActiveStatus ? props.theme.purple : props.theme.darkGray};

border-bottom:${(props) => (props.$isActiveStatus ? ` 1px solid ${props.theme.purple}` : `none`)};
font-size: 18px;
line-height: 20px;
padding-bottom: 5px;
transition: transform 0.5s ease;

&:hover{
  transform: scale(1.1);
}

`;
