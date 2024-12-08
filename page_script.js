let csv_content = "";

const tipi_es = [
  "angolo e ipotenusa &#8594 cateto adiacente",
  "angolo e ipotenusa &#8594 cateto opposto",
  "angolo e cateto opposto &#8594 ipotenusa",
  "angolo e cateto adiacente &#8594 ipotenusa",
  "angolo e cateto opposto &#8594 cateto adiacente",
  "angolo e cateto adiacente &#8594 cateto opposto",
  "ipotenusa e cateto adiacente &#8594 angolo",
  "ipotenusa e cateto opposto &#8594 angolo",
  "cateto opposto e cateto adiacente &#8594 angolo",
];

const udm = ["u", "cm", "m", "N"];

function scrivi_impostazioni() {
  const imp = document.getElementById("impostazioni");
  let s = "Quali tipi di esercizi?<br>";
  for (let i = 0; i < 9; i++) {
    s += `<input type="checkbox" name="ese${i}" id="ese${i}" checked /> <label for="ese${i}"> ${tipi_es[i]} </label><br>`;
  }

  s +=
    "<br>Quanti blocchi di esercizi?<br> Ogni blocco contiene un esercizio di ogni tipo selezionato.<br>L'ordine all'interno dei blocchi è casuale.<br>";

  s +=
    "<label for='n_blocchi'>Numero di blocchi (1&#8212;10) </label>" +
    "<input type='number' id='n_blocchi' name='n_blocchi' min='1' max='10' value='1'>";

  imp.innerHTML = s;
}

function genera() {
  const list = document.getElementById("exlist");
  list.innerHTML = "";

  let soluzioni = "Soluzioni: ";
  csv_content =
    "Tipo,Domanda,Risposta 1,Risposta 2,Risposta 3,Esatta,Immagine,Risposte Max,Feedback Prima,Feedback,Feedback Esatta,Feedback Errata,Feedback Nulla,Punteggio Esatta,Punteggio errata,Punteggio nulla,Risposte Casuali,Obbligatoria\n";

  // A list of True and False, obtained reading the checkboxes
  const l = 9;
  let ex_type_list = [];
  for (let i = 0; i < l; i++) {
    if (document.getElementById(`ese${i}`).checked) {
      ex_type_list.push(i);
    }
  }

  const num_es = ex_type_list.length;
  const num_block = document.getElementById("n_blocchi").value;

  for (let z = 0; z < num_block; z++) {
    // scombina l'ordine degli esercizi
    for (let j = 0; j < num_es; j++) {
      r = Math.floor(Math.random() * (num_es - j)) + j;
      [ex_type_list[j], ex_type_list[r]] = [ex_type_list[r], ex_type_list[j]];
    }

    if (num_es == 0) {
      const no_ex = document.createElement("li");
      no_ex.innerHTML =
        "Un dugongo fatto di pongo lo compongo e ricompongo. Ma se dispongo di un dugongo, ho uno iato o ho un dittongo?<br>" +
        "Soluzione: <span class='soluzione'> Onestamente non lo so. Se vuoi un esercizio di trigonometria, seleziona almeno un tipo. </span>";
      list.appendChild(no_ex);
    }

    for (let i = 1; i <= num_es; i++) {
      const ex = document.createElement("li");
      const ex_generato = genera_es(ex_type_list[i - 1]);
      ex.innerHTML =
        ex_generato.testo +
        "<br>" +
        `Soluzione: <span class='soluzione'> ${ex_generato.sol}. </span>`;
      list.appendChild(ex);
      soluzioni += `(${i + z * num_es}) ${ex_generato.sol} `;
      csv_content +=
        '4,"' +
        ex_generato.testo +
        '",,,,' +
        ex_generato.sol +
        ",,1,,,,,,1,0,0,,\n";
    }
  }
  // stuff for csv export
  const blob = new Blob([csv_content], {
    type: "text/plain;charset=utf-8;",
  });

  const csv_downloader = document.getElementById("csv_downloader");
  csv_downloader.href = window.URL.createObjectURL(blob);
  csv_downloader.download = "domande_trig.csv";
  document.getElementById("csv_stuff").style.display = "block";
}

function write_csv() {
  const csv_div = document.getElementById("csv_text");
  //csv_content = csv_content.replace(/°/g, "&deg");
  csv_div.innerText = csv_content;
}

function impostazioni_toggle() {
  const imp = document.getElementById("impostazioni");
  if (imp.style.display == "block") imp.style.display = "none";
  else imp.style.display = "block";
}
