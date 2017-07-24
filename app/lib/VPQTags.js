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
    fortified: { key: 'fortified', label: 'Fortified' },
    viticulture: { key: 'viticulture', label: 'Grape Growing' },
    varietals: { key: 'varietals', label: 'Grape Varietals' },
    geography: { key: 'geography', label: 'Geography' },
    law: { key: 'law', label: 'Labelling Law' },
    terroir: { key: 'terroir', label: 'Terroir' },
    sparkling: { key: 'sparkling', label: 'Sparkling' },
    spirits: { key: 'spirits', label: 'Spirits' },
    viniculture: { key: 'viniculture', label: 'Wine Making' },
    winestyle: { key: 'winestyle', label: 'Wine Style' },
  },

  regions: {
    AU: { key: 'AU', label: 'Australia' },
    AT: { key: 'AT', label: 'Austria' },
    CA: { key: 'CA', label: 'Canada' },
    FR: { key: 'FR', label: 'France' },
    DE: { key: 'DE', label: 'Germany' },
    IT: { key: 'IT', label: 'Italy' },
    NZ: { key: 'NZ', label: 'New Zealand' },
    PT: { key: 'PT', label: 'Portugal' },
    ES: { key: 'ES', label: 'Spain' },
    US: { key: 'US', label: 'United States' },
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
