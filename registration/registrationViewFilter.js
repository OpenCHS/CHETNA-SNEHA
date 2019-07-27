import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName
} from 'rules-config/rules';

const WithRegistrationStatusBuilder = StatusBuilderAnnotationFactory('individual', 'formElement');
const RegistrationViewFilter = RuleFactory("b92e78da-efd2-4ac6-8a4b-21cad94e9a78", "ViewFilter");

@RegistrationViewFilter("406719c0-37d4-41d9-b353-e4bde1139e88", "Registration View Filter", 100.0, {})
class ChetnaRegistrationViewHandler {
    static exec(individual, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ChetnaRegistrationViewHandler(), individual, formElementGroup);
    }    

    @WithName('Education')
    @WithRegistrationStatusBuilder
    abc11([], statusBuilder) {
        statusBuilder.skipAnswers('Uneducated');
    }  

     @WithName('Marital status')
    @WithRegistrationStatusBuilder
    abc12([], statusBuilder) {
        statusBuilder.skipAnswers('Remarried','Other');
    }  
    
    @WithName('Age at marriage')
    @WithRegistrationStatusBuilder
    abc13([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Marital status").containsAnswerConceptNameOtherThan("Unmarried");
    }  

    @WithName('Current age of your husband')
    @WithRegistrationStatusBuilder
    abc14([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Marital status").containsAnswerConceptNameOtherThan("Unmarried");
    }  

    @WithName('Where are you currently staying?')
    @WithRegistrationStatusBuilder
    abc15([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Marital status").containsAnswerConceptNameOtherThan("Unmarried");
    }  

    @WithName('If yes, What do you do')
    @WithRegistrationStatusBuilder
    abc16([], statusBuilder) {
        statusBuilder.skipAnswers("Farming","Other","Don't know");
        statusBuilder.show().when.valueInRegistration("Do you work at home or earning money outside the home").is.yes;
    } 
}

module.exports = {ChetnaRegistrationViewHandler};
