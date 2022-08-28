export default function definirPreco(preco: string, precoDesconto: string) {
    let precoFinal = `R$ ${preco}`;

    if (precoDesconto) {
        precoFinal = `<b style='color: var(--cor-principal);'>R$ ${precoDesconto}</b> 
                      <span style='text-decoration: line-through; white-space: nowrap; font-weight: 400; font-size: 80%;'>R$ ${preco}</span>`;
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: precoFinal }} />
    )
}