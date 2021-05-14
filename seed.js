const dbConnection = require('./config/mongoConnection');
const data = require('./data/');
const apartments = data.apartmentlistings;
const comments = data.comments;
const users = data.users;
const reviews = data.reviews;

const commentData = [{
    "comment": "aaaaaaaaaaaaaa"
}];

const userData = [
	{
		"username": "User",
		"email_id": "user@gmail.com",
		"password": "123",
		"account_type": "1",
		"preference": "",
		"contact_info": "",
		"preferred_location": "",
		"profile_picture":""
	},
	{
		"username": "Agent",
		"email_id": "agent@gmail.com",
		"password": "123",
		"account_type": "2",
		"preference": "",
		"contact_info": "",
		"preferred_location": "",
		"profile_picture":""
	}
];

const listData = [
	{
	"title":"3 Bedroom and 2 Bathroom Apartment for rent ",
	"price":"3200",
	"utilities_included":1,
	"address":"416 Madison St, Hoboken, NJ 07030, USA",
	"longitude":"-74.03806790000002",
	"latitude":"40.7434261",
	"description":" Huge 3BR/2BA apartment for rent in Hoboken. Hardwood floors, exposed brick.",
	"photos":["1620965334991.jpg","1620680716487.jpg","1620680712125.jpg"],
	"reviews":[],
	"rating":4
    },

	{
	"title":"1 Bedroom Apartment for Rent",
	"price":"1500","utilities_included":1,
	"address":"310 Madison Street, Hoboken, NJ, USA",
	"longitude":"-74.0384511",
	"latitude":"40.7419321",
	"description":"This building is located in Hoboken in Hudson County zip code 07030. Castle Point is a nearby neighborhood. Bayonne, Harrison, and Hoboken are nearby cities.",
	"photos":["1620969256107.jpg"],
	"reviews":[],
	"rating":4
    },

	{
	"title":"2 Bedroom apartment for rent",
	"price":"2100",
	"utilities_included":1,
	"address":"207 14th Street, Hoboken, NJ, USA",
	"longitude":"-74.02834580000001",
	"latitude":"40.7534976",
	"description":"Spacious 2BR/2BA loft-style condo in Hoboken! This fantastic and unique unit features a large kitchen/living room combo, dishwasher, hardwood floors, and exposed brick. Laundry in Building and shared backyard. High ceilings and extra-large windows add character to this very desirable home.",
	"photos":["1620969702010.jpg"],
	"reviews":[],
	"rating":4
    },

	{
	"title":"2 Bedroom 1 bath apartment for rent",
	"price":"2500",
	"utilities_included":1,
	"address":"163 3rd Street, Hoboken, NJ,USA",
	"longitude":"-74.0317127",
	"latitude":"40.7401423",
	"description":"Fully Renovated 2 Bedroom/1 Bathroom with Extra Home Office! Located at 163 3rd Street. Beautiful wide open living room, with endless natural lighting throughout the day. All bedrooms fit Queen/King Size Beds and have a closet. Laundry Room on Site! 163 3rd Street, situated in one of the best locations in all of Hoboken, 3 blocks to Washington Street, 6 minutes to the Path Train, and located right Next to Church Square Park",
	"photos":["1620969991025.jpg"],
	"reviews":[],
	"rating":5
    },

	{
		"title":"1 Bed 1 Bath Apartment in Hoboken for rent",
		"price":"2100",
		"utilities_included":1,
		"address":"525 Willow Avenue, Hoboken, NJ, USA",
		"longitude":"-74.0326121",
		"latitude":"40.7436644",
		"description":"This building is located in Hoboken in Hudson County zip code 07030. Castle Point is a nearby neighborhood. Bayonne, Harrison, and Hoboken are nearby cities.",
		"photos":["1620970248883.jpg"],
		"reviews":[],
		"rating":0
	},
	
];

const reviewData = [
	{
		"review": "I think this place is very fantastic.",
		"rating": "5"
	}, {
		"review": "Great lets get in touch!",
		"rating": "4"
	}, {
		"review": "nice",
		"rating": "5"
	}, {
		"review": "I think this place is very fantastic.",
		"rating": "5"
	}, {
		"review": "Great lets get in touch!",
		"rating": "5"
	}, {
		"review": "I think this place is very fantastic.",
		"rating": "5"
	}, {
		"review": "Great lets get in touch!",
		"rating": "4"
	}, {
		"review": "I think this place is very fantastic.",
		"rating": "3"
	}, {
		"review": "Great lets get in touch!",
		"rating": "3"
	}, {
		"review": "I think this place is very fantastic.",
		"rating": "4"
	}, {
		"review": "Great lets get in touch!",
		"rating": "4"
	}, {
		"review": "I think this place is very fantastic.",
		"rating": "4"
	}, {
		"review": "Great lets get in touch!",
		"rating": "5"
	}
];

async function main() {
	const db = await dbConnection();
	await db.dropDatabase();

	const user1 = await users.addUser(userData[0]);
	const user2 = await users.addUser(userData[1]);
	console.log(typeof(user2.inserted_id.toString()))
	const apartment1 = await apartments.addApartment({"user_id": user2.inserted_id.toString(), ...listData[0]});
	const apartment2 = await apartments.addApartment({"user_id": user2.inserted_id.toString(), ...listData[1]});
	const apartment3 = await apartments.addApartment({"user_id": user2.inserted_id.toString(), ...listData[2]});
	const apartment4 = await apartments.addApartment({"user_id": user2.inserted_id.toString(), ...listData[3]});
	const apartment5 = await apartments.addApartment({"user_id": user2.inserted_id.toString(), ...listData[4]});
	const apartment6 = await apartments.addApartment({"user_id": user2.inserted_id.toString(), ...listData[5]});
	const review1 = await reviews.addReview({"apartment_id": apartment1.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[0]});
	const review2 = await reviews.addReview({"apartment_id": apartment1.new_id.toString(), "user_id": user2.inserted_id.toString(), ...reviewData[1]});
	// const review3 = await reviews.addReview({"apartment_id": apartment1.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[2]});
	const review4 = await reviews.addReview({"apartment_id": apartment2.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[3]});
	const review5 = await reviews.addReview({"apartment_id": apartment2.new_id.toString(), "user_id": user2.inserted_id.toString(), ...reviewData[4]});
	const review6 = await reviews.addReview({"apartment_id": apartment3.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[5]});
	const review7 = await reviews.addReview({"apartment_id": apartment3.new_id.toString(), "user_id": user2.inserted_id.toString(), ...reviewData[6]});
	const review8 = await reviews.addReview({"apartment_id": apartment4.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[7]});
	const review9 = await reviews.addReview({"apartment_id": apartment4.new_id.toString(), "user_id": user2.inserted_id.toString(), ...reviewData[8]});
	const review10 = await reviews.addReview({"apartment_id": apartment5.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[9]});
	const review11 = await reviews.addReview({"apartment_id": apartment5.new_id.toString(), "user_id": user2.inserted_id.toString(), ...reviewData[10]});
	const review12 = await reviews.addReview({"apartment_id": apartment6.new_id.toString(), "user_id": user1.inserted_id.toString(), ...reviewData[11]});
	const review13 = await reviews.addReview({"apartment_id": apartment6.new_id.toString(), "user_id": user2.inserted_id.toString(), ...reviewData[12]});
	const comment_id = await comments.addComment({"user_id": user2.inserted_id.toString(), "review_id": review1.toString(), ...commentData[0]});

	console.log('Done seeding database');

	await db.serverConfig.close();
}

main();
