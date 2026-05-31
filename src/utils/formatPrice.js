export const formatPrice = (value) =>{
    return new Intl.NumberFormat('PT-BR', {
        style: "currency",
        currency: 'BRL'
    }).format(value /100);
}
