export default function MenuItem({ item, onAdicionar }) {
  return (
    <article className="menu-card">
      <div className="menu-card-head">
        <span className="cat-tag">{item.categoria}</span>
        <span className="price">R$ {item.preco.toFixed(2).replace(".", ",")}</span>
      </div>
      <h3>{item.nome}</h3>
      <p>{item.descricao}</p>
      <button type="button" className="btn-primary" onClick={() => onAdicionar(item)}>
        Adicionar ao Pedido
      </button>
    </article>
  );
}
