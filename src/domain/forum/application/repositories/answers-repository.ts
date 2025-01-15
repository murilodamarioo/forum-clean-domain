import { Answer } from '../../enterprise/entities/answer' 

export interface AnswesRespository {
  
  create(answer: Answer): Promise<void>

}