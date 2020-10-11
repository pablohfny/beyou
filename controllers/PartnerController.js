const {PartnerService} = require('../services/Services');

    class PartnerController {
        constructor() {
        }

        static async CreatePartner(object) {
            return await PartnerService.createPartner(object);
        }
    }

    module.exports = PartnerController
