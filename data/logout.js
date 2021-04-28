const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.users;

module.exports = {

    async logout(username, session_id)
    {
        console.log("Heyyyyyyyyyy")
        const userCollection = await Users();
        return await userCollection.updateOne({username: username }, { $pull: { sessions: session_id } });
    }

}