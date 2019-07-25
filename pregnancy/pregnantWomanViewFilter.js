import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName
} from 'rules-config/rules';

const WithRegistrationStatusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const PregnantWomenViewFilter = RuleFactory("1d08e3e9-30a0-4fee-b1ce-55aeec627ea1", "ViewFilter");

@PregnantWomenViewFilter("12f9a59e-b0f9-4a1c-abe1-591c320cf199", "Pregnant Woman Enrolment", 100.0, {})
class PregnantWomenEnrolmentViewHandler {
    static exec(programEnrolment, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnantWomenEnrolmentViewHandler(), programEnrolment, formElementGroup);
    }    

   
    @WithName('Specify Other, pregnancy registered to where/whom')
    @WithRegistrationStatusBuilder
    a11([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Pregnancy registered to")
        .containsAnswerConceptName("Other");
    }  
 
    @WithName('Specify, Other reason of not having mamta card')
    @WithRegistrationStatusBuilder
    a12([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason of not having mamta card")
        .containsAnswerConceptName("Other");
    }  

    @WithName('Specify Other, who did investigation')
    @WithRegistrationStatusBuilder
    a13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Investigation done by")
        .containsAnswerConceptName("Other");
    } 

    @WithName('Specify, Other place form where IFA tablets received')
    @WithRegistrationStatusBuilder
    a14([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("IFA tablets received from")
        .containsAnswerConceptName("Other");
    } 

    @WithName('Specify ,Other place you will do your delivery')
    @WithRegistrationStatusBuilder
    a15([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("At which place you will do your delivery")
        .containsAnswerConceptName("Other");
    } 

    @WithName('Specify, Other reasons to choose place of delivery')
    @WithRegistrationStatusBuilder
    a16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reasons to choose this place for delivery")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify,Other services you get on mamta divas')
    @WithRegistrationStatusBuilder
    a17([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Other services you get on mamta divas")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify, who other are available on mamta divas')
    @WithRegistrationStatusBuilder
    a18([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Who are available on mamta divas")
        .containsAnswerConceptName("Other");
    }
    
    @WithName('Specify,Other reason for not attending mamta divas')
    @WithRegistrationStatusBuilder
    a19([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not attending mamta divas")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify, Other snacks received')
    @WithRegistrationStatusBuilder
    a20([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What do you get as a snacks")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify Other, who gave you information about government programme/scheme')
    @WithRegistrationStatusBuilder
    a21([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Information about government programme/scheme received from")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify Other reason for not getting benefits')
    @WithRegistrationStatusBuilder
    a22([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not getting benefits")
        .containsAnswerConceptName("Other");
    }
    

    @WithName('Specify Other types of complementary food that should be given to the child')
    @WithRegistrationStatusBuilder
    a23([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What types of complementary food should be given to the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify Other source from where and by whom you got the information')
    @WithRegistrationStatusBuilder
    a24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("From where and by whom you got the information")
        .containsAnswerConceptName("Other");
    }

    @WithName('Specify Other reason for not using any contraception method')
    @WithRegistrationStatusBuilder
    a25([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Why you did not use any contraception method")
        .containsAnswerConceptName("Other");
    }

    @WithName('In which month did you register pregnancy?')
    @WithRegistrationStatusBuilder
    a26([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is pregnancy registered").is.yes;
    }

    @WithName('Where/Whom to registered your pregnancy?')
    @WithRegistrationStatusBuilder
    a27([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is pregnancy registered").is.yes;
    }


    @WithName('Is mamta card updated with information about availed government services? (Please check Mamta card)')
    @WithRegistrationStatusBuilder
    a28([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have mamta card").is.yes;
    }

    @WithName('Why you don’t have mamta card?')
    @WithRegistrationStatusBuilder
    a29([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have mamta card").is.no;
    }

    @WithName('How many live children do you have?')
    @WithRegistrationStatusBuilder
    a30([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('How old is your youngest child?')
    @WithRegistrationStatusBuilder
    a31([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('How many times you did checkup from doctor?')
    @WithRegistrationStatusBuilder
    a32([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Who did you get the investigation?')
    @WithRegistrationStatusBuilder
    a33([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Which services did you get during antenatal check-ups?')
    @WithRegistrationStatusBuilder
    a34([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of times weight measurement')
    @WithRegistrationStatusBuilder
    a35([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("Weight measurement");
    }

    @WithName('Number of times BP measurement')
    @WithRegistrationStatusBuilder
    a36([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("BP measurement");
    }

    @WithName('Got TT vaccines')
    @WithRegistrationStatusBuilder
    a37([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("TT vaccines");
    }

    @WithName('Number of times blood test')
    @WithRegistrationStatusBuilder
    a38([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("Blood test");
    }

    @WithName('Number of times urine test')
    @WithRegistrationStatusBuilder
    a39([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("Urine test");
    }

    @WithName('Have got Calcium supplement')
    @WithRegistrationStatusBuilder
    a40([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("Calcium supplement");
    }

    @WithName('Number of times ultrasound scan')
    @WithRegistrationStatusBuilder
    a42([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("Ultrasound scan");
    }

    @WithName('Number of time abdominal check-ups')
    @WithRegistrationStatusBuilder
    a43([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Services received during antenatal check-ups")
        .containsAnswerConceptName("Abdominal check-ups");
    }

    @WithName('Which are the services you availed in previous pregnancy?')
    @WithRegistrationStatusBuilder
    a44([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1)
        .and.when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no;
    }

    @WithName('Number of IFA pills (every month)')
    @WithRegistrationStatusBuilder
    a54([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Received IFA tablets at every month").is.yes;
    }

    @WithName('From where did you get?')
    @WithRegistrationStatusBuilder
    a55([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Received IFA tablets at every month").is.yes;
    }

    @WithName('Do you consume IFA tablets? (check the strip of IFA tablet)')
    @WithRegistrationStatusBuilder
    a56([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Received IFA tablets at every month").is.yes;
    }

    @WithName('When do you consume IFA tablet?')
    @WithRegistrationStatusBuilder
    a57([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Consumed IFA tablets").is.yes;
    }

    @WithName('Why you did not consume IFA tablets?')
    @WithRegistrationStatusBuilder
    a58([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Consumed IFA tablets").is.no;
    }


    @WithName('Who took the decision?')
    @WithRegistrationStatusBuilder
    a59([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.yes;
    }

    @WithName('At which place you will do your delivery')
    @WithRegistrationStatusBuilder
    a60([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.yes;
    }

    @WithName('What are the reasons to choose this place')
    @WithRegistrationStatusBuilder
    a61([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.yes;
    }

    @WithName('What are the services you get on mamta divas')
    @WithRegistrationStatusBuilder
    a62([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get services of mamta divas?").is.yes;
    }

     @WithName('Who are available on mamta divas')
    @WithRegistrationStatusBuilder
    a64([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get services of mamta divas?").is.yes;
    }

    @WithName('Why you do not attend mamta divas')
    @WithRegistrationStatusBuilder
    a65([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get services of mamta divas?").is.no;
    }

    @WithName('What do you get as a snacks and how much quantity you get? (Check snacks)')
    @WithRegistrationStatusBuilder
    a67([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get nutrition/snacks from anganwadi center")
        .is.yes;
    }

    @WithName('How many times do you get this snack/nutrition in the month?')
    @WithRegistrationStatusBuilder
    a69([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get nutrition/snacks from anganwadi center")
        .is.yes;
    }

    @WithName('Who gave you information about government programme/scheme?')
    @WithRegistrationStatusBuilder
    a70([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have you got any benefits of government programme/scheme?")
        .is.yes;
    }

    @WithName('Under which government programme/scheme you got entitlements?')
    @WithRegistrationStatusBuilder
    a72([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have you got any benefits of government programme/scheme?")
        .is.yes;
    }

    @WithName('Why you did not get benefits?')
    @WithRegistrationStatusBuilder
    a73([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have you got any benefits of government programme/scheme?")
        .is.no;
    }

   
    @WithName('In which illness you cannot give mother’s milk to the child')
    @WithRegistrationStatusBuilder
    a74([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Can we give mother’s milk to child if mother is sick")
        .is.no;
    }

    @WithName('What did you use')
    @WithRegistrationStatusBuilder
    a75([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('From where and by whom you got the information')
    @WithRegistrationStatusBuilder
    a76([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('Why you did not use any contraception method')
    @WithRegistrationStatusBuilder
    a77([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.no;
    }

    @WithName('What do you consume')
    @WithRegistrationStatusBuilder
    a78([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you have any addiction").is.yes;
    }
}

module.exports = {PregnantWomenEnrolmentViewHandler};
