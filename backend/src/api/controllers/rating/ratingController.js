import { getModel } from '@/helpers';

const createRating = ({ body }, res) => {
  const Rating = getModel('Rating');

  const rating = new Rating({
    ...body
  });

  rating.save((error) => {
    if (error) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

const findRating = ({ query }, res) => {
  const Rating = getModel('Rating');

  Rating.find({
    ...query
  }).then((ratings) => {
    res.status(200).send({
      data: ratings
    });
  }).catch(() => {
    res.status(500).send({
      data: []
    });
  });
};

export {
  createRating,
  findRating
};
