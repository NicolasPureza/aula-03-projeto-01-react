export default function CartSummary({ pedido, onAlterarQtd, onLimpar, onFinalizar, mensagem }) {
  const total = pedido.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  return (
    <aside className="cart-box">
      <h2>Resumo do Pedido</h2>
      {pedido.length === 0 ? (
        <p className="empty">Seu pedido está vazio. Adicione itens do cardápio.</p>
      ) : (
        <>
          <ul className="cart-list">
            {pedido.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.nome}</strong>
                  <span>R$ {(item.preco * item.qtd).toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="qty-controls">
                  <button type="button" onClick={() => onAlterarQtd(item.id, -1)}>-</button>
                  <span>{item.qtd}</span>
                  <button type="button" onClick={() => onAlterarQtd(item.id, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
          </div>
          <div className="cart-actions">
            <button type="button" className="btn-primary" onClick={onFinalizar}>
              Enviar Pedido
            </button>
            <button type="button" className="btn-ghost" onClick={onLimpar}>
              Limpar
            </button>
          </div>
        </>
      )}
      {mensagem && <p className="success-msg">{mensagem}</p>}
    </aside>
  );
}
