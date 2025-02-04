
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
  })
  
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(makeQuestionAttachment({
      questionId: newQuestion.id,
      attachmentId: new UniqueEntityID('1')
    }))

    inMemoryQuestionAttachmentsRepository.items.push(makeQuestionAttachment({
      questionId: newQuestion.id,
      attachmentId: new UniqueEntityID('2')
    }))

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Edited title',
      content: 'Edited content',
      attachmentsIds: ['1', '3']
    })
  
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: 'Edited content',
      title: 'Edited title'
    })
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    inMemoryQuestionsRepository.create(newQuestion)
  
    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-2',
      content: 'Edited content',
      title: 'Edited title',
      attachmentsIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})