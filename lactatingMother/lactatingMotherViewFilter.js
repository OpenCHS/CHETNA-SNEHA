import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName,
    FormElementStatus
} from 'rules-config/rules';
import lib from '../lib';

const statusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const LactatingMotherViewFilter = RuleFactory("96dae617-1b01-4de7-a783-627e2a78277c", "ViewFilter");

const getYoungestChildAgeInMonths = (programEnrolment) => {
    const dateOfBirth = programEnrolment.getObservationValue('Age of youngest child');
    return lib.C.getAgeInMonths(dateOfBirth, new Date());
};

@LactatingMotherViewFilter("fd094c45-c402-46b0-a249-95a68de2b052", "Lactating Mother Enrolment", 100.0, {})
class LactatingMotherEnrolmentViewHandler {
    static exec(programEnrolment, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new LactatingMotherEnrolmentViewHandler(), programEnrolment, formElementGroup, today);
    } 

    @WithName('Reason for not having mamta card')
    @statusBuilder
    ac11([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether have mamta card").is.no;
    }  
    
    @WithName('Other reason for not having mamta card')
    @statusBuilder
    ac12([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not having mamta card")
        .containsAnswerConceptName("Other");
    }
    
    @WithName('Specify Other types of complementary food that should be given to the child')
    @statusBuilder
    ac13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What types of complementary food should be given to the child")
        .containsAnswerConceptName("Other");
    }


    @WithName('When did you give water to the child')
    @statusBuilder
    ac15([programEnrolment], statusBuilder) {
    statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('When did you start giving complementary food to the child')
    @statusBuilder
    ac16([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }
    

    @WithName('Who has taken decision to start complementary food to the child')
    @statusBuilder
    ac17([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('What type of food do you give to the child as complementary food')
    @statusBuilder
    ac18([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('How much do you give complementary food to the child')
    @statusBuilder
    ac19([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('How often do you give complementary food to the children')
    @statusBuilder
    ac20([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('What are the points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ac21([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('Do you give complementary food along with breast feeding')
    @statusBuilder
    ac22([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('When do you wash child’s hand')
    @statusBuilder
    ac23([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('What are the points you kept in a mind while feed the child')
    @statusBuilder
    ac44([programEnrolment, today], statusBuilder) {
        statusBuilder.show().whenItem(getYoungestChildAgeInMonths(programEnrolment)).is.greaterThanOrEqualTo(6);
    }

    @WithName('If yes, what do you get')
    @statusBuilder
    ac24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get snacks as Take home ration from Anganwadi centre")
        .is.yes;
    }

    @WithName('If yes, what do you cook from it')
    @statusBuilder
    acd24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get snacks as Take home ration from Anganwadi centre")
        .is.yes;
    }

    @WithName('Specify, Other snacks received')
    @statusBuilder
    ac25([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Other");
    }

    @WithName('How much quantity of Other snacks you get? (Check snacks)')
    @statusBuilder
    ac26([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Other");
    }

    @WithName('How much quantity of Oil you get? (Check snacks)')
    @statusBuilder
    ac27([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Oil");
    }

    @WithName('Specify other quantity of Oil received')
    @statusBuilder
    ac28([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("How much quantity of Oil you get? (Check snacks)")
        .containsAnswerConceptName("Other");
    }

    @WithName('How much quantity of Wheat you get? (Check snacks)')
    @statusBuilder
    ac29([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Wheat (cereal)");
    }

    @WithName('Specify other quantity of Wheat received')
    @statusBuilder
    ac30([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("How much quantity of Wheat you get? (Check snacks)")
        .containsAnswerConceptName("Other");
    }

    @WithName('How much quantity of Pulse you get? (Check snacks)')
    @statusBuilder
    ac31([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Pulses");
    }


    @WithName('Specify other quantity of Pulses received')
    @statusBuilder
    ac32([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("How much quantity of Pulse you get? (Check snacks)")
        .containsAnswerConceptName("Other");
    }

    @WithName('How much quantity of Salt you get? (Check snacks)')
    @statusBuilder
    ac33([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Salt");
    }

    @WithName('Specify other quantity of Salt received')
    @statusBuilder
    ac34([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("How much quantity of Salt you get? (Check snacks)")
        .containsAnswerConceptName("Other");
    }

    @WithName('If yes, under which government programme/scheme you got entitlements')
    @statusBuilder
    ac35([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Benefits of government programme/scheme received")
        .is.yes;
    }

    @WithName('If no, why you did not get benefits')
    @statusBuilder
    ac36([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Benefits of government programme/scheme received")
        .is.no;
    }

    @WithName('Specify Other reason for not getting benefits')
    @statusBuilder
    ac37([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not getting benefits")
        .containsAnswerConceptName("Other");
    }

    @WithName('If yes, what do you use')
    @statusBuilder
    ac38([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('From where and by whom you got the information')
    @statusBuilder
    ac39([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('Specify Other source from where and by whom you got the information')
    @statusBuilder
    ac40([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("From where and by whom you got the information")
        .containsAnswerConceptName("Other");
    }

    @WithName('What do you consume')
    @statusBuilder
    ac41([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you have any addiction").is.yes;
    }

    

    @WithName('Specify other food that you give to the child as complementary food')
    @statusBuilder
    ac42([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What type of food do you give to the child as complementary food")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify other points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ac43([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while preparing a food for the child")
        .containsAnswerConceptName("Other");
    }

    
     @WithName('Specify other points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ac45([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while preparing a food for the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('If yes, then when do you breastfeed to your child')
    @statusBuilder
    ac46([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you give complementary food along with breast feeding")
        .is.yes;
    }

    @WithName('If not, why not')
    @statusBuilder
    ac47([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you give complementary food along with breast feeding")
        .is.no;
    }

    
    @WithName('Specify other points you kept in a mind while feed the child')
    @statusBuilder
    ac48([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while feed the child")
        .containsAnswerConceptName("Other");
    }


    @WithName('Specify other things that should be kept in mind while feed the child')
    @statusBuilder
    ac49([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What should be kept in mind while feed the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify other things that should be kept in mind while preparing food')
    @statusBuilder
    ac50([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What should be kept in mind when preparing a food for child")
        .containsAnswerConceptName("Other");
    }

}

module.exports = {LactatingMotherEnrolmentViewHandler};
