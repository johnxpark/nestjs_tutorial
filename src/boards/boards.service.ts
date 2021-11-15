import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)
    private BoardsRepository: BoardsRepository,
  ) {}

  createBoard(createBoardDto: createBoardDto): Promise<Board> {
    return this.BoardsRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.BoardsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Board Not Found, id: ${id}`);
    }
    return found;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.BoardsRepository.find();
  }

  async updateBoardStatus(id: number, status: BoardsStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.BoardsRepository.save(board);
    return board;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.BoardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board Not Found, id: ${id}`);
    }
  }
}
