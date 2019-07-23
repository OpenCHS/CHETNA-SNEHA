const rulesConfigInfra = require('rules-config/infra');
const IDI = require('openchs-idi');

module.exports = IDI.configure({
    "chs-admin": "admin",
    "org-admin": "chetna-admin",
    "org-name": "CHETNA-SNEHA",
    "secrets": '../secrets.json',
    "files": {
        "adminUsers": {
            "dev": ["./users/dev-admin-user.json"]
        },
        "forms": [
            "./registration/registrationForm.json"
        ],
        "formMappings": ["./shared/formMappings.json"],
        "formDeletions": [],
        "formAdditions": [],
        "catchments": ["./shared/catchments.json"],
        "checklistDetails": [],
        "concepts": [
            "./registration/registrationConcepts.json"
        ],
        "locations": ["./locations/locations.json"],
        "programs": [],
        "encounterTypes": [],
        "operationalEncounterTypes": [],
        "operationalPrograms": [],
        "operationalSubjectTypes": ["./operationalModules/operationalSubjectTypes.json"],
        "users": {
            "dev": ["./users/dev-users.json"]
        },
        "rules": [
          /*  "./shared/rules/index.js",*/
        ],
        "organisationSql": [],
    }
}, rulesConfigInfra);
