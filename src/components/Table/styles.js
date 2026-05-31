import styled from 'styled-components';

export const Root = styled.table`
width: 100%;
margin:left;
background-color: #fff;
border-collapse:collapse;
border: 20px;
min-height: 300px;
height: 100%;
`;

export const Header = styled.thead``;

export const Tr = styled.tr`



`;

export const Th = styled.th`
padding: 16px;
text-align: left;
color: #fff;
background-color:#484848;
border-bottom:1px solid #cdcdcd;
font-weight:900;


&:last-child{
border-top-right-radius:20px;
}

&:first-child{
border-top-left-radius:20px;

}
`;

export const Td = styled.td`
padding: 16px;
color:#484848;
font-weight:500;
line-break: 115%;
`;

export const Body = styled.tbody`
height: 100%;
`;
