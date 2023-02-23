import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/search')
  searchMovies(@Query('title') mvoieTitle: string) {
    return `search movies title includes '${mvoieTitle}'`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  createMovie(@Body() movieData): Movie[] {
    return this.moviesService.createMovie(movieData);
  }

  @Delete('/:id')
  removeMovie(@Param('id') movieId: string): Movie[] {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  updateMovie(@Param('id') movieId: string, @Body() updateData): Movie[] {
    return this.moviesService.updateMovie(movieId, updateData);

    /*return {
      updatedMovieId: movieId,
      ...updateData,
    };*/
  }
}
