export default function Header({ totalItens }) {
  return (
    <header className="topbar">
      <div>
        <span className="badge">React • Projeto 01</span>
        <h1>Café Aroma — Cardápio Digital</h1>
        <p>Escolha seus cafés e acompanhamentos para montar seu pedido.</p>
      </div>
      <div className="cart-pill">
        Pedido: <strong>{totalItens}</strong> {totalItens === 1 ? "item" : "itens"}
      </div>
    </header>
  );
}
