import Card from '../../assets/card.png'
import { ContainerButton } from './styles'


export function CardButton({...props}){
    return (
        <ContainerButton {...props}>
            <img src={Card} alt='carrino-decompra' />
        </ContainerButton>
    )
}