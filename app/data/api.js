const data = {
  userActivites: [
    { id: '01231',
      title: 'Canada & US winemaking',
      tags: ['CA', 'US', 'viniculture'],
      numNew: 3,
      numTotal: 23,
      numFavorited: 5,
      bookmarked: false,
    },
    { id: '01232',
      title: 'Burgundy appellations & laws',
      tags: ['FR', 'burgundy', 'laws'],
      numNew: 0,
      numTotal: 37,
      numFavorited: 10,
      bookmarked: true,
    },
    { id: '01233',
      title: 'Bordeaux winestyles & varietals',
      tags: ['FR', 'bordeaux', 'winestyle', 'varietal'],
      numNew: 8,
      numTotal: 12,
      numFavorited: 0,
      bookmarked: false,
    },
  ],
}

export default (key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data[key])
    }, Math.floor(Math.random() * 3000))
  })
}
