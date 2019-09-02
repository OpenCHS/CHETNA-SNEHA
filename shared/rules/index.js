const _ = require('lodash');

module.exports = _.merge({},
    require('../../registration/registrationViewFilter.js'),
    require('../../pregnancy/pregnantWomanViewFilter.js'),
    require('../../pregnancy/monthlyMonitoringPregnancyViewFIlter.js'),
    require('../../child/childrenEnrolmentViewFilter.js'),
    require('../../child/checklistRules'),
    require('../../child/childDecisions'),
    require('../../child/monthlyMonitoringChildViewFilter.js'),
    require('../../shared/rules/visitScheduler.js'),
    require('../../shared/rules/viewFIlter.js')
    
);
