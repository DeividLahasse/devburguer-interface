import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Background from '../../assets/background-fundo.png';
import BannerHamburguer from '../../assets/bannerhamburguer.png';

const cairDeCima = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px); // Começa bem alto
  }
  60% {
    transform: translateY(10px); // Passa um pouquinho do lugar (efeito elástico)
  }
  80% {
    transform: translateY(-5px); // Sobe só um pouquinho
  }
  100% {
    opacity: 1;
    transform: translateY(0); // Para no lugar certo
  }
`;

const aparecerSuave = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
width: 100%;
min-height: 100vh;
background-color: #f0f0f0;

background:linear-gradient(rgba(255,255,255,0.5),
rgba(255,255,255,0.5)
),url('${Background}');

`;

export const Banner = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 480px;
width: 100%;
position: relative;
background-color: #1f1f1f;
background-size:cover;


background: url('${BannerHamburguer}');
background-color: #1f1f1f;
background-position: center;
background-size:cover;

h1{
font-family: "Road Rage";
font-size:80px;
line-height:65px;
color:#fff;
position: absolute;
animation: ${aparecerSuave} 1.5s ease-out;


right: 20%;
top: 30%;

    img{
    height: 70px;
    width: 80px;
    position: absolute;
    top: 130px;
    right:-20px;
    animation: ${cairDeCima} 1s ease-out forwards;


}


span{
    display: block;
    color: #fff;
    font-size: 20px;
    animation: ${aparecerSuave} 1.5s ease-out;

}
}

`;

export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
gap: 50px;
margin-top:30px ;

`;

export const CategoryButton = styled(Link)`
text-decoration: none;
cursor: pointer;
background: none;
color: #9758a6;
font-family:"Road Rage";
font-size: 30px;
padding-bottom:5px;
line-height: 20px;
border-bottom:2px solid #9758a6;
transition: all 0.4s;

&:hover {
    transform: scale(1.15);
    color: #7a3d8a;   
  }

  &:active {
    transform: scale(0.95);
  }

`;

export const ProductsContainer = styled.div`
display: grid;
grid-template-columns:repeat(3, 1fr);
padding: 40px;
gap: 60px;
max-width: 1280;
margin:50px auto;

`;

export const VoltarButton = styled.button`
  background: none;
  border: none;
  color: #9758a6;
  cursor: pointer;
  transition: all 0.3s;
  
  /* Reset de alinhamento */
  display: flex;
  align-items: flex-start; /* Alinha pelo topo */
  padding: 0px;
  margin: 0;
  height: auto;

  &:hover {
    color: #7a3d8a;
    transform: scale(1.1);
  }

  span {
    font-family: "Road Rage";
    font-size: 30px;
    line-height: 20px; /* Mesma altura de linha das outras categorias */
    padding-bottom: 5px;
    border-bottom: 2px solid #9758a6;
    
    /* ESSA LINHA É A CHAVE: Ajuste o valor até alinhar perfeitamente */
    margin-top: -1px; 
    
    
  }
`;
