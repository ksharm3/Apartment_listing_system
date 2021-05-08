const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
//const Reviews = mongoCollections.reviews;
const ApartmentListings = mongoCollections.apartmentListings;
//const apartmentListings = require('./apartmentListings');
//const uuid = require('uuid/v4');

let exportedMethods = {
  async getAllReviews(id)
  {
    const apartmentListingCollection = await ApartmentListings();
    let parsedId = ObjectId(id);
    const apartmentListing = await apartmentListingCollection.findOne({ _id: parsedId });
    if (!apartmentListing) throw 'ApartmentListing Not Found';
    reviewList = apartmentListing.reviews;
    return reviewList;
  },
 
  async getReviewById(id)
  {
    const apartmentListingCollection = await ApartmentListings();
    let review = {};
    const reviewAll = await apartmentListingCollection.find({},{projection: {_id:0, reviews: 1}}).toArray();
    //console.log(reviewAll);
    for(let i of reviewAll)
    {
      //console.log(typeof(i));
      if(i.reviews.length==0)
      continue;

      for(let j of i.reviews)
      {
        if(j.id == id)
        {
          //console.log(j);
          review = j;
          break;
        }
      }
    }    
    /*const apartmentListing = await reviewCollection.findOne({ _id: id });
    if (!apartmentListing) throw 'ApartmentListing not found';*/
    return review;
  },
  async addReview(id, title, reviewer, rating, dateOfReview, review) 
  {
    const apartmentListingCollection = await ApartmentListings();
    const idOfReview = ObjectId();
    
    let newReview = {
       id: idOfReview,
       title : title,
       reviewer: reviewer,
       rating: rating,
       dateOfReview: dateOfReview,
       review: review
    };
    //console.log(newReview);
    let parsedId = ObjectId(id);
    return apartmentListingCollection
      .updateOne({ _id: parsedId }, { $push: { reviews: newReview } })

    /*const newInsertInformation = await apartmentListingCollection.update({_id: id}, {$push: newReview});
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getReviewById(idOfReview);*/

  },
  async removeReview(id) 
  {
    const apartmentListingCollection = await ApartmentListings();
    //console.log(id);
    let parsedId = ObjectId(id);
    let apartmentListingId;

    const reviewAll = await apartmentListingCollection.find({},{projection: {_id:1, reviews: 1}}).toArray();
    for(let i of reviewAll)
    {
      if(i.reviews.length==0)
      continue;

      for(let j of i.reviews)
      {
        if(j.id == id)
        {
          apartmentListingId = i._id;
          break;
        }
      }
    }
    //console.log(apartmentListingId);
    let parsedId1 = ObjectId(apartmentListingId);
    //return await apartmentListingCollection.update({ id:"60577a3953e3f554d46e07e0"},{$pull : { "reviews" : {"id": parsedId} } } );
    //WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    return apartmentListingCollection.updateOne({ _id: parsedId1 }, { $pull: { reviews: { id: parsedId } } });
  }
};

module.exports = exportedMethods;