import { expect, test } from 'vitest'
import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionRepository = {
  create: async (question: Question) => {}
}

test('create a question', async () => {
  const answerQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await answerQuestion.execute({
    authorId: '1',
    title: 'Question One',
    content: 'New question'
  })

  expect(question.id).toBeTruthy()
})