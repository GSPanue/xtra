import { getModel } from '@/helpers';

const createListing = ({ body }, res) => {
  const Listing = getModel('Listing');

  const listing = new Listing({
    ...body
  });

  listing.save((error) => {
    if (error) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

const updateListing = ({ body }, res) => {
  const Listing = getModel('Listing');
  const { _id } = body;

  Listing.findOneAndUpdate({ _id }, body, (error) => {
    if (error) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

const findListing = ({ query }, res) => {
  const Listing = getModel('Listing');
  const isQueryingTopic = (query.topic !== undefined);

  const newQuery = query;

  if (isQueryingTopic) {
    newQuery.topic = new RegExp(newQuery.topic, 'i');
  }

  Listing.find({
    ...newQuery
  }).then((listings) => {
    res.status(200).send(listings);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const removeListing = ({ body }, res) => {
  const Listing = getModel('Listing');
  const { _id } = body;

  Listing.findOneAndRemove({ _id }, (error) => {
    if (error) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

export {
  createListing,
  updateListing,
  findListing,
  removeListing
};
