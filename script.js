// parametri per la generazione casuale
const lato_min = 5;
const lato_max = 20;
const lato_delta = lato_max - lato_min;
const ang_min = 5;
const ang_max = 85;
const ang_delta = ang_max - ang_min;
const udm_lati = " cm";
const udm_angoli = "°";

function genera() {
  const list = document.getElementById("exlist");
  list.innerHTML = "";
  let soluzioni = "Soluzioni: ";
  for (let i = 1; i <= 10; i++) {
    const ex = document.createElement("li");
    const ex_generato = genera_es(i - 1);
    ex.textContent = ex_generato.testo;
    list.appendChild(ex);
    soluzioni += `(${i}) ${ex_generato.sol} `;
  }
  document.getElementById("soluzioni").textContent = soluzioni;
}

function shuffle(a = "A", b = "B", c = "C") {
  return [a, b, c];
}

function arrotonda2(n) {
  return Math.round(100 * n) / 100;
}

// il testo negli esercizi del tipo lato + angolo -> lato
function genera_testo_l(retto, ang, ang_val, lato, lato_val, lato2) {
  var testo = "Considera il tringolo ABC, rettangolo in " + retto + ". ";
  testo += "L'angolo in " + ang + " misura " + ang_val + udm_angoli + ", ";
  testo += "e il lato " + lato + " misura " + lato_val + udm_lati + ". ";
  testo += "Calcolare la lunghezza di " + lato2 + ".";
  return testo;
}

// il testo negli esercizi del tipo lato + lato -> angolo
function genera_testo_a(retto, lato1, lato1_val, lato2, lato2_val, ang) {
  var testo = "Considera il tringolo ABC, rettangolo in " + retto + ". ";
  testo += "Il lato " + lato1 + " misura " + lato1_val + udm_lati + ". ";
  testo += "e il lato " + lato2 + " misura " + lato2_val + udm_lati + ". ";
  testo += "Calcolare la lunghezza dell'angolo in " + ang + ".";
  return testo;
}

// t = 0--5 i dati sono un lato e un angolo
// t = 6--9 i dati sono due lati
function genera_es(t) {
  const vertici = shuffle();

  // i nomi dell'angolo retto e l'angolo noto
  const retto = vertici[0];
  const ang = vertici[1];

  // i nomi di ipotenusa, cateto opposto, cateto adiacente
  const ipo = vertici[1] + vertici[2];
  const cad = vertici[0] + vertici[1];
  const cop = vertici[0] + vertici[2];

  var testo = "";
  let sol, ipo_val, cad_val, cop_val, ang_val;

  if (t <= 5) {
    ang_val = Math.round(Math.random() * ang_delta) + ang_min;
  }

  switch (t) {
    // ipo -> cad
    case 0:
      ipo_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_l(retto, ang, ang_val, ipo, ipo_val, cad);
      sol = arrotonda2(ipo_val * Math.cos((ang_val * Math.PI) / 180));
      break;

    // ipo -> cop
    case 1:
      ipo_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_l(retto, ang, ang_val, ipo, ipo_val, cop);
      sol = arrotonda2(ipo_val * Math.sin((ang_val * Math.PI) / 180));
      break;

    // cop -> ipo
    case 2:
      cop_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_l(retto, ang, ang_val, cop, cop_val, ipo);
      sol = arrotonda2(cop_val / Math.sin((ang_val * Math.PI) / 180));
      break;

    // cad -> ipo
    case 3:
      cad_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_l(retto, ang, ang_val, cad, cad_val, ipo);
      sol = arrotonda2(cad_val / Math.cos((ang_val * Math.PI) / 180));
      break;

    // cop -> cad
    case 4:
      cop_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_l(retto, ang, ang_val, cop, cop_val, cad);
      sol = arrotonda2(cop_val / Math.tan((ang_val * Math.PI) / 180));
      break;

    // cad -> cop
    case 5:
      cad_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_l(retto, ang, ang_val, cad, cad_val, cop);
      sol = arrotonda2(cad_val * Math.tan((ang_val * Math.PI) / 180));
      break;

    // ipo + cad -> ang
    case 6:
      ipo_val = arrotonda2(Math.random() * lato_delta + lato_min);
      cad_val = arrotonda2(Math.random() * (ipo_val - lato_min) + lato_min / 2);

      testo = genera_testo_a(retto, ipo, ipo_val, cad, cad_val, ang);
      sol = arrotonda2((Math.acos(cad_val / ipo_val) * 180) / Math.PI);
      break;

    // ipo + cop -> ang
    case 7:
      ipo_val = arrotonda2(Math.random() * lato_delta + lato_min);
      cop_val = arrotonda2(Math.random() * (ipo_val - lato_min) + lato_min / 2);

      testo = genera_testo_a(retto, ipo, ipo_val, cop, cop_val, ang);
      sol = arrotonda2((Math.asin(cop_val / ipo_val) * 180) / Math.PI);
      break;

    // cop + cad -> ang
    case 8:
      cop_val = arrotonda2(Math.random() * lato_delta + lato_min);
      cad_val = arrotonda2(Math.random() * lato_delta + lato_min);

      testo = genera_testo_a(retto, cop, cop_val, cad, cad_val, ang);
      sol = arrotonda2((Math.atan(cop_val / cad_val) * 180) / Math.PI);
      break;

    default:
      sol = "??";
      testo = "è stato indicato un tipo di esercizio inesistente...";
      break;
  }

  if (t <= 5) {
    sol += udm_lati;
  } else {
    sol += udm_angoli;
  }

  return { testo, sol };
}
