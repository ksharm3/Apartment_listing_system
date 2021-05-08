const mongoCollections = require('../config/mongoCollections');
const ApartmentListings = mongoCollections.apartmentListings;
let { ObjectId } = require('mongodb');
//const uuid = require('uuid/v4');
module.exports = {

  async getAllApartmentListings() {
    //console.log("We are in GetAllApartmentListings");
    const apartmentListingCollection = await ApartmentListings();
    const apartmentListingList = await apartmentListingCollection.find({}).toArray();
    if (!apartmentListingList) throw 'No ApartmentListings in system!';
    return apartmentListingList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!

  async getApartmentListingById(id) {
    //console.log("We are in GetApartmentListingsByID");
    const apartmentListingCollection = await ApartmentListings();
    let parsedId = ObjectId(id);
    //console.log(parsedId);
    //console.log(id);
    const apartmentListing = await apartmentListingCollection.findOne({ _id: parsedId });
    if (!apartmentListing) throw 'ApartmentListing Not Found';
    return apartmentListing;
  },

  async addApartmentListing(title, price, utilitiesIncluded, address, city) 
  {
    const apartmentListingCollection = await ApartmentListings();
    //console.log("We are in add apartmentListing");
    let newApartmentListing = {
       title : title,
       price: price,
       utilitiesIncluded: utilitiesIncluded,
       address: address,
       city: city,
       state: state,
       zip: zip,
       longitude: longitude,
       latitude: latitude,
       description: description,
       photos: [],
       reviews: [],
       rating: rating
    };

    const newInsertInformation = await apartmentListingCollection.insertOne(newApartmentListing);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getApartmentListingById(newInsertInformation.insertedId);
  },
  async removeApartmentListing(id) {
    //console.log("V r in removeApartmentListing");
    const apartmentListingCollection = await ApartmentListings();
    let parsedId = ObjectId(id);
    const deletionInfo = await apartmentListingCollection.removeOne({ _id: parsedId });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete apartmentListing with id of ${id}`;
    }
    return true;
  },
  async updateApartmentListing(id, updatedApartmentListing) {
    const apartmentListing = await this.getApartmentListingById(id);
    //console.log(apartmentListing);
    let reviews = apartmentListing.reviews;

    let apartmentListingUpdateInfo = {
      title: updatedApartmentListing.title,
      price: updatedApartmentListing.price,
      utilitiesIncluded: updatedApartmentListing.utilitiesIncluded,
      address: updatedApartmentListing.address,
      city: updatedApartmentListing.city,
      state: updatedApartmentListing.state,
      latitudezip: updatedApartmentListing.zip,
      longitude: updatedApartmentListing.longitude,
      latitude: updatedApartmentListing.latitude,
      description: updatedApartmentListing.description,
      photos: photos,
      reviews: reviews,
      rating: rating
    };

    if(apartmentListingUpdateInfo.title==null)
    apartmentListingUpdateInfo.title = apartmentListing.title;
    if(apartmentListingUpdateInfo.price==null)
    apartmentListingUpdateInfo.price = apartmentListing.price;
    if(apartmentListingUpdateInfo.utilitiesIncluded==null)
    apartmentListingUpdateInfo.utilitiesIncluded = apartmentListing.utilitiesIncluded;
    if(apartmentListingUpdateInfo.address==null)
    apartmentListingUpdateInfo.address = apartmentListing.address;
    if(apartmentListingUpdateInfo.city==null)
    apartmentListingUpdateInfo.city = apartmentListing.city;
    if(apartmentListingUpdateInfo.state==null)
    apartmentListingUpdateInfo.state = apartmentListing.state;
    if(apartmentListingUpdateInfo.zip==null)
    apartmentListingUpdateInfo.zip = apartmentListing.zip;
    if(apartmentListingUpdateInfo.longitude==null)
    apartmentListingUpdateInfo.longitude = apartmentListing.longitude;
    if(apartmentListingUpdateInfo.latitude==null)
    apartmentListingUpdateInfo.latitude = apartmentListing.latitude;
    if(apartmentListingUpdateInfo.description==null)
    apartmentListingUpdateInfo.description = apartmentListing.description;


    const apartmentListingCollection = await ApartmentListings();
    let parsedId = ObjectId(id);
    const updateInfo = await apartmentListingCollection.updateOne(
      { _id: parsedId },
      { $set: apartmentListingUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getApartmentListingById(id);
  }
};

