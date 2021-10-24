import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto: createBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get(':id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete(':id')
  deleteBoardById(@Param('id') id: string): string {
    this.boardsService.deleteBoardById(id);
    return `${id} deleted`;
  }
}
