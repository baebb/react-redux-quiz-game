# Overview

Your goal is to write a simple single-page quiz creation application, with persistence.

A quiz consists of a series of questions and answers.

# Specification

- The quiz creator should be able to edit the quiz in the following manners:
  - Add question/answer pairs to a quiz
  - Edit existing questions/answers
  - Remove existing question/answer pairs
- The page should attempt to save the quiz, and restore it upon reload.
  **Saving the quiz is asynchronous and can sometimes fail**.
- The quiz creator should be able to tell when the quiz has been saved.
  Importantly, **anything unsaved should be somehow indicated as such**.
  "Saving" indicators can be either at the level of individual questions, or global to the quiz.

### Mocking save

For the purposes of this challenge, you should use a mock implementation of save
which simply uses localStorage or cookies (as opposed to hitting an actual server).
However, it should be simple to substitute a different implementation.

Here's an example callback-based mock implementation:

```
function saveQuiz(quiz, cb) {
  setTimeout(() => {
    if (Math.random() < 0.1) {
      // pretend the save failed
      return cb(new Error('Error: Quiz randomly failed to save'));
    }
    // pretend the save succeeded
    localStorage.setItem('quiz', quiz.serialize());
    return cb(null);
  }, Math.random() * 1000);
}
```

Here's an example Promise-based mock implementation:

```
function saveQuiz(quiz) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        // pretend the save failed
        return reject(new Error('Error: Quiz randomly failed to save'));
      }
      // pretend the save succeeded
      localStorage.setItem('quiz', quiz.serialize());
      return resolve();
    }, Math.random() * 1000);
  });
}
```

### What we're looking for

We value:
- **correctness**: pay careful attention to possible race conditions and error handling.
- **general maintainability**: readability, testability, and extensability.

### Dos and don'ts

Please *DO*:
- Use any frameworks, libraries, and/or build system you're comfortable with.
- Use any resources on the internet, including starter repos like
  https://github.com/gaearon/react-hot-boilerplate or https://github.com/AngularClass/NG6-starter
- Acknowledge any non-trivial piece of code not written by you (i.e. pasted from the internet into your code.  no need to acknowledge libraries)

Please *DO NOT*:
- Worry about general polish - e.g. small usability issues, how nice the app looks
- Spend a full day working on this.  We value your time!

And please don't hesitate to reach out if you have any other questions.

# Submission

When you're done, send (zipped or tarred) the folder containing your source code,
to either your previous point of contact, or to jobs@cloudlabs.io.
Please also include instructions for running, if relevant.

We expect this challenge to take 2-4 hours in total.
Please let us know how long it actually took you,
as well as any other information or comments you wish to share with us.
