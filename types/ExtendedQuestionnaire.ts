import { Questionnaire } from '@prisma/client';

export type ExtendedQuestionnaire = Questionnaire & {
  averageScore: number;
  dateToDisplay: string;
};
