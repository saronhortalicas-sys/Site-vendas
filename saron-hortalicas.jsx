import { useState } from "react";

const LOGO_URL = "https://i.postimg.cc/fLQRGKdX/Alface-Holandesa-CROCANTE.jpg";
const WHATSAPP_NUMBER = "5527996558555"; // 📞 Troque pelo seu número!
const SENHA_ADMIN = "saron2025"; // 🔐 Troque pela sua senha!

const INITIAL_PRODUCTS = [
  { id: 1, name: "Alface Holandesa Crocante", img: "https://i.postimg.cc/rdgTW5QF/Alface-Holandesa-CROCANTE.jpg", price: 4.5, unit: "unid", category: "Alfaces", stock: 30, desc: "Folhas crocantes e frescas, colhidas no dia" },
  { id: 2, name: "Alface Frisée Roxa", img: "https://i.postimg.cc/Z9jm36Vm/Alface-Holandesa-Frise-Roxa.jpg", price: 5.0, unit: "unid", category: "Alfaces", stock: 20, desc: "Rica em antioxidantes, cor vibrante e sabor especial" },
  { id: 3, name: "Alface Frisée Verde", img: "https://i.postimg.cc/mcV4M78b/Alface-Holandesa-Frise-Verde.jpg", price: 5.0, unit: "unid", category: "Alfaces", stock: 20, desc: "Levemente amarga, perfeita para saladas gourmet" },
  { id: 4, name: "Alface Lisa Roxa", img: "https://i.postimg.cc/wtFzJD08/Alface-Holandesa-Lisa-Roxa.jpg", price: 4.5, unit: "unid", category: "Alfaces", stock: 18, desc: "Folhas largas e macias, sabor delicado" },
  { id: 5, name: "Alface Lisa Verde", img: "https://i.postimg.cc/B8N3D2Nd/Alface-Holandesa-Lisa-Verde.jpg", price: 4.0, unit: "unid", category: "Alfaces", stock: 25, desc: "Clássica e versátil, ideal para qualquer salada" },
  { id: 6, name: "Flores Comestíveis", img: "https://i.postimg.cc/FfGvc0D1/Flores-Comestiveis.jpg", price: 12.0, unit: "bandeja", category: "Especiais", stock: 10, desc: "Para decorar pratos com beleza e sabor único" },
  { id: 7, name: "Mix Hortaliças Baby", img: "https://i.postimg.cc/nsTx7qTN/Mix-Hortalicas-Baby.jpg", price: 8.9, unit: "bandeja", category: "Especiais", stock: 12, desc: "Seleção especial de folhas baby variadas" },
];

const fmt = (v) => v.toFixed(2).replace(".", ",");

function Header({ cartCount, onCartClick, onAdminClick }) {
  return (
    <header style={{
      background: "#1a3c28", padding: "12px 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 12px rgba(0,0,0,0.3)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: "#fff", borderRadius: 10, padding: 4 }}>
          <img src="https://i.postimg.cc/fLQRGKdX/Alface-Holandesa-CROCANTE.jpg"
            alt="Saron" style={{ height: 40, width: 40, objectFit: "cover", borderRadius: 8, display: "block" }}
            onError={e => { e.target.style.display = "none"; }}
          />
        </div>
        <div>
          <div style={{ color: "#a8d8b9", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Plantação Própria</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Georgia, serif" }}>Saron Hortaliças</div>
        </div>
      </div>
      <button onClick={onCartClick} style={{
        background: "#e67e22", color: "#fff", border: "none",
        borderRadius: 8, padding: "8px 16px", fontWeight: 800, fontSize: 15, cursor: "pointer"
      }}>
        🛒 {cartCount > 0 && (
          <span style={{
            background: "#c0392b", color: "#fff", borderRadius: "50%",
            width: 18, height: 18, display: "inline-flex", alignItems: "center",
            justifyContent: "center", fontSize: 11, fontWeight: 900, marginLeft: 4
          }}>{cartCount}</span>
        )}
      </button>
    </header>
  );
}

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => { onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 900); };
  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      overflow: "hidden", display: "flex", flexDirection: "column",
      border: "1px solid #e8f5e9"
    }}>
      <div style={{ background: "#f7faf8", padding: 10 }}>
        <img src={product.img} alt={product.name} style={{
          width: "100%", height: 130, objectFit: "contain", borderRadius: 8
        }} />
      </div>
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#1a3c28", lineHeight: 1.2 }}>{product.name}</div>
        <div style={{ color: "#6b9e7b", fontSize: 11 }}>{product.desc}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
          <div>
            <span style={{ fontWeight: 900, fontSize: 18, color: "#1a3c28" }}>R$ {fmt(product.price)}</span>
            <span style={{ color: "#aaa", fontSize: 11, marginLeft: 4 }}>/ {product.unit}</span>
          </div>
          <button onClick={handleAdd} style={{
            background: added ? "#27ae60" : "#1a3c28", color: "#fff",
            border: "none", borderRadius: 8, padding: "7px 12px",
            fontWeight: 800, fontSize: 13, cursor: "pointer", transition: "background 0.2s"
          }}>{added ? "✔" : "+"}</button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, onUpdateQty, onClose }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const handleWhatsApp = () => {
    const lines = cart.map(i => `• ${i.name} x${i.qty} (${i.unit}) = R$ ${fmt(i.price * i.qty)}`).join("\n");
    const msg = `Olá! Gostaria de fazer um pedido na *Saron Hortaliças*:\n\n${lines}\n\n*Total: R$ ${fmt(total)}*\n\nPor favor, confirme disponibilidade e prazo de entrega! 🌿`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", width: "100%", borderRadius: "24px 24px 0 0", maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#1a3c28" }}>🛒 Meu Pedido</div>
          <button onClick={onClose} style={{ background: "#f0f4f1", border: "none", borderRadius: 8, padding: "6px 14px", fontWeight: 700, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "10px 16px" }}>
          {cart.length === 0
            ? <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>Carrinho vazio 🛒</div>
            : cart.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #f0f4f1" }}>
                <img src={item.img} alt={item.name} style={{ width: 50, height: 50, objectFit: "contain", borderRadius: 8, background: "#f7faf8" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                  <div style={{ color: "#6b9e7b", fontSize: 12 }}>R$ {fmt(item.price)} / {item.unit}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ background: "#f0f4f1", border: "none", borderRadius: 6, width: 28, height: 28, fontWeight: 900, fontSize: 16, cursor: "pointer" }}>−</button>
                  <span style={{ fontWeight: 800, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ background: "#1a3c28", color: "#fff", border: "none", borderRadius: 6, width: 28, height: 28, fontWeight: 900, fontSize: 16, cursor: "pointer" }}>+</button>
                </div>
                <div style={{ fontWeight: 800, fontSize: 14, minWidth: 60, textAlign: "right", color: "#1a3c28" }}>R$ {fmt(item.price * item.qty)}</div>
              </div>
            ))
          }
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "14px 20px", borderTop: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: 22, color: "#1a3c28" }}>R$ {fmt(total)}</span>
            </div>
            <button onClick={handleWhatsApp} style={{
              background: "#25D366", color: "#fff", border: "none", borderRadius: 12,
              padding: "14px 0", width: "100%", fontWeight: 900, fontSize: 16, cursor: "pointer"
            }}>📱 Pedir pelo WhatsApp</button>
            <div style={{ textAlign: "center", color: "#aaa", fontSize: 11, marginTop: 6 }}>Você será redirecionado para o WhatsApp</div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginModal({ onSuccess, onClose }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const handleLogin = () => {
    if (senha === SENHA_ADMIN) { onSuccess(); }
    else { setErro(true); }
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 340 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40 }}>🔐</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#1a3c28", marginTop: 8 }}>Área do Administrador</div>
          <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Digite a senha para continuar</div>
        </div>
        <input
          type="password" value={senha}
          onChange={e => { setSenha(e.target.value); setErro(false); }}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Senha" autoFocus
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 16,
            border: erro ? "2px solid #e74c3c" : "2px solid #c8e6c9",
            boxSizing: "border-box", marginBottom: 8, outline: "none"
          }}
        />
        {erro && <div style={{ color: "#e74c3c", fontSize: 13, marginBottom: 8, textAlign: "center" }}>✗ Senha incorreta</div>}
        <button onClick={handleLogin} style={{
          background: "#1a3c28", color: "#fff", border: "none", borderRadius: 10,
          padding: "12px 0", width: "100%", fontWeight: 800, fontSize: 15, cursor: "pointer", marginBottom: 10
        }}>Entrar</button>
        <button onClick={onClose} style={{
          background: "#f0f4f1", color: "#555", border: "none", borderRadius: 10,
          padding: "10px 0", width: "100%", fontWeight: 700, fontSize: 14, cursor: "pointer"
        }}>Cancelar</button>
      </div>
    </div>
  );
}

function AdminPanel({ products, setProducts, onClose }) {
  const [tab, setTab] = useState("products");
  const [form, setForm] = useState({ name: "", price: "", unit: "unid", category: "Alfaces", stock: "", desc: "", img: "" });
  const [msg, setMsg] = useState("");

  const addProduct = () => {
    if (!form.name || !form.price || !form.stock) { setMsg("Preencha nome, preço e estoque."); return; }
    setProducts(prev => [...prev, { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock) }]);
    setForm({ name: "", price: "", unit: "unid", category: "Alfaces", stock: "", desc: "", img: "" });
    setMsg("✅ Produto adicionado!"); setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#f7faf8", zIndex: 150, overflowY: "auto" }}>
      <div style={{ background: "#1a3c28", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>⚙️ Painel – Saron Hortaliças</div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, cursor: "pointer" }}>✕ Fechar</button>
      </div>
      <div style={{ display: "flex", background: "#fff", borderBottom: "2px solid #e8f5e9" }}>
        {["products", "add"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "12px 0", border: "none",
            background: tab === t ? "#1a3c28" : "#fff",
            color: tab === t ? "#fff" : "#555",
            fontWeight: 700, fontSize: 14, cursor: "pointer"
          }}>{t === "products" ? "📦 Meus Produtos" : "➕ Novo Produto"}</button>
        ))}
      </div>
      <div style={{ padding: 16 }}>
        {tab === "add" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1a3c28", marginBottom: 14 }}>Novo Produto</div>
            {[["Nome do produto", "name"], ["Preço (R$)", "price", "number"], ["Qtd em estoque", "stock", "number"], ["Descrição curta", "desc"], ["Link da foto (postimg)", "img"]].map(([label, key, type = "text"]) => (
              <div key={key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #c8e6c9", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>Unidade</label>
              <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #c8e6c9", fontSize: 14 }}>
                {["unid", "maço", "kg", "bandeja", "500g", "dúzia"].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            {msg && <div style={{ color: "#27ae60", fontWeight: 700, marginBottom: 10 }}>{msg}</div>}
            <button onClick={addProduct} style={{
              background: "#1a3c28", color: "#fff", border: "none", borderRadius: 10,
              padding: "12px 0", width: "100%", fontWeight: 800, fontSize: 15, cursor: "pointer"
            }}>✅ Salvar Produto</button>
          </div>
        )}
        {tab === "products" && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#1a3c28", marginBottom: 12 }}>{products.length} produto(s)</div>
            {products.map(p => (
              <div key={p.id} style={{
                background: "#fff", borderRadius: 12, padding: "10px 14px", marginBottom: 10,
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)", opacity: p.stock === 0 ? 0.5 : 1
              }}>
                <img src={p.img} alt={p.name} style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, background: "#f7faf8" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ color: "#6b9e7b", fontSize: 12 }}>R$ {fmt(p.price)} / {p.unit} • Estoque: {p.stock}</div>
                </div>
                <button onClick={() => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock > 0 ? 0 : 10 } : x))}
                  style={{ background: p.stock > 0 ? "#e8f5e9" : "#fde8e8", color: p.stock > 0 ? "#1a3c28" : "#c0392b", border: "none", borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  {p.stock > 0 ? "✓ Ativo" : "✗ Esgot."}
                </button>
                <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}
                  style={{ background: "#fde8e8", color: "#c0392b", border: "none", borderRadius: 8, padding: "5px 8px", fontSize: 15, cursor: "pointer" }}>🗑</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("Todos");
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");

  const categories = [...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => {
    const matchCat = category === "Todos" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && p.stock > 0;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh", fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} onAdminClick={() => setShowLogin(true)} />

      <div style={{ background: "linear-gradient(135deg, #1a3c28, #2d6a4f)", padding: "16px 18px" }}>
        <div style={{ color: "#a8d8b9", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Hidroponia • Sem agrotóxicos</div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>🚚 Entregamos em Venda Nova do Imigrante e Pedra Azul</div>
        <div style={{ color: "#b7e4c7", fontSize: 13, marginTop: 2 }}>Folhas frescas direto da nossa plantação para sua casa</div>
      </div>

      <div style={{ padding: "12px 14px 0" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar produto..."
          style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #c8e6c9", fontSize: 14, background: "#fff", boxSizing: "border-box" }} />
      </div>

      <div style={{ display: "flex", gap: 8, padding: "12px 14px", overflowX: "auto" }}>
        {["Todos", ...categories].map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{
            background: category === c ? "#1a3c28" : "#fff",
            color: category === c ? "#fff" : "#1a3c28",
            border: "2px solid " + (category === c ? "#1a3c28" : "#c8e6c9"),
            borderRadius: 20, padding: "6px 16px",
            fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap"
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: "0 14px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.length === 0
          ? <div style={{ gridColumn: "span 2", textAlign: "center", color: "#aaa", padding: 40 }}>Nenhum produto encontrado 🌿</div>
          : filtered.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)
        }
      </div>

      {cartCount > 0 && !showCart && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 99 }}>
          <button onClick={() => setShowCart(true)} style={{
            background: "#e67e22", color: "#fff", border: "none",
            borderRadius: 50, width: 64, height: 64, fontSize: 28, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(230, 126, 34, 0.4)"
          }}>🛒</button>
        </div>
      )}

      {showCart && <Cart cart={cart} onUpdateQty={(id, qty) => {
        if (qty <= 0) { setCart(prev => prev.filter(i => i.id !== id)); }
        else { setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i)); }
      }} onClose={() => setShowCart(false)} />}

      {showLogin && <LoginModal onSuccess={() => { setShowLogin(false); setShowAdmin(true); }} onClose={() => setShowLogin(false)} />}

      {showAdmin && <AdminPanel products={products} setProducts={setProducts} onClose={() => setShowAdmin(false)} />}
    </div>
  );
}