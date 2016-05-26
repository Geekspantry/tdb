import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const AnswerSchema = new SimpleSchema({
  q01: {
    type: Number
  },
  q02: {
    type: Number
  },
  q03: {
    type: Number
  },
  q04: {
    type: Number
  },
  q05: {
    type: Number
  },
  q06: {
    type: Number
  },
  q07: {
    type: Number
  },
  q08: {
    type: Number
  },
  q09: {
    type: Number
  },
  q10: {
    type: Number
  }
});

export const ReadinessSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    }
  },
  expertise: {
    type: Number
  },
  answers: {
    type: [AnswerSchema]
  }
});
