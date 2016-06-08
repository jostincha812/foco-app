import C from '../constants';

class MCQuestion {
  _key = C.UNDEFINED;
  _question = "";
  _category = C.UNDEFINED;
  _choices = []
  _answerKey = 0;
  _flashText1 = "";
  _flashText2 = "";

  constructor (category, question, choices, answerKey) {
    this._category = category;
    this._question = question;
    this._choices = choices;
    this._answerKey = answerKey;
  }
}

const MCQuestions = [
  { key:"xxx", category:C.CAT_CLIMATE,
    question: "What type of _climate_ does Northern Rhône have?",
    choices: [
      "Continental",
      "Maritime",
      "Mediterranean"
    ]
    answerKey: 1,
    flashText1: "_Climate_ of Northern Rhône",
    flashText2: "Northern Rhône is characterised by a continental climate with harsh winters but warm summers. Its climate is influenced by the mistral wind, which brings colder air from the Massif Central. Northern Rhône is therefore cooler than southern Rhône, which means that the mix of planted grape varieties and wine styles are slightly different.",
  }
]

export default MCQuestions;
