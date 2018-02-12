const VPQTags = {
  isRegionTag: (tag) => {
    return (VPQTags.regions.includes(tag.toUpperCase()))
  },
  isCategoryTag: (tag) => {
    return (VPQTags.categories.includes(tag))
  },
  isVarietalTag: (tag) => {
    return (VPQTags.varietals.includes(tag))
  },

  split: (list) => {
    const r = VPQTags.splitRegions(list)
    const c = VPQTags.splitCatgories(list)
    const v = VPQTags.splitVarietals(list)

    return { r, c, v }
  },

  splitRegions: (list) => {
    const tags = []
    list.map(t => {
      if (VPQTags.isRegionTag(t)) {
        tags.push(t)
      }
    })

    return tags
  },

  splitCatgories: (list) => {
    const tags = []
    list.map(t => {
      if (VPQTags.isCategoryTag(t)) {
        tags.push(t)
      }
    })

    return tags
  },

  splitVarietals: (list) => {
    const tags = []
    list.map(t => {
      if (VPQTags.isVarietalTag(t)) {
        tags.push(t)
      }
    })

    return tags
  },

  categories: [
    "appellation",
    "climate",
    "viticulture",
    "varietals",
    "geography",
    "law",
    "terroir",
    "viniculture",
    "winestyle",
    "still",
    "fortified",
    "sparkling",
  ],

  regions: [
    'FR',
    'DE',
    'AT',
    'IT',
    'ES',
    'PT',
    'HU',
    'GR',
    'AU',
    'NZ',
    'US',
    'CA',
    'AR',
    'CL',
    'SA',
  ],

  varietals: [
    'gewurztraminer',
    'muscat',
    'pinot_gris',
    'riesling',
    'zinfandel',
    'melon_blanc',
    'sauvignon_blanc',
    'chardonnay',
    'chenin_blanc',
  ]
}

export default VPQTags
