
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  
  test('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Question One',
      content: 'New question'
    })
  
    expect(question.id).toBeTruthy()
  })
})