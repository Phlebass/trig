let csv_content = "";

function genera() {
  const list = document.getElementById("exlist");
  list.innerHTML = "";

  let soluzioni = "Soluzioni: ";
  csv_content =
    "Tipo,Domanda,Risposta 1,Risposta 2,Risposta 3,Esatta,Immagine,Risposte Max,Feedback Prima,Feedback,Feedback Esatta,Feedback Errata,Feedback Nulla,Punteggio Esatta,Punteggio errata,Punteggio nulla,Risposte Casuali,Obbligatoria\n";

  const l = 9;
  // scombina l'ordine degli esercizi
  let ex_type_list = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let j = 0; j < l; j++) {
    r = Math.floor(Math.random() * (l - j)) + j;
    [ex_type_list[j], ex_type_list[r]] = [ex_type_list[r], ex_type_list[j]];
  }
  console.log(ex_type_list);

  for (let i = 1; i <= l; i++) {
    const ex = document.createElement("li");
    const ex_generato = genera_es(ex_type_list[i - 1]);
    ex.innerHTML =
      ex_generato.testo +
      "<br>" +
      `Soluzione: <span class='soluzione'> ${ex_generato.sol}. </span>`;
    list.appendChild(ex);
    soluzioni += `(${i}) ${ex_generato.sol} `;
    csv_content +=
      '4,"' +
      ex_generato.testo +
      '",,,,' +
      ex_generato.sol +
      ",,1,,,,,,1,0,0,,\n";
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
