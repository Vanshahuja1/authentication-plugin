import UserModel from "../models/user.js";

// GET all users with their roles (excluding passwords)
const Getuser = async (req, res) => {
    try {
        // Populate the list of users and include name, email, and role (exclude password)
        const users = await UserModel.find({}, 'name email role'); // <-- you can add/remove fields as needed

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE a user (prevent admin from deleting themselves)
const deletUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const checkAdmin = await UserModel.findById(userId);

        if (checkAdmin?.role === 'admin') {
            return res.status(409).json({ message: "You cannot delete yourself (admin)." });
        }

        const user = await UserModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { Getuser, deletUser };
