"use strict";
//

// NOTE OVDE PRAVIM FUNKCIJU ZA RACUNANJE STAZA
const izracunaj = function () {
  // NOTE DEFINISANJE VARIJABLI  - ovde su da bi na btn izracunaj resetovapo vrednosti a ne dodavao na prethodno zapamcene
  const startDate = [];
  const endDate = [];
  const diffStaz = [];
  let totalD = 0;
  let totalM = 0;
  let totalY = 0;
  const table = document.getElementById("myTable");
  let rowCount = table.rows.length - 2;

  // d1 = moment(document.getElementById("prijava--1").value).format("D-MM-YYYY");
  // console.log(rowCount);
  for (let i = 0; i <= rowCount - 1; i++) {
    // KREIRANJE NIZA SA POCETNIM DATUMIMA
    startDate.push(startDate[i]);
    startDate[i] = moment(document.getElementById(`prijava--${i}`).value);
    // KREIRANJE NIZA ZA ZAVRSNIM DATUMIMA
    endDate.push(endDate[i]);
    endDate[i] = moment(document.getElementById(`odjava--${i}`).value);
    // KREIRANJE NIZA OBJEKATA RAZLIKE PO UNOSIMA
    diffStaz.push(diffStaz[i]);
    diffStaz[i] = moment.preciseDiff(endDate[i], startDate[i], true);
    diffStaz[i].days = diffStaz[i].days + 1; // NOTE - dodat jedan dan vise jer Momen.js ne racuna poslednji dan tj dan odjave

    // -- zbog dodatog jednog dana - prebacivanje u mesec kada je 31 dan! Ako mesec ima 30 dana to prebacivanje bude aktivno u konacnom zbiru
    if (diffStaz[i].days >= 31) {
      diffStaz[i].months =
        diffStaz[i].months + Math.floor(diffStaz[i].days / 31); // prebacivanje u mesece
      diffStaz[i].days =
        diffStaz[i].days - Math.floor(diffStaz[i].days / 31) * 31; // racunanje ostatka
    }
    if (diffStaz[i].months >= 12) {
      diffStaz[i].years =
        diffStaz[i].years + Math.floor(diffStaz[i].months / 12);
      diffStaz[i].months =
        diffStaz[i].months - Math.floor(diffStaz[i].months / 12) * 12;
    }
    // ISPITIVANJE POZITIVNIH REZULTATA
    if (diffStaz[i].days || diffStaz[i].months || diffStaz[i].years) {
      // ISPISIVANJE RAZLIKE POJEDINACNIH UNOSA u PLACEHOLDER
      document.getElementById(
        `holder--${i}`
      ).placeholder = `${diffStaz[i].years} god, ${diffStaz[i].months} mes, ${diffStaz[i].days} dan`;
      document.getElementById(`holder--${i}`).classList.add("highLightScore");
      // SABIRANJE SVIH RAZLIKA SA BROJEVIMA
      totalD = totalD + diffStaz[i].days;
      totalM = totalM + diffStaz[i].months;
      totalY = totalY + diffStaz[i].years;
    }
  }
  // NOTE ---- PREBACIVANJE SABRANIH DANA U MESECE I GODINE I ZAOKRUZIVANJE
  if (totalD >= 30) {
    totalM = totalM + Math.floor(totalD / 30); // prebacivanje u mesece
    totalD = totalD - Math.floor(totalD / 30) * 30; // racunanje ostatka
  }
  if (totalM >= 12) {
    totalY = totalY + Math.floor(totalM / 12);
    totalM = totalM - Math.floor(totalM / 12) * 12;
  }
  document.getElementById(
    "ukupno"
  ).textContent = `${totalY} god. ${totalM} mes. ${totalD} dan.`;
  document.querySelector(".rezultat").classList.remove("hidden");
  // console.log(startDate);
  // console.log(endDate);
  // console.log(diffStaz);
  // console.log(`${totalY} god. ${totalM} mes. ${totalD} dan.`);
};

btnIzracunaj.addEventListener("click", izracunaj);
// FUNKCIJA DODAVANJA REDA TABELE ZA NOVE UNOSE
const addNewRow = function () {
  const table = document.getElementById("myTable");
  let rowCount = table.rows.length;
  const newRow = table.insertRow(rowCount - 1);

  /// TD-1 Start dates
  let cell1 = newRow.insertCell(0);
  let newStart = document.createElement("input");
  newStart.setAttribute("type", "date");
  newStart.setAttribute("id", `prijava--${rowCount - 2}`);
  newStart.setAttribute("value", "");
  cell1.appendChild(newStart);

  //TD-2 End date
  let cell2 = newRow.insertCell(1);
  let newEnd = document.createElement("input");
  newEnd.setAttribute("id", `odjava--${rowCount - 2}`);
  newEnd.setAttribute("type", "date");
  newEnd.setAttribute("value", "");
  cell2.appendChild(newEnd);
  // TD-3 Razlika staza - Placeholder
  let cell3 = newRow.insertCell(2);
  let newDiffPlace = document.createElement("input");
  newDiffPlace.setAttribute("id", `holder--${rowCount - 2}`);
  newDiffPlace.setAttribute("placeholder", `staž unosa ${rowCount - 1}`);
  cell3.appendChild(newDiffPlace);

  // cell1.innerHTML = <input id="prijava--5" name="start" type="date" value="" />;
};
