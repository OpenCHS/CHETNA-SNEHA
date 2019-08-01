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
    if (!_.isNil(dateOfBirth))
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
    
    @WithName('Other types of complementary food that should be given to the child')
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

    @WithName('What do you get as a snacks')
    @statusBuilder
    ac24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get snacks as take home ration from Anganwadi centre")
        .is.yes;
    }

    @WithName('What did you cook from the snacks received')
    @statusBuilder
    acd24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get snacks as take home ration from Anganwadi centre")
        .is.yes;
    }

    @WithName('Other snacks received')
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

    @WithName('Other quantity of Oil received')
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

    @WithName('Other quantity of Wheat received')
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


    @WithName('Other quantity of Pulses received')
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

    @WithName('Other quantity of Salt received')
    @statusBuilder
    ac34([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("How much quantity of Salt you get? (Check snacks)")
        .containsAnswerConceptName("Other");
    }

    @WithName('Programme/scheme under which received entitlements')
    @statusBuilder
    ac35([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.yes;
    }

    @WithName('Reason for not getting benefits under government programme/scheme')
    @statusBuilder
    ac36([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.no;
    }

    @WithName('Other reason for not getting benefits')
    @statusBuilder
    ac37([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not getting benefits under government programme/scheme")
        .containsAnswerConceptName("Other");
    }

    @WithName('Method of contraception used')
    @statusBuilder
    ac38([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('From where/whom information about contraception received')
    @statusBuilder
    ac39([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('Other source from where/whom information about contraception received')
    @statusBuilder
    ac40([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("From where/whom information about contraception received")
        .containsAnswerConceptName("Other");
    }

    @WithName('What do you consume')
    @statusBuilder
    ac41([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you have any addiction").is.yes;
    }

    @WithName('Other types of complementary food given to the child')
    @statusBuilder
    ac42([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What type of food do you give to the child as complementary food")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ac43([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while preparing a food for the child")
        .containsAnswerConceptName("Other");
    }

    
     @WithName('Other points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ac45([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while preparing a food for the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('When do you breastfeed to your child')
    @statusBuilder
    ac46([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you give complementary food along with breast feeding")
        .is.yes;
    }

    @WithName('Why don\'t you give complementary food')
    @statusBuilder
    ac47([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you give complementary food along with breast feeding")
        .is.no;
    }

    
    @WithName('Other points you kept in a mind while feed the child')
    @statusBuilder
    ac48([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while feed the child")
        .containsAnswerConceptName("Other");
    }


    @WithName('Other things that should be kept in mind while feed the child')
    @statusBuilder
    ac49([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What should be kept in mind while feed the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other things that should be kept in mind while preparing food')
    @statusBuilder
    ac50([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What should be kept in mind when preparing a food for child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Place of delivery')
    @statusBuilder
    ac51([], statusBuilder) {
        statusBuilder.skipAnswers('Sub Center','Primary Health Center','Regional Hospital',
        'NGO Hospital','During Transportation like in Ambulance etc');
    }

}

module.exports = {LactatingMotherEnrolmentViewHandler};
