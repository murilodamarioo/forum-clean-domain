import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttchamentProps {
  title: string
  link: string
}


export class Attchament extends Entity<AttchamentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttchamentProps, id?: UniqueEntityID) {
    const attachment = new Attchament(props, id)

    return attachment
  }
}