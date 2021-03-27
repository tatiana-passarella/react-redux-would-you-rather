let users = {
  antihero: {
    id: 'antihero',
    name: 'Antihero',
    avatarURL: '/img/avatars/antihero.png',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  asterix: {
    id: 'asterix',
    name: 'Asterix',
    avatarURL: '/img/avatars/asterix.png',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  daftpunk: {
    id: 'daftpunk',
    name: 'Daftpunk',
    avatarURL: '/img/avatars/daftpunk.png',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  hannibal: {
    id: 'hannibal',
    name: 'Hannibal',
    avatarURL: '/img/avatars/hannibal.png',
    answers: {},
    questions: []
  },
  hulk: {
    id: 'hulk',
    name: 'Hulk',
    avatarURL: '/img/avatars/hulk.png',
    answers: {},
    questions: []
  },
  joker: {
    id: 'joker',
    name: 'Joker',
    avatarURL: '/img/avatars/joker.png',
    answers: {},
    questions: []
  },
  scream: {
    id: 'scream',
    name: 'Scream',
    avatarURL: '/img/avatars/scream.png',
    answers: {},
    questions: []
  },
  spiderman: {
    id: 'spiderman',
    name: 'Spiderman',
    avatarURL: '/img/avatars/spiderman.png',
    answers: {},
    questions: []
  }
};

let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'asterix',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['asterix'],
      text: 'Is better the summer'
    },
    optionTwo: {
      votes: [],
      text: 'Is better the winter'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'daftpunk',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'Horror film'
    },
    optionTwo: {
      votes: ['daftpunk', 'asterix'],
      text: 'Romantic film'
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'asterix',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'Do the work you love'
    },
    optionTwo: {
      votes: ['asterix'],
      text: 'Do the work better payed'
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'hulk',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'MAC'
    },
    optionTwo: {
      votes: ['asterix'],
      text: 'PC'
    }
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'hulk',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['hulk'],
      text: 'Be invisible'
    },
    optionTwo: {
      votes: ['daftpunk'],
      text: 'Read minds of others'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'daftpunk',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['daftpunk'],
      text: 'Learn Javascript'
    },
    optionTwo: {
      votes: ['hulk'],
      text: 'Larn PHP'
    }
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}
