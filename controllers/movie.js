const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({owner: req.user.id});
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

const createMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
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
      nameEN, } = req.body;
    const movie = await Movie.create(
      {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        owner,
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

    if (movie.owner.toString() !== userId) {
      throw new ForbiddenError('У вас нет прав на удаление этого фильма');
    }

    await movie.deleteOne();

    res.send({ message: 'Фильм успешно удален' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies, createMovies, deleteMovies,
};
