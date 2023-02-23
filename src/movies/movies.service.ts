import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) throw new NotFoundException(`Movie Not Found ID : ${id}`);
    return movie;
  }

  deleteOne(id: string): Movie[] {
    this.getOne(id);
    return this.movies.filter((movie) => movie.id !== +id);
  }

  createMovie(movieData): Movie[] {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies;
  }

  updateMovie(movieId, upData): Movie[] {
    this.getOne(movieId);

    const movieObj: Movie = {
      id: Number(movieId),
      ...upData,
    };
    console.log(movieObj);
    const tempMovies = [
      ...this.movies.map((movie) => {
        if (movie.id === movieObj.id) return { ...movie, ...upData }; //바뀐 부분만 업데이트 가능
        return movie;
      }),
    ];
    console.log(tempMovies);
    return tempMovies;
  }
}
