const getSubjects = (cards) => {
  const subjects = []
      cards.forEach(card => {
        if (!subjects.includes(card.subject)) {
          subjects.push(card.subject)
        }
      })
      return subjects
}

module.exports = {
  getSubjects
}