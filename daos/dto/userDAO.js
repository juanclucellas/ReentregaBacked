class UserDAO {
    constructor(model) {
        this.model = model;
    }

    async getUserById(id) {
        return await this.model.findById(id);
    }

    async getUserByEmail(email) {
        return await this.model.findOne({ email });
    }

    async createUser(userData) {
        return await this.model.create(userData);
    }

    async updateUser(id, updateData) {
        return await this.model.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUser(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = UserDAO;
