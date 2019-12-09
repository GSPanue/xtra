import { getModel } from '@/helpers';

const createListing = ({ user, body }, res) => {
  const isServiceProvider = user.accountType === 'Service Provider';

  if (isServiceProvider) {
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
  }
  else {
    res.sendStatus(401);
  }
};

const updateListing = ({ user, body }, res) => {
  const { _id } = body;
  const accountId = user._id;
  const isServiceProvider = user.accountType === 'Service Provider';

  const shouldUpdateRating = body.rating !== null;

  if (shouldUpdateRating) {
    const Listing = getModel('Listing');

    Listing.findOne({ 'ratings.accountId': accountId }).then((listing) => {
      if (listing || listing.accountId === accountId) {
        res.sendStatus(401);
        return;
      }

      Listing.findOneAndUpdate({ _id }, {
        $push: {
          ratings: {
            accountId,
            rating: body.rating
          }
        }
      }, (error) => {
        if (error) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  }
  else if (isServiceProvider) {
    const Listing = getModel('Listing');
    const hasMatchingId = body.accountId === accountId;

    if (hasMatchingId) {
      const update = body;
      delete update.ratings;

      Listing.findOneAndUpdate({ _id }, update, (error) => {
        if (error) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    }
    else {
      res.sendStatus(401);
    }
  }
  else {
    res.sendStatus(401);
  }
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
  }).select('-__v').then((listings) => {
    res.status(200).send(listings);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const removeListing = ({ user, body }, res) => {
  const Listing = getModel('Listing');
  const accountId = user._id;
  const isServiceProvider = user.accountType === 'Service Provider';
  const { _id } = body;

  if (isServiceProvider) {
    Listing.findOne({ _id }).then((listing) => {
      const { accountId: listingAccountId } = listing;

      const hasMatchingId = accountId === listingAccountId.toString();

      if (hasMatchingId) {
        Listing.findOneAndRemove({ _id }, (error) => {
          if (error) {
            res.sendStatus(500);
            return;
          }

          res.sendStatus(200);
        });
      }
      else {
        res.sendStatus(401);
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(401);
  }
};

export {
  createListing,
  updateListing,
  findListing,
  removeListing
};
