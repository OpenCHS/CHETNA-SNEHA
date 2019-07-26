import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName
} from 'rules-config/rules';

const WithRegistrationStatusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const ChildrenViewFilter = RuleFactory("d440e0b4-a404-4bdf-ba5e-f1e5d5cf5cc0", "ViewFilter");

@ChildrenViewFilter("1ad42aa1-1f1c-4b6b-accd-efbacee8e754", "Children Enrolment", 100.0, {})
class ChildrenEnrolmentViewHandler {
    static exec(programEnrolment, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ChildrenEnrolmentViewHandler(), programEnrolment, formElementGroup);
    }    

   
    @WithName('What was the sickness')
    @WithRegistrationStatusBuilder
    ab11([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did child fall a sick in the last 3 months")
        .is.yes;
    }  
 

    @WithName('Do you breastfeed when a child is sick')
    @WithRegistrationStatusBuilder
    ab12([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.lessThan(6);
    }

    @WithName('If yes, then what do you get in the snacks')
    @WithRegistrationStatusBuilder
    ab13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Does the child get snacks as Take Home Ration from Anganwadi regularly")
        .is.yes;
    } 
    
    @WithName('If no than why')
    @WithRegistrationStatusBuilder
    ab14([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Does your child go to the Anganwadi center regularly")
        .is.no;
    } 

    @WithName('Specify other reason for not going to Anganwadi center regularly')
    @WithRegistrationStatusBuilder
    ab15([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("If no than why")
        .containsAnswerConceptName("Other");
    } 

    @WithName('Specify other treatment given')
    @WithRegistrationStatusBuilder
    ab16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What was the treatment")
        .containsAnswerConceptName("Other");
    } 
}

module.exports = {ChildrenEnrolmentViewHandler};
