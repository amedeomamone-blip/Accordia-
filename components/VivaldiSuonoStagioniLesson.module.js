import React from "https://esm.sh/react@18";
const coordinates = [
  {
    id: "movimento",
    title: "Movimento",
    accent: "linee in corsa",
    copy: "Nel Barocco la musica sembra sempre in azione. Le melodie corrono, si inseguono, cambiano direzione e creano una forte sensazione di vitalita.",
    style: {
      "--card-left": "6%",
      "--card-top": "8%",
      "--card-depth": "78px",
      "--card-rotate": "-8deg",
      "--card-width": "13.5rem"
    }
  },
  {
    id: "contrasto",
    title: "Contrasto",
    accent: "opposti in tensione",
    copy: "Il Barocco ama gli opposti: forte e piano, solo e tutti, luce e ombra, tensione e riposo. Il contrasto rende la musica piu viva e drammatica.",
    style: {
      "--card-left": "33%",
      "--card-top": "1%",
      "--card-depth": "148px",
      "--card-rotate": "5deg",
      "--card-width": "14.5rem"
    }
  },
  {
    id: "meraviglia",
    title: "Meraviglia",
    accent: "sorpresa sonora",
    copy: "L'arte barocca vuole stupire. La musica cerca effetti capaci di sorprendere chi ascolta, creando immagini, emozioni e colpi di scena.",
    style: {
      "--card-left": "69%",
      "--card-top": "11%",
      "--card-depth": "88px",
      "--card-rotate": "7deg",
      "--card-width": "14rem"
    }
  },
  {
    id: "teatralita",
    title: "Teatralita",
    accent: "scene e risposte",
    copy: "Anche quando non c'e un palcoscenico, la musica barocca spesso si comporta come una scena: entrate, risposte, gesti, dialoghi e tensioni.",
    style: {
      "--card-left": "12%",
      "--card-top": "45%",
      "--card-depth": "116px",
      "--card-rotate": "4deg",
      "--card-width": "14.4rem"
    }
  },
  {
    id: "energia",
    title: "Energia",
    accent: "spinta ritmica",
    copy: "Il ritmo, la ripetizione e la spinta degli strumenti danno alla musica barocca una forza continua, chiara e riconoscibile.",
    style: {
      "--card-left": "43%",
      "--card-top": "34%",
      "--card-depth": "188px",
      "--card-rotate": "-2deg",
      "--card-width": "14.2rem"
    }
  },
  {
    id: "luce-ombra",
    title: "Luce e ombra",
    accent: "chiaro e scuro",
    copy: "Come nella pittura barocca, anche nella musica si alternano momenti luminosi e momenti piu scuri, sospesi o drammatici.",
    style: {
      "--card-left": "68%",
      "--card-top": "54%",
      "--card-depth": "126px",
      "--card-rotate": "-6deg",
      "--card-width": "15rem"
    }
  },
  {
    id: "gesto",
    title: "Gesto",
    accent: "attacchi evidenti",
    copy: "Il Barocco e fatto di gesti musicali evidenti: un attacco deciso, una corsa del violino, una risposta dell'orchestra, un cambio improvviso.",
    style: {
      "--card-left": "37%",
      "--card-top": "72%",
      "--card-depth": "74px",
      "--card-rotate": "8deg",
      "--card-width": "12.8rem"
    }
  }
];
function FloatingCard({ item, index, isActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-coordinate-card${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(item.id),
      "aria-pressed": isActive,
      style: item.style
    },
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-coordinate-card__index" }, String(index + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("strong", null, item.title),
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-coordinate-card__accent" }, item.accent)
  );
}
function VivaldiSuonoStagioniLesson() {
  const [activeId, setActiveId] = React.useState(coordinates[0].id);
  const activeItem = coordinates.find((item) => item.id === activeId) ?? coordinates[0];
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page vivaldi-lesson", "data-lesson-model": "editoriale" }, /* @__PURE__ */ React.createElement("section", { className: "vivaldi-context-block", id: "contesto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-context-block__shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__eyebrow" }, "Il Barocco \xB7 Contesto storico-culturale"), /* @__PURE__ */ React.createElement("h1", null, "Il Barocco in coordinate"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__intro" }, "Il Barocco e un'epoca di movimento, contrasto e meraviglia. La musica non resta ferma: cerca l'effetto, il gesto, la tensione, la sorpresa. Prima di ascoltare Vivaldi, entriamo nelle coordinate che ci aiutano a capire il suo mondo sonoro.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-stage" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-coordinate-map", "aria-label": "Mappa concettuale del Barocco" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-coordinate-map__grid", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-coordinate-map__core", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null, "Barocco")), coordinates.map((item, index) => /* @__PURE__ */ React.createElement(
    FloatingCard,
    {
      key: item.id,
      item,
      index,
      isActive: item.id === activeItem.id,
      onSelect: setActiveId
    }
  ))), /* @__PURE__ */ React.createElement(
    "aside",
    {
      className: "vivaldi-coordinate-panel",
      "aria-live": "polite",
      "aria-labelledby": "vivaldi-coordinate-panel-title"
    },
    /* @__PURE__ */ React.createElement("p", { className: "vivaldi-coordinate-panel__label" }, "Coordinata attiva"),
    /* @__PURE__ */ React.createElement("h2", { id: "vivaldi-coordinate-panel-title" }, activeItem.title),
    /* @__PURE__ */ React.createElement("p", null, activeItem.copy),
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-coordinate-panel__hint" }, "Seleziona le card per attraversare il Barocco come una mappa di forze, gesti e contrasti.")
  )))));
}
export {
  VivaldiSuonoStagioniLesson as default
};
