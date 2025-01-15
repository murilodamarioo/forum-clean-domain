import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswesRespository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswesRespository) {}
 
  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content
    })
    await this.answersRepository.create(answer)

    return answer
  }
}