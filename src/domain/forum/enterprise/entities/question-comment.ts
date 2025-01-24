import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentsProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComments extends Entity<QuestionCommentsProps> {
  
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

  static create(props: Optional<QuestionCommentsProps, 'createdAt'>, id?: UniqueEntityID) {
    const questionComments = new QuestionComments({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)

    return questionComments
  }

}