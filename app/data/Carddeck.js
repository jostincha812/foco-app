export default class Carddeck {
  constructor(deck) {
    this.id = deck.id;
    this.title = deck.title;
    this.flashcards = deck.flashcards;
  }

  cardsInDeck() {
    return this.flashcards ? this.flashcards.length : 0;
  }
}
