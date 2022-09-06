export default function definirPreco(preco: number, precoDesconto: number | null) {
    let precoFinal = `R$ ${preco}`;

    if (precoDesconto) {
        precoFinal = ` 
            <span style='text-decoration: line-through; white-space: nowrap; font-weight: 400; font-size: 80%;'>
                R$ ${preco}
            </span>
  
            ${(precoDesconto?.toString().length > 5) ? '<br/>' : '&nbsp;'}

            <span style='color: var(--cor-principal);'>R$ ${precoDesconto}</span> 
        `;
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: precoFinal }} />
    )
}