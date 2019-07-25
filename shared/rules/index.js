const _ = require('lodash');

module.exports = _.merge({},
    require('../../registration/registrationViewFilter.js'),
    require('../../child/checklistRules'),
    require('../../pregnancy/pregnantWomanViewFilter.js')
);
