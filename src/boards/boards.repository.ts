import { EntityRepository, Repository } from 'typeorm';
import { BoardsStatus } from './boards-status.enum';
import { Board } from './boards.entity';
import { createBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async createBoard(createBoardDto: createBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardsStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
}
