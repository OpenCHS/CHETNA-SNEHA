import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    FormElementStatus,
    WithName,
    EnrolmentEligibilityCheck
} from 'rules-config/rules';

const ProgramExitViewFilter = RuleFactory("54cbf339-4cd2-4e26-bf9c-15f128035b1b", "ViewFilter");
@ProgramExitViewFilter("b4445859-71c4-4ea0-867b-e14979c6cdf4", "Program Exit Filter", 101.0, {})
 class ProgramExitViewFilterHandler {
    static exec(programExit, formElementGroup) {
        return FormElementsStatusHelper.getFormElementsStatuses(new ProgramExitViewFilterHandler(), programExit, formElementGroup);
    }

    reasonForExit(programExit, formElement) {
        const statusBuilder = this._getStatusBuilder(programExit, formElement);
        statusBuilder.skipAnswers("Shifted to other geographical area","Completion");
        return statusBuilder.build();
    }

    otherReasonPleaseSpecify(programExit, formElement) {
        const statusBuilder = this._getStatusBuilder(programExit, formElement);
        statusBuilder.show().when.valueInExit("Reason for exit").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    _getStatusBuilder(programExit, formElement) {
        return new FormElementStatusBuilder({
            programEnrolment: programExit,
            formElement
        });
    }

}


module.exports = {ProgramExitViewFilterHandler};
