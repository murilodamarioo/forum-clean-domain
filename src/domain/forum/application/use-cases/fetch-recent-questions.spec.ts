
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-questions'
import { InMemoryQuestionAttachmentsRepository } from 'test/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  
  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2022, 0, 23),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2022, 0, 20),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2022, 0, 18),
        }),
      }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }
    
    const result = await sut.execute({
      page: 2
    })
  
    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})