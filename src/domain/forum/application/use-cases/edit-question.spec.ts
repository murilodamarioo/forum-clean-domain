
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  
  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      content: 'Edited content',
      title: 'Edited title'
    })
  
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: 'Edited content',
      title: 'Edited title'
    })
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    inMemoryQuestionsRepository.create(newQuestion)
  
    await expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        content: 'Edited content',
        title: 'Edited title'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})