import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentsProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComments extends Entity<AnswerCommentsProps> {
  
  get authorId() {
    return this.props.authorId
  }
  
  get content() {
    return this.props.content
  }

  get createAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(props: Optional<AnswerCommentsProps, 'createdAt'>, id?: UniqueEntityID) {
    const answerComments = new AnswerComments({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)

    return answerComments
  }

}