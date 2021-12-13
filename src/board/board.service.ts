import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private BoardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: createBoardDto, user: User): Promise<Board> {
    return this.BoardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.BoardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Board Not Found, id: ${id}`);
    }
    return found;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.BoardRepository.find();
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.BoardRepository.save(board);
    return board;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.BoardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board Not Found, id: ${id}`);
    }
  }
}
