import {
    FormElementsStatusHelper,
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
    @WithStatusBuilder
    _1([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have you registered pregnancy")
    .containsAnswerConceptNameOtherThan("Yes");
    }

    @WithName('Place where you registered pregnancy')
    @WithStatusBuilder
    _2([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Have you registered pregnancy").is.yes;
    }

    @WithName('Reason for not getting registered your pregnancy')
    @WithStatusBuilder
    _3([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Have you registered pregnancy").is.no;
    }

    @WithName('Finalized place for delivery')
    @WithStatusBuilder
    _4([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.no;
        //     .and.when.valueInLastEncounter('Finalized place for delivery')
        // .containsAnswerConceptName('Yet not decided');

        // statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.no
        //     // .and.when.valueInEncounter('Finalized place for delivery').is.notDefined
        //     .and.when.valueInLastEncounter('Finalized place for delivery').containsAnswerConceptName('Yet not decided');
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
}

export {MonthlyMonitoringPregnancyViewFilter}
