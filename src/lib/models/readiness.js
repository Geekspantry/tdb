Readiness = new Mongo.Collection('readiness');

Schemas.Readiness = new SimpleSchema({
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
    type: [Schemas.Answer]
  }
});
