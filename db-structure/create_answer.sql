CREATE TABLE answer (
  answer_id          SERIAL,
  question_id        INTEGER NOT NULL REFERENCES question(question_id),
  option_position    INTEGER NOT NULL,
  answer_text        VARCHAR(500) NOT NULL,
  answer_score       INTEGER NOT NULL,
    CONSTRAINT fk_question_id
      FOREIGN KEY (question_id) 
            REFERENCES question(question_id),
    PRIMARY KEY (answer_id)
);