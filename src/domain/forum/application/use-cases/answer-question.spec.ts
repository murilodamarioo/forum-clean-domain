import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswesRespository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswesRespository = {
  create: async (answer: Answer) => {
    return
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})