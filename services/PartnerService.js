const {User} = require('../models/Models');

class PartnerService {
    constructor() {
    }

    static async createPartner(object) {
        return await User.create({
            name: object.name,
            email: object.email,
            password: object.password,
            isInstructor: true
        })
            .then((partner) => {
                    return partner;
                }
            ).catch((err) =>{
                throw err;
        })
    }
}

module.exports = PartnerService