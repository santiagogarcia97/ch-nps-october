export interface SurveyAnswer {
  answer: string;
  option: string;
  optionText: string;
  score: number | null;
  id: string;
  createdAt: string;
}

export interface GraphProps {
  answers: SurveyAnswer[];
  countTotal: number;
}

export interface AnswersTableProps {
  answers: SurveyAnswer[];
}
