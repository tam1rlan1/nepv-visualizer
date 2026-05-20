import { useState } from "react";

function normalize(v) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  if (len === 0) return [0, 0];
  return [v[0] / len, v[1] / len];
}

export default function App() {
  // Base matrix entries
  const [a11, setA11] = useState(2);
  const [a12, setA12] = useState(1);
  const [a21, setA21] = useState(1);
  const [a22, setA22] = useState(2);

  // Strength of nonlinearity
  const [coupling, setCoupling] = useState(1);

  // Current vector x
  const [x, setX] = useState([1, 0.4]);

  // Store iteration history
  const [trail, setTrail] = useState([]);

  // Normalize current vector
  const xn = normalize(x);

  const A = [
    [Number(a11) + coupling * xn[0], Number(a12)],
    [Number(a21), Number(a22) + coupling * xn[1]],
  ];

  const y = [
    A[0][0] * xn[0] + A[0][1] * xn[1],
    A[1][0] * xn[0] + A[1][1] * xn[1],
  ];

  const yn = normalize(y);
  const lambda = xn[0] * y[0] + xn[1] * y[1];

  const iterate = () => {
    setTrail([...trail, { x: xn[0], y: xn[1] }]);
    setX(yn);
  };

  const reset = () => {
    setX([1, 0.4]);
    setTrail([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
      }}
    >
      {/* TITLE & HEADER */}
      <h1 style={{ fontSize: "56px", marginBottom: "10px", wordWrap: "break-word" }}>
        NEPv Example Visualizer
      </h1>

      <p
        style={{
          color: "#b0b7c3",
          maxWidth: "900px",
          lineHeight: "1.7",
          justifyContent: "center",
          fontSize: "18px",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        In a standard eigenvalue problem, the matrix is static. In a <strong>Nonlinear Eigenvalue Problem (NEPv)</strong>, 
        the matrix depends on the vector. This creates a loop and makes it difficult to find the value of x vector: the vector changes the matrix, 
        and the matrix changes the vector. 
        <br /><br />
        One of the ways to solve the equation is to <strong>iterate</strong> it. We feed a starting vector in, 
        get a new vector out, and repeat the process until the system stabilizes (finds its equilibrium). 
        Notice that at every single step, the vector x is <strong>normalized</strong> (its length is scaled back to 1) 
        so the numbers don't explode into infinity.
      </p>

      {/* FORMULAS & EXPLANATION PANEL */}
      <div
        style={{
          background: "#1a1f2b",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "35px",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "center"
        }}
      >
        {/* Left Side: Math */}
        <div style={{ flex: "1 1 auto" }}>
          <div style={{ fontSize: "34px", marginBottom: "12px" }}>A(x)v = λv</div>
          <div style={{ fontSize: "28px", color: "#9ca3af", marginBottom: "25px" }}>(A(x) − λI)v = 0</div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "34px", color: "#7dd3fc" }}>A(x) =</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px 28px",
                padding: "15px 25px",
                background: "#111827",
                borderRadius: "8px",
                fontSize: "24px",
                borderLeft: "3px solid white",
                borderRight: "3px solid white",
                textAlign: "center"
              }}
            >
              <div>{a11} <span style={{color: "#facc15"}}>+ {coupling}x₁</span></div>
              <div>{a12}</div>
              <div>{a21}</div>
              <div>{a22} <span style={{color: "#facc15"}}>+ {coupling}x₂</span></div>
            </div>
          </div>
        </div>

        {/* Right Side: Human Explanation */}
        <div 
          style={{ 
            flex: "1 1 300px", 
            background: "#2a3143", 
            padding: "20px", 
            borderRadius: "12px",
            borderLeft: "4px solid #facc15" 
          }}
        >
          <h3 style={{ marginTop: 0, color: "#facc15" }}>💡 What makes this special?</h3>
          <p style={{ color: "#d1d5db", lineHeight: "1.6", fontSize: "15px", marginBottom: "10px" }}>
            Look at the yellow parts in the matrix. The matrix entries are dynamically updated by the components of our current vector (<strong>x₁</strong> and <strong>x₂</strong>).
          </p>
          <p style={{ color: "#d1d5db", lineHeight: "1.6", fontSize: "15px", margin: 0 }}>
            The <strong>Coupling Strength</strong> decides how heavily the vector influences the matrix. If it's 0, it acts like a normal linear matrix!
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        
        {/* LEFT PANEL */}
        <div style={{ flex: "1 1 340px", maxWidth: "340px" }}>
          
          {/* CONTROLS */}
          <div style={{ background: "#1a1f2b", padding: "20px", borderRadius: "18px", marginBottom: "20px" }}>
            <h2 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>1. Tweak the System</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <input type="number" value={a11} onChange={(e) => setA11(e.target.value)} style={{ width: "100%", boxSizing: "border-box", padding: "8px", background: "#111827", color: "white", border: "1px solid #444", borderRadius: "6px" }} title="Top-left entry (a11)" />
              <input type="number" value={a12} onChange={(e) => setA12(e.target.value)} style={{ width: "100%", boxSizing: "border-box", padding: "8px", background: "#111827", color: "white", border: "1px solid #444", borderRadius: "6px" }} title="Top-right entry (a12)" />
              <input type="number" value={a21} onChange={(e) => setA21(e.target.value)} style={{ width: "100%", boxSizing: "border-box", padding: "8px", background: "#111827", color: "white", border: "1px solid #444", borderRadius: "6px" }} title="Bottom-left entry (a21)" />
              <input type="number" value={a22} onChange={(e) => setA22(e.target.value)} style={{ width: "100%", boxSizing: "border-box", padding: "8px", background: "#111827", color: "white", border: "1px solid #444", borderRadius: "6px" }} title="Bottom-right entry (a22)" />
            </div>

            <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#9ca3af" }}>Coupling Strength: <strong style={{color: "white"}}>{coupling}</strong></p>
            <input type="range" min="0" max="3" step="0.1" value={coupling} onChange={(e) => setCoupling(Number(e.target.value))} style={{ width: "100%", accentColor: "#facc15" }} />
          </div>

          {/* REAL-TIME STATS */}
          <div style={{ background: "#1a1f2b", padding: "22px", borderRadius: "18px", marginBottom: "20px" }}>
            <h2 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>2. Observe the Vector</h2>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#d1d5db" }}>
              <span>x₁ = <strong>{xn[0].toFixed(4)}</strong></span>
              <span>x₂ = <strong>{xn[1].toFixed(4)}</strong></span>
            </div>
            <hr style={{ margin: "15px 0", borderColor: "#333", borderWidth: "1px" }} />
            <h3 style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#9ca3af", fontWeight: "normal" }}>Approximate Eigenvalue (λ)</h3>
            <p style={{ color: "#7dd3fc", fontSize: "28px", fontWeight: "bold", margin: 0 }}>{lambda.toFixed(4)}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ background: "#1a1f2b", padding: "22px", borderRadius: "18px" }}>
            <h2 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>3. Find the Equilibrium</h2>
            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "15px", lineHeight: "1.5" }}>
              Click repeatedly to trace the vector's path. When the yellow dots stop moving, the system has converged to its nonlinear eigenvector!
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={iterate} style={{ flex: 2, padding: "14px", border: "none", borderRadius: "8px", background: "#2563eb", color: "white", fontSize: "16px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" }}>
                Run Iteration
              </button>
              <button onClick={reset} style={{ flex: 1, padding: "14px", border: "none", borderRadius: "8px", background: "#374151", color: "white", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}>
                Reset
              </button>
            </div>
          </div>

        </div>

        {/* GRAPH PANEL */}
        <div style={{ flex: "1 1 400px", maxWidth: "760px", minWidth: "300px", position: "relative" }}>
          
          {/* LEGEND OVERLAY */}
          <div style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(15, 17, 23, 0.8)", padding: "15px", borderRadius: "12px", border: "1px solid #333", fontSize: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "20px", height: "4px", background: "white", borderRadius: "2px" }}></div>
              <span style={{ color: "#d1d5db" }}>Current Vector <em>x</em></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "10px", height: "10px", background: "#facc15", borderRadius: "50%" }}></div>
              <span style={{ color: "#d1d5db" }}>Iteration Path</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "20px", height: "4px", background: "linear-gradient(90deg, #38bdf8, #22c55e)", borderRadius: "2px" }}></div>
              <span style={{ color: "#d1d5db" }}>Matrix A(x) Effect</span>
            </div>
          </div>

          <svg viewBox="0 0 760 760" width="100%" style={{ background: "#161b24", borderRadius: "24px", display: "block" }}>
            {/* AXES */}
            <line x1="380" y1="60" x2="380" y2="700" stroke="#444" strokeWidth="2" />
            <line x1="60" y1="380" x2="700" y2="380" stroke="#444" strokeWidth="2" />

            {/* ORIGINAL BASIS */}
            <line x1="380" y1="380" x2="500" y2="380" stroke="#888" strokeWidth="4" strokeDasharray="5,5" />
            <line x1="380" y1="380" x2="380" y2="260" stroke="#888" strokeWidth="4" strokeDasharray="5,5" />

            {/* TRANSFORMED BASIS */}
            <line x1="380" y1="380" x2={380 + A[0][0] * 75} y2={380 - A[1][0] * 75} stroke="#38bdf8" strokeWidth="5" opacity="0.8" />
            <line x1="380" y1="380" x2={380 + A[0][1] * 75} y2={380 - A[1][1] * 75} stroke="#22c55e" strokeWidth="5" opacity="0.8" />

            {/* TRAIL */}
            {trail.map((p, i) => (
              <circle key={i} cx={380 + p.x * 200} cy={380 - p.y * 200} r="5" fill="#facc15" opacity={0.3 + (i / trail.length) * 0.7} />
            ))}

            {/* CURRENT VECTOR */}
            <line x1="380" y1="380" x2={380 + xn[0] * 200} y2={380 - xn[1] * 200} stroke="white" strokeWidth="6" strokeLinecap="round" />

            {/* LABELS */}
            <text x="510" y="375" fill="#888" fontSize="16">e₁</text>
            <text x="390" y="250" fill="#888" fontSize="16">e₂</text>
            <text x={380 + A[0][0] * 75 + 10} y={380 - A[1][0] * 75} fill="#38bdf8" fontSize="16" fontWeight="bold">A(x)e₁</text>
            <text x={380 + A[0][1] * 75 + 10} y={380 - A[1][1] * 75} fill="#22c55e" fontSize="16" fontWeight="bold">A(x)e₂</text>
            <text x={380 + xn[0] * 200 + 15} y={380 - xn[1] * 200} fill="white" fontSize="18" fontWeight="bold">x</text>
          </svg>

        </div>
      </div>
    </div>
  );
}