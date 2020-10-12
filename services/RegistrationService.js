const {User} = require('../models/Models');

class RegistrationService {
    constructor() {
    }
    
    static async createUser(user) {
        return await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            isPartner: false
        })
            .then((user) => {
                    return user;
                }
            ).catch((err) =>{
                throw err;
        });
    }

    static async createPartner(partner) {
        return await User.create({
            name: partner.name,
            email: partner.email,
            password: partner.password,
            isPartner: true
        })
            .then((partner) => {
                    return partner;
                }
            ).catch((err) =>{
                throw err;
        });
    }


    static async validateRegistration(hash) {
        return await User.findOne({ where: { registrationHash: hash }})
            .then((user) => {
                    if(!user || user.registrationHash !== hash)
                        throw 'Unauthorized action!'
                    else
                        return user.update({
                            registrationConfirmed: true
                        }).then((user) =>{
                            return user;
                        }).catch((err) => {
                            throw err;
                        })
                }
            ).catch((err) =>{
                throw err;
            });
    }
}

module.exports = RegistrationService