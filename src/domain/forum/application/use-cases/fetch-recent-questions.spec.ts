
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  
  test('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({
      createdAt: new Date(2025, 0, 15)
    }))
    await inMemoryQuestionsRepository.create(makeQuestion({
      createdAt: new Date(2025, 0, 20)
    }))
    await inMemoryQuestionsRepository.create(makeQuestion({
      createdAt: new Date(2025, 0, 24)
    }))
    

    const { questions } = await sut.execute({
      page: 1
    })
  
    expect(questions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2025, 0, 15),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2025, 0, 20),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2025, 0, 24),
        }),
      }),
    ]));
  })
})