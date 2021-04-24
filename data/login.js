const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.users;
//let { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
//const owasp = require('owasp-password-strength-test');
//const { use } = require('../routes/userSignup');

module.exports = {

    async authenticateUser(username, password, session_id) { 

        if(!username || !password) throw "You must provide both username and password"
        const userCollection = await Users();
        //let parsedId = ObjectId(id);
        const user = await userCollection.findOne({ username: username });
        if (!user) throw 'Check your login data: Either username or password is wrong';
        let match = await bcrypt.compare(password, user.hashedPassword);
        if(!match) throw 'Check your login data: Either username or password is wrong';  

        return await userCollection.updateOne({ username: username }, { $push: { sessions: session_id } });
    }
}