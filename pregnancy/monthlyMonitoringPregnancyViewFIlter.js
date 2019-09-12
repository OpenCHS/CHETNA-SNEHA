import {
    FormElementsStatusHelper,
    FormElementStatus,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName
} from 'rules-config/rules';

const filter = RuleFactory('b9cc8861-f9b7-4e0e-82fa-49e3eabe6968', 'ViewFilter');
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');


@filter('7120d56b-599f-4d45-96df-0d977cd85eed', 'MonthlyMonitoringPregnancyViewFilter', 100.0)
class MonthlyMonitoringPregnancyViewFilter {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new MonthlyMonitoringPregnancyViewFilter(), programEncounter, formElementGroup, today);
    }

    @WithName('Whether she registered her pregnancy')
    _1(programEncounter, formElement) {
        const context = {programEncounter, formElement};

        if (new RuleCondition(context).when.valueInEnrolment("Have you registered pregnancy").is.yes.matches())
            return new FormElementStatus(formElement.uuid, false);

        if (new RuleCondition(context).when.latestValueInPreviousEncounters("Have you registered pregnancy").is.notDefined.matches()) {
            return new FormElementStatus(formElement.uuid, true);
        }
    
        if (new RuleCondition(context).when.latestValueInPreviousEncounters("Have you registered pregnancy").is.no.matches()) {
            return new FormElementStatus(formElement.uuid, true);
        }
    
        return new FormElementStatus(formElement.uuid, false);
    }

    @WithName('Place where you registered pregnancy')
    @WithStatusBuilder
    _2([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Have you registered pregnancy").is.yes;
        statusBuilder.skipAnswers('Urban Health centre','ASHA','Other');
    }

    @WithName('Reason for not getting registered your pregnancy')
    @WithStatusBuilder
    _3([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Have you registered pregnancy").is.no;
    }

    @WithName("Finalized place for delivery")
    _4(programEncounter, formElement) {
        const context = {programEncounter, formElement};

        if (new RuleCondition(context).when.valueInEnrolment("Is decision taken for place of delivery").is.yes.matches())
            return new FormElementStatus(formElement.uuid, false);

        if (new RuleCondition(context).when.latestValueInPreviousEncounters("At which place you will do your delivery").is.notDefined.matches()) {
            return new FormElementStatus(formElement.uuid, true);
        }

        if (new RuleCondition(context).when.latestValueInPreviousEncounters("At which place you will do your delivery").containsAnswerConceptName("Yet not decided").matches()) {
            return new FormElementStatus(formElement.uuid, true);
        }

        return new FormElementStatus(formElement.uuid, false);
    }

    @WithName('Hb')
    @WithStatusBuilder
    _5([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether Hb check up done").is.yes;
    }

    @WithName('Is she enrolled for any government programme/scheme')
    @WithStatusBuilder
    _6([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .containsAnswerConceptNameOtherThan("Yes");
    }

    @WithName('Programme/scheme under which received entitlements')
    @WithStatusBuilder
    _7([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Got any benefits of government programme/scheme").is.yes;
    }

    @WithName('Reason for not getting benefits under government programme/scheme')
    @WithStatusBuilder
    _8([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Got any benefits of government programme/scheme").is.no;
    }

    @WithName('Other reason for not getting benefits')
    @WithStatusBuilder
    _9([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Reason for not getting benefits under government programme/scheme")
        .containsAnswerConceptName("Other");
    }

    @WithName('SNEHA activities which she participated in')
    @WithStatusBuilder
    _10([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether she participated in SNEHA activities").is.yes;
    }

    @WithName('Information she got in the month through educational session/home visits')
    @WithStatusBuilder
    _11([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether she participated in SNEHA activities").is.yes;
    }

    @WithName('TT injections given')
    _12(programEncounter, formElement) {
        const context = {programEncounter, formElement};

        if (new RuleCondition(context).when.latestValueInPreviousEncounters("TT injection")
                .containsAnswerConceptName("TT1")
            .and.when.latestValueInPreviousEncounters("TT injection")
                .containsAnswerConceptName("TT2").matches())
            return new FormElementStatus(formElement.uuid, false);

        if (new RuleCondition(context).when.latestValueInPreviousEncounters("TT injection")
            .containsAnswerConceptName("TT booster").matches()) {
                return new FormElementStatus(formElement.uuid, false);
        }

        if (new RuleCondition(context).when.latestValueInPreviousEncounters("TT injection")
            .is.notDefined.matches()) {
            return new FormElementStatus(formElement.uuid, true);
        }       

        return new FormElementStatus(formElement.uuid, true);
    }

    @WithName('Number of ANC check-up')
    @WithStatusBuilder
    _13([programEncounter, formElement], statusBuilder) {
        let numberOfANCCheckups = programEncounter.getObservationValue('Number of ANC check-up');
        let numberOfANCCheckupsFromEnrolment = programEncounter.programEnrolment.getObservationValue('Number of times checkup done from doctor');
        if (numberOfANCCheckupsFromEnrolment && numberOfANCCheckups && numberOfANCCheckups < numberOfANCCheckupsFromEnrolment) {
            statusBuilder.validationError('Number of ANC checkups cannot be less than that mentioned in enrolment');
        }
    }

    @WithName('BP Systolic')
    @WithStatusBuilder
    _14([programEncounter, formElement], statusBuilder) {
        let systolic = programEncounter.getObservationValue('Systolic');
        if (systolic < 50) {
            statusBuilder.validationError('Systolic BP cannot be less than 50');
        }
    }

    @WithName('BP Diastolic')
    @WithStatusBuilder
    _15([programEncounter, formElement], statusBuilder) {
        let diastolic = programEncounter.getObservationValue('Diastolic');
        if (diastolic < 50) {
            statusBuilder.validationError('Diastolic BP cannot be less than 50');
        }
    }


}

export {MonthlyMonitoringPregnancyViewFilter}
