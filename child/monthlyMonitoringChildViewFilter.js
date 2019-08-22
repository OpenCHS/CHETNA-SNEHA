import {
    FormElementsStatusHelper,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName,
    FormElementStatus
} from 'rules-config/rules';

const filter = RuleFactory('3e9a7b97-87fd-4936-bcec-68a4da7d7a5c', 'ViewFilter');
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

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
};

const zScoreGradeStatusMappingWeightForAge = {
    '1': 'Normal',
    '2': 'Moderately Underweight',
    '3': 'Severely Underweight'
};

const nutritionalStatusForChild = (individual, asOnDate, weight, height) => {
    const zScoresForChild = ruleServiceLibraryInterfaceForSharingModules.common.getZScore(individual, asOnDate, weight, height);
    const wfaGrade = getGradeforZscore(zScoresForChild.wfa);
    const wfaStatus = zScoreGradeStatusMappingWeightForAge[wfaGrade];
    return {
        wfaStatus: wfaStatus
    };
};

@filter('0bce4685-4088-4f9a-a75a-2fc168c6364d', 'MonthlyMonitoringChildViewFilter', 100.0)
class MonthlyMonitoringChildViewFilter {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new MonthlyMonitoringChildViewFilter(), programEncounter, formElementGroup, today);
    }

    currentNutritionalStatusOfChild(programEncounter, formElement) {
        const weight = programEncounter.getObservationValue("Weight");
        const height = programEncounter.programEnrolment.getObservationValue("Height");
        const enrolmentDateTime = programEncounter.programEnrolment.enrolmentDateTime;
        const individual = programEncounter.programEnrolment.individual;
        
        const nutritionalStatus = nutritionalStatusForChild(individual, enrolmentDateTime, weight, height);

        return new FormElementStatus(formElement.uuid, true,nutritionalStatus.wfaStatus);
    }

    @WithName('Does child breastfeed exclusively')
    @WithStatusBuilder
    _a1([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.lessThanOrEqualTo(6);
    }

    @WithName('Number of times you breastfeed to your child')
    @WithStatusBuilder
    _a2([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.lessThanOrEqualTo(6);
    }

    @WithName('Month in which child started complementary food')
    @WithStatusBuilder
    _a3([], statusBuilder) {
        statusBuilder.show().when.valueInEntireEnrolment("When did you start giving complementary food to the child")
    .containsAnswerConceptNameOtherThan("Yet not started");
    }

    @WithName('Who has taken decision to start complementary food to the child')
    @WithStatusBuilder
    _a4([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('What type of food do you give to the child as complementary food')
    @WithStatusBuilder
    _a5([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
        .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('Whether water given to the child in this month')
    @WithStatusBuilder
    _a6([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
        .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('Type of packaged food child gets from outside')
    @WithStatusBuilder
    _a7([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('Type of home based food child gets')
    @WithStatusBuilder
    _a8([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
  }

    @WithName('How much do you give complementary food to the child')
    @WithStatusBuilder
    _a9([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
        .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('How often do you give complementary food to the children')
    @WithStatusBuilder
    _a10([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('What are the points you kept in a mind while preparing a food for the child')
    @WithStatusBuilder
    _a11([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('What are the points you kept in a mind while feed the child')
    @WithStatusBuilder
    _a12([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('Do you give complementary food along with breast feeding')
    @WithStatusBuilder
    _a13([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('When do you wash child’s hand')
    @WithStatusBuilder
    _a14([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Month in which child started complementary food")
    .containsAnswerConceptNameOtherThan("NA");
    }

    @WithName('Illness in last 1 month')
    @WithStatusBuilder
    _a15([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether child got ill in this month").is.yes;
    }

    @WithName('Treatment for the illness')
    @WithStatusBuilder
    _a16([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether child got ill in this month").is.yes;
    }

    @WithName('Whether child get breast feeding during illness')
    @WithStatusBuilder
    _a17([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether child got ill in this month").is.yes;
    }

    @WithName('Method of contraception used')
    @WithStatusBuilder
    _a18([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did you use any method of contraception").is.yes;
    }

    @WithName('Reason for not using any contraception method')
    @WithStatusBuilder
    _a19([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Did you use any method of contraception").is.no;
    }

    @WithName('Activities in which child and caretaker participated')
    @WithStatusBuilder
    _a20([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Has the child and caretaker participated in SNEHA activities").is.yes;
    }

    @WithName('Information caretaker got in the month through educational session/home visits')
    @WithStatusBuilder
    _a21([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Has the child and caretaker participated in SNEHA activities").is.yes;
    }
}

export {MonthlyMonitoringChildViewFilter}
