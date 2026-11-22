import { useState } from "react";
import Header from "./components/Header.jsx";
import MenuItem from "./components/MenuItem.jsx";
import CartSummary from "./components/CartSummary.jsx";

const CARDAPIO = [
  { id: 1, nome: "Espresso Tradicional", categoria: "Cafés", preco: 8.5, descricao: "Extração intensa de grãos 100% arábica." },
  { id: 2, nome: "Cappuccino Italiano", categoria: "Cafés", preco: 13.0, descricao: "Espresso, leite vaporizado e espuma cremosa." },
  { id: 3, nome: "Iced Caramel Latte", categoria: "Gelados", preco: 16.5, descricao: "Café gelado com leite e calda de caramelo." },
  { id: 4, nome: "Croissant de Manteiga", categoria: "Salgados", preco: 12.0, descricao: "Massa folhada artesanal assada na hora." },
  { id: 5, nome: "Pão de Queijo Mineiro", categoria: "Salgados", preco: 7.5, descricao: "Porção quentinha com queijo canastra." },
  { id: 6, nome: "Brownie com Nozes", categoria: "Doces", preco: 14.0, descricao: "Chocolate meio amargo com pedaços de nozes." },
];

const CATEGORIAS = ["Todos", "Cafés", "Gelados", "Salgados", "Doces"];

export default function App() {
  const [categoria, setCategoria] = useState("Todos");
  const [pedido, setPedido] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const itensFiltrados =
    categoria === "Todos"
      ? CARDAPIO
      : CARDAPIO.filter((item) => item.categoria === categoria);

  function adicionarItem(item) {
    setMensagem("");
    setPedido((atual) => {
      const existente = atual.find((i) => i.id === item.id);
      if (existente) {
        return atual.map((i) => (i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i));
      }
      return [...atual, { ...item, qtd: 1 }];
    });
  }

  function alterarQtd(id, delta) {
    setPedido((atual) =>
      atual
        .map((item) => (item.id === id ? { ...item, qtd: item.qtd + delta } : item))
        .filter((item) => item.qtd > 0)
    );
  }

  function finalizarPedido() {
    setMensagem("Pedido enviado para a cozinha! Tempo estimado: 10 min.");
    setPedido([]);
  }

  const totalItens = pedido.reduce((acc, item) => acc + item.qtd, 0);

  return (
    <div className="app-shell">
      <Header totalItens={totalItens} />
      <div className="filters">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            type="button"
            className={categoria === cat ? "filter-btn active" : "filter-btn"}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <main className="layout">
        <section className="menu-grid">
          {itensFiltrados.map((item) => (
            <MenuItem key={item.id} item={item} onAdicionar={adicionarItem} />
          ))}
        </section>
        <CartSummary
          pedido={pedido}
          onAlterarQtd={alterarQtd}
          onLimpar={() => setPedido([])}
          onFinalizar={finalizarPedido}
          mensagem={mensagem}
        />
      </main>
    </div>
  );
}
