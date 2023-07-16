const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovies = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    if (!movie) {
      throw new NotFoundError('Фильм не создан');
    } else {
      res.status(201).send(movie);
    }
  } catch (err) {
    next(err);
  }
};

const deleteMovies = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }

    if (movie.owner.valueOf() !== userId) {
      throw new ForbiddenError('У вас нет прав на удаление этого фильма');
    }

    const isRemoved = await Movie.findByIdAndRemove(movieId);
    if (!isRemoved) {
      throw new NotFoundError('Передан неверный айди фильма, поэтому не получилось удалить.');
    }

    res.send({ message: 'Фильм успешно удален' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies, createMovies, deleteMovies,
};
