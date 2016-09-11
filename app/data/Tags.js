const T = {
  UNKNOWN: "UNKNOWN",
  C_VARIETALS: "c_varietals",
  C_VINICULTURE: "c_viniculture",   // includes climate and soils, excludes geography
  C_GEOGRAPHY: "c_geography",       // related to viniculture
  C_WINEMAKING: "c_vinification",
  C_WINESTYLES: "c_winestyle",
  C_LAWS: "c_law",
  C_SPARKLING: "c_sparkling",
  C_FORTIFIED: "c_fortified",
  C_SPIRITS: "c_spirits",
  C_PORT: "c_port",
  C_WHISKY: "c_whisky",

  R_ARGENTINA: "r_ar",
  R_AUSTRIA: "r_at",
  R_AUSTRALIA: "r_au",
  R_CANADA: "r_ca",
  R_CHILE: "r_cl",
  R_FRANCE: "r_fr",
  R_GERMANY: "r_de",
  R_GREECE: "r_gr",
  R_HUNGARY: "r_hu",
  R_ITALY: "r_it",
  R_NEW_ZEALAND: "r_nz",
  R_PORTUGAL: "r_pt",
  R_SOUTH_AFRICA: "r_za",
  R_SPAIN: "r_es",
  R_TURKEY: "r_tr",
  R_UNITED_STATES: "r_us",

  V_CHARDONNAY: "v_chardonnay",
  V_PINOTNOIR: "v_pinotnoir",
  V_GAMAY: "v_gamay",

}

const tagLabelsMap = {
  C_VARIETALS: [
    "varietals",
    "grape varieties",
  ],
  C_VINICULTURE: [
    "viniculture",
    "grape growing",
    "climate",
    "soils",
    "terroir",
  ],
  C_GEOGRAPHY: [
    "geography",
    "regions",
  ],
  C_WINEMAKING: [
    "wine making",
    "vinification",
  ],
  C_WINESTYLES: [
    "wine style",
  ],
  C_LAWS: [
    "labelling laws",
    "appellations",
    "wine laws",
  ],
  C_SPARKLING: [
    "sparkling",
    "cava",
    "champagne",
    "prosecco",
  ],
  C_FORTIFIED: [
    "madeira",
    "sherry",
    "vermouth",
    "marsala",
  ],
  C_PORT: [
    "port",
  ],
  C_WHISKY: [
    "whisky",
    "whiskey",
    "single malt",
    "bourbon",
    "scotch",
    "tennessee",
  ],
  R_ARGENTINA: ["argentina"],
  R_AUSTRIA: ["austria"],
  R_AUSTRALIA: ["australia"],
  R_CANADA: ["canada"],
  R_CHILE: ["chile"],
  R_FRANCE: ["france"],
  R_GERMANY: ["germany"],
  R_GREECE: ["greece"],
  R_HUNGARY: ["hungary"],
  R_ITALY: ["italy"],
  R_NEW_ZEALAND: ["new zealand"],
  R_PORTUGAL: ["portugal"],
  R_SOUTH_AFRICA: ["south africa"],
  R_SPAIN: ["spain"],
  R_TURKEY: ["turkey"],
  R_UNITED_STATES: ["united states", "us", "usa"],
}

// this.state.tags.split(' ').map((t) => {tags[t.trim()] = true});
function tagLabels() {
  var labels = [];
  Object.keys(tagLabelsMap).map((k,i) => {
    labels = labels.concat(tagLabelsMap[k]);
  });

  return labels;
}

function tagForLabel(label) {
  var tag = T.UNKNOWN;
  Object.keys(tagLabelsMap).map((k,i) => {
    if (tagLabelsMap[k].includes(label)) {
      tag = T[k];
    };
  });

  if (tag == T.UNKNOWN) {
    return `${T.UNKNOWN}_${label.replace(' ','_')}`;
  }

  return tag;
}

module.exports = {
  T,
  tagLabels,
  tagForLabel
}
