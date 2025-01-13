import { Answer } from '../entities/answer' 

export interface AnswesRespository {
  
  create(answer: Answer): Promise<void>

}