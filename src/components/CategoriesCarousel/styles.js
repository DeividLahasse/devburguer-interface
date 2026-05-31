import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
.carousel-item{
    padding:40px;


    
}


.react-multiple-carousel__arrow--left{
    left: 40px;
    top: 40px;
}

.react-multiple-carousel__arrow--right{
    top: 40px;
    right: 40px;
}
  padding-left: 40px;
`;

export const Title = styled.h2`
font-size: 32px;
font-weight: 800;
font-style: 800;
color: #9758a6;
padding-bottom: 12px;
position: relative;
text-align: center;
margin-bottom: 40px;


&::after{
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color:#9758a6 ;
    left:48%;
    
}
`;

export const ContainerItem = styled.div`
background: url('${(props) => props.imageUrl}');
background-position: center;
background-size: cover;
border-radius: 20px;



 display: flex;
 align-items: center;
 padding: 20px 10px;
 width:100%;
 height: 200px;
 
`;

export const CartegoryButton = styled(Link)`
font-family:"Road Rage";
    color: #fff;
    background-color:rgba(0,0,0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 30px;
    margin-top: 50px;  
    text-decoration: none;
    transition: transform 0.3s ease-in-out;

    &:hover {
    background-color:#9758a6 ;
    transform: scale(1.15); 
  }

  &:active {
    transform: scale(0.95); // Dá um 
  }
    

`;
