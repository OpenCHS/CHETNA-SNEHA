const _ = require("lodash");
import {RuleFactory } from "rules-config/rules";
const Decision = RuleFactory("d440e0b4-a404-4bdf-ba5e-f1e5d5cf5cc0", "Decision");

@Decision("6426774f-a01d-45ea-bf5c-f49933e0ddb1", "Chetna Child Enrolment Decisions", 100.0, {})
export class ChetnaChildEnrolmentDecisionHandler {
    static exec(programEnrolment, decisions, context, today) {

        const zScoreGradeStatusMappingWeightForAge = {
            '1': 'Normal',
            '2': 'Moderately Underweight',
            '3': 'Severely Underweight'
        };

        const zScoreGradeStatusMappingHeightForAge = {
            '1': 'Normal',
            '2': 'Stunted',
            '3': 'Severely stunted'
        };

//ordered map
//KEY:status, value: max z-score for the particular status

        const zScoreGradeStatusMappingWeightForHeight = [
            ["Severely wasted", -3],
            ["Wasted", -2],
            ["Normal", 1],
            ["Possible risk of overweight", 2],
            ["Overweight", 3],
            ["Obese", Infinity],
        ];

        const weightForHeightStatus = function (zScore) {
            let found = _.find(zScoreGradeStatusMappingWeightForHeight, function (currentStatus) {
                return zScore <= currentStatus[1];
            });
            return found && found[0];
        }

        const getGradeforZscore = (zScore) => {
            let grade;
            if (zScore <= -3) {
                grade = 3;
            }
            else if (zScore > -3 && zScore < -2) {
                grade = 2;
            }
            else if (zScore >= -2) {
                grade = 1;
            }

            return grade;

        }

        const nutritionalStatusForChild = (individual, asOnDate, weight, height) => {

            const zScoresForChild = ruleServiceLibraryInterfaceForSharingModules.common.getZScore(individual, asOnDate, weight, height);


            const wfaGrade = getGradeforZscore(zScoresForChild.wfa);
            const wfaStatus = zScoreGradeStatusMappingWeightForAge[wfaGrade];

            const hfaGrade = getGradeforZscore(zScoresForChild.hfa);
            const hfaStatus = zScoreGradeStatusMappingHeightForAge[hfaGrade];

            const wfhStatus = weightForHeightStatus(zScoresForChild.wfh);

            return {
                wfa: zScoresForChild.wfa,
                wfaGrade: wfaGrade,
                wfaStatus: wfaStatus,
                hfa: zScoresForChild.hfa,
                hfaGrade: hfaGrade,
                hfaStatus: hfaStatus,
                wfh: zScoresForChild.wfh,
                wfhStatus: wfhStatus
            }
        }

        const addIfRequired = (decisions, name, value) => {
            if (value === -0) value = 0;
            if (value !== undefined) decisions.push({name: name, value: value});
        };

        const weight = programEnrolment.getObservationValue("Weight");
        const height = programEnrolment.getObservationValue("Height");
        const enrolmentDateTime = programEnrolment.enrolmentDateTime;
        const individual = programEnrolment.individual;

        const nutritionalStatus = nutritionalStatusForChild(individual, enrolmentDateTime, weight, height);

        addIfRequired(decisions.enrolmentDecisions, "Weight for age z-score", nutritionalStatus.wfa);
        addIfRequired(decisions.enrolmentDecisions, "Weight for age Grade", nutritionalStatus.wfaGrade);
        addIfRequired(decisions.enrolmentDecisions, "Weight for age Status", nutritionalStatus.wfaStatus ? [nutritionalStatus.wfaStatus] : []);
        return decisions;
    }
}


module.exports = {ChetnaChildEnrolmentDecisionHandler};