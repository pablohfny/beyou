const {RegistrationService} = require('../services/Services');

    class RegistrationController {
        constructor() {
        }

        static async createPartner(partner) {
            return await RegistrationService.createPartner(partner);
        }

        static async createUser(user) {
            return await RegistrationService.createUser(user);
        }

        static async validateRegistration(hash) {
            return await RegistrationService.validateRegistration(hash);
        }
    }

    module.exports = RegistrationController
