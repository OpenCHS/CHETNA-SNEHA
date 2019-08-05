import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName
} from 'rules-config/rules';

const WithRegistrationStatusBuilder = StatusBuilderAnnotationFactory('individual', 'formElement');
const RegistrationViewFilter = RuleFactory("b92e78da-efd2-4ac6-8a4b-21cad94e9a78", "ViewFilter");
const RegistrationValidation = RuleFactory("b92e78da-efd2-4ac6-8a4b-21cad94e9a78", "Validation");

@RegistrationViewFilter("406719c0-37d4-41d9-b353-e4bde1139e88", "Registration View Filter", 100.0, {})
class ChetnaRegistrationViewHandler {
    static exec(individual, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ChetnaRegistrationViewHandler(), individual, formElementGroup);
    }    

    @WithName('Education')
    @WithRegistrationStatusBuilder
    abc11([], statusBuilder) {
        statusBuilder.skipAnswers('Literate','Uneducated');
    }  

     @WithName('Marital status')
    @WithRegistrationStatusBuilder
    abc12([], statusBuilder) {
        statusBuilder.skipAnswers('Remarried','Other','Separated');
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

    @WithName('Currently staying with')
    @WithRegistrationStatusBuilder
    abc15([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Marital status").containsAnswerConceptNameOtherThan("Unmarried");
    }  

    @WithName('Place for the occupational activity')
    @WithRegistrationStatusBuilder
    abc16([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Involved in any occupational activity").is.yes;
    } 

    @WithName('In which occupational activity are you involved')
    @WithRegistrationStatusBuilder
    abc17([], statusBuilder) {
        statusBuilder.skipAnswers("Farming","Other","Don't know",'Housework');
        statusBuilder.show().when.valueInRegistration("Involved in any occupational activity").is.yes;
    } 

    
}

@RegistrationValidation("afe6e6d4-69e2-40ac-88ea-494b6408493c", "Registration Form Validation", 100.0)
class RegistrationValidationHandler {
    validate(individual) {
        const validationResults = [];
        if (individual.getAgeInYears() < individual.getObservationValue('Age at marriage')  ) {
            validationResults.push(lib.C.createValidationError('Age at marriage cannot be greater than age'));
        }
        return validationResults;
    }
    static exec(individual, validationErrors) {
        return new RegistrationValidationHandler().validate(individual);
    }
}

module.exports = {ChetnaRegistrationViewHandler, RegistrationValidationHandler};
