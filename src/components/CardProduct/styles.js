import styled from 'styled-components';

export const Container = styled.div`

display: flex;
flex-direction: column;
align-items: center;
gap:50px;
padding: 48px;
border-radius: 8px;
background-color:#FFF;
cursor: grab;
position: relative;

div{
    width: 100%;
    height: 88%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;

    p{
        font-size: 18px;
        color: #FF8C05;
        line-height: 20px;
        font-weight: 700;
        margin-top: 40px;


        strong{
            font-size: 22px;
            color:#363636 ;
            font-weight: 800;
            line-height: 20px;
        }


    }
}

`;

export const CardImage = styled.img`
height: 120px; /* Aumentei um pouco para dar destaque ao burguer */
  width: auto;   /* Mantém a proporção */
  
  position: absolute;
  top: -60px;    
  left: 50%;     
  transform: translateX(-50%);  
 object-fit: contain; 
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
  border-radius: 70px
`;
