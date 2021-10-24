import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post('/')
  createBoard(@Body() createBoardDto: createBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }
}
