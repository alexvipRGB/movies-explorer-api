const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
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
    const movies = await Movie.create({
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
    if (!movies) {
      throw new NotFoundError('Фильм не создан');
    } else {
      res.status(201).send(movies);
    }
  } catch (err) {
    next(err);
  }
};

const deleteMovies = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const movies = await Movie.findById(movieId);

    if (!movies) {
      throw new NotFoundError('Фильм не найден');
    }

    if (movies.owner.valueOf() !== userId) {
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
