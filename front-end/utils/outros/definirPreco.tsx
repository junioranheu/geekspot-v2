export default function definirPreco(preco: string, precoDesconto: string) {
    let precoFinal = `R$ ${preco}`;

    if (precoDesconto) {
        precoFinal = `
        <div>
            <span style='text-decoration: line-through; white-space: nowrap; font-weight: 400; font-size: 80%;'>
                R$ ${preco}
            </span>
        </div>

        <b style='color: var(--cor-principal);'>R$ ${precoDesconto}</b> 
        `;
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: precoFinal }} />
    )
}