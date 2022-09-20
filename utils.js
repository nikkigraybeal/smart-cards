const getSetInfo = (cards) => {
  const setInfo = {}
  cards.forEach(card => {
    if (!(card.subject in setInfo)) {
      setInfo[card.subject] = {}
    }
  })
  //  {Science: {},
  //   History: {}
  //  }
  cards.forEach(card => {
    if (!(card.subcategory in setInfo[card.subject])) {
      setInfo[card.subject][card.subcategory] = []
    }
  })
  //  {Science: {biology: [], computer science: []},
  //   History: {american rev: []
  //  }
  cards.forEach(card => {
    if (!setInfo[card.subject][card.subcategory].includes(card.title)) {
      setInfo[card.subject][card.subcategory].push(card.title)
    }
  })
  console.log(setInfo)
  return setInfo
}

module.exports = {
  getSetInfo
}