const VPQTags = {
  split: (list) => {
    const regions = []
    const categories = []
    const varietals = []

    list.map(t => {
      if (VPQTags.regions.hasOwnProperty(t.toUpperCase())) {
        regions.push(t)
      }
      if (VPQTags.categories.hasOwnProperty(t)) {{
        categories.push(t)
      }}
      if (VPQTags.varietals.hasOwnProperty(t.toUpperCase())) {
        regions.push(t)
      }
    })

    return {
      regions,
      categories,
      varietals,
    }
  },

  categories: {
    climate: { key: 'climate', label: 'Climate' },
    viticulture: { key: 'viticulture', label: 'Grape Growing' },
    varietals: { key: 'varietals', label: 'Grape Varieties' },
    geography: { key: 'geography', label: 'Geography' },
    law: { key: 'law', label: 'Appellation & Labelling Laws' },
    terroir: { key: 'terroir', label: 'Terroir' },
    viniculture: { key: 'viniculture', label: 'Wine Making' },
    winestyle: { key: 'winestyle', label: 'Wine Styles' },
    still: { key: 'still', label: 'Still Wines' },
    fortified: { key: 'fortified', label: 'Fortified' },
    sparkling: { key: 'sparkling', label: 'Sparkling' },
  },

  regions: {
    FR: { key: 'FR', label: 'France' },
    DE: { key: 'DE', label: 'Germany' },
    AT: { key: 'AT', label: 'Austria' },
    IT: { key: 'IT', label: 'Italy' },
    ES: { key: 'ES', label: 'Spain' },
    PT: { key: 'PT', label: 'Portugal' },
    HU: { key: 'HU', label: 'Hungary' },
    GR: { key: 'GR', label: 'Greece' },
    AU: { key: 'AU', label: 'Australia' },
    NZ: { key: 'NZ', label: 'New Zealand' },
    US: { key: 'US', label: 'United States' },
    CA: { key: 'CA', label: 'Canada' },
    AR: { key: 'AR', label: 'Argentina' },
    CL: { key: 'CL', label: 'Chile' },
    SA: { key: 'SA', label: 'South Africa' },
  },

  varietals: {
    gewurztraminer: { key: 'gewurztraminer', label: 'Gewurztraminer' },
    muscat: { key: 'muscat', label: 'Muscat' },
    pinot_gris: { key: 'pinot_gris', label: 'Pinot Gris' },
    riesling: { key: 'riesling', label: 'Riesling' },
    zinfandel: { key: 'zinfandel', label: 'Zinfandel' },
  }
}

export default VPQTags
