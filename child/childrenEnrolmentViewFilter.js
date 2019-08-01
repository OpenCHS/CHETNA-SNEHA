import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName
} from 'rules-config/rules';

const statusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const ChildrenViewFilter = RuleFactory("d440e0b4-a404-4bdf-ba5e-f1e5d5cf5cc0", "ViewFilter");

@ChildrenViewFilter("1ad42aa1-1f1c-4b6b-accd-efbacee8e754", "Children Enrolment", 100.0, {})
class ChildrenEnrolmentViewHandler {
    static exec(programEnrolment, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ChildrenEnrolmentViewHandler(), programEnrolment, formElementGroup);
    }    

   
    @WithName('What was the sickness')
    @statusBuilder
    ab11([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did child fall a sick in the last 3 months")
        .is.yes;
    }   

    @WithName('Do you breastfeed when a child is sick')
    @statusBuilder
    ab12([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.lessThanOrEqualTo(6);
    }

    @WithName('Do you give food when a child is sick')
    @statusBuilder
    ab121([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    }

    @WithName('What do you feed to the child')
    @statusBuilder
    ab123([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    }

    @WithName('Does child demand more food after sickness')
    @statusBuilder
    ab124([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    }

    @WithName('Do you feed more food to your child after illness')
    @statusBuilder
    ab125([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    }

    @WithName('Does your child go to the Anganwadi centre regularly')
    @statusBuilder
    ab17([], statusBuilder) {
        statusBuilder.show().when.ageInYears.greaterThanOrEqualTo(3);
    }

    @WithName('What do you get as a snacks')
    @statusBuilder
    ab13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Does the child get snacks as take home ration from Anganwadi regularly")
        .is.yes;
    } 
    
    @WithName('If no than why')
    @statusBuilder
    ab14([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Does your child go to the Anganwadi centre regularly")
        .is.no;
    } 

    @WithName('Specify other reason for not going to Anganwadi centre regularly')
    @statusBuilder
    ab15([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("If no than why")
        .containsAnswerConceptName("Other");
    } 

    @WithName('Other treatment given for warm infestation')
    @statusBuilder
    ab16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Treatment given for warm infestation")
        .containsAnswerConceptName("Other");
    } 
  

   
}

module.exports = {ChildrenEnrolmentViewHandler};
