const userRoute = require("express").Router();

const User = require("../../models/UserModel");


// Route, to get a user profile
userRoute.get('/:uid', async (request, response) => {
    try {
        const { uid } = request.params;

        const user = await User.findById(uid)
            .populate({
                path: 'listedBooks',
                select: '_id bookImg bookName author bookRating usersRatings'
            })
            .select({ password: 0 });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({
            user: user
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


module.exports = userRoute;



