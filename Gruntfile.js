const rulesConfigInfra = require('rules-config/infra');
const IDI = require('openchs-idi');

module.exports = IDI.configure({
    "chs-admin": "admin",
    "org-admin": "chetna-admin",
    "org-name": "CHETNA-SNEHA",
    "secrets": '../secrets.json',
    "files": {
        "adminUsers": {
            "dev": ["./users/dev-admin-user.json"],
            "staging": ["./users/dev-admin-user.json"]
        },
        "forms": [
            "./registration/registrationForm.json",
            "./pregnancy/pregnantWomanEnrolment.json",
            "./lactatingMother/lactatingMotherEnrolment.json",
            "./child/checklistForm.json",
            "./child/childrenEnrolment.json",
            "./pregnancy/monthlyMonitoringPregnancy.json"
        ],
        "formMappings": ["./shared/formMappings.json"],
        "formDeletions": [],
        "formAdditions": [],
        "catchments": [
            // "./shared/catchments.json"
        ],
        "checklistDetails": ["./child/checklist.json"],
        "concepts": [
            "./child/checklistConcepts.json",
            "./registration/registrationConcepts.json",
            "./shared/commonConcepts.json",
            "./pregnancy/pregnantWomanConcepts.json",
            "./lactatingMother/lactatingMotherConcepts.json",
            "./child/childrenEnrolmentConcepts.json",
            "./pregnancy/monthlyMonitoringPregnancyConcepts.json"
        ],
        "locations": ["./locations/villages.json"],
        "programs": ["./programs.json"],
        "encounterTypes": ["./shared/encounterTypes.json"],
        "operationalEncounterTypes": ["./operationalModules/operationalEncounterTypes.json"],
        "operationalPrograms": ["./operationalModules/operationalPrograms.json"],
        "operationalSubjectTypes": ["./operationalModules/operationalSubjectTypes.json"],
        "users": {
            "dev": ["./users/dev-users.json"]
            // "staging": ["./users/staging-users.json"]
        },
        "rules": [
            "./shared/rules/index.js"
        ],
        "organisationSql": [],
    }
}, rulesConfigInfra);
