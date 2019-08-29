import {
    StatusBuilderAnnotationFactory, 
    RuleFactory,  
    FormElementsStatusHelper,
    WithName,
    FormElementStatus
} from 'rules-config/rules';
import lib from '../lib';
import moment from 'moment';

// Below 18.5	Underweight
// 18.5 – 24.9	Normal or Healthy Weight
// 25.0 – 29.9	Overweight
// 30.0 and Above	Obese
const getBMIStatus = (bmiValue) => {
    let status = "";
    if (bmiValue < 18.5) {
        status = "Underweight";
    }
    else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        status = "Normal";
    }
    else if (bmiValue >= 25.0 && bmiValue <= 29.9) {
        status = "Overweight";
    }
    else if (bmiValue >= 30.0) {
        status = "Obese";
    }
    return status;
};

const statusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const PregnantWomenViewFilter = RuleFactory("1d08e3e9-30a0-4fee-b1ce-55aeec627ea1", "ViewFilter");

@PregnantWomenViewFilter("12f9a59e-b0f9-4a1c-abe1-591c320cf199", "Pregnant Woman Enrolment", 100.0, {})
class PregnantWomenEnrolmentViewHandler {
    static exec(programEnrolment, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnantWomenEnrolmentViewHandler(), programEnrolment, formElementGroup, today);
    }    

    bmi(programEnrolment, formElement) {
        let weight = programEnrolment.getObservationValue('Weight');
        let height = programEnrolment.getObservationValue('Height');
        let bmi = '';
        if (_.isNumber(height) && _.isNumber(weight)) {
            bmi = lib.C.calculateBMI(weight, height);
        }
        return new FormElementStatus(formElement.uuid, true, bmi);
    }

    bmiStatus(programEnrolment, formElement){
        let weight = programEnrolment.getObservationValue('Weight');
        let height = programEnrolment.getObservationValue('Height');
        let bmi = '';
        if (_.isNumber(height) && _.isNumber(weight)) {
            bmi = lib.C.calculateBMI(weight, height);
        }
        return _.isNil(bmi) ?
            new FormElementStatus(formElement.uuid, true) :
            new FormElementStatus(formElement.uuid, true, getBMIStatus(bmi));
    }
    
    edd(programEnrolment, formElement) {
        const lmpDate = programEnrolment.getObservationValue('Last menstrual period');
        return _.isNil(lmpDate) ?
            new FormElementStatus(formElement.uuid, true) :
            new FormElementStatus(formElement.uuid, true, lib.calculations.estimatedDateOfDelivery(programEnrolment));
    }

    currentPregnancyMonth(programEnrolment, formElement, today) {
        const lmpDate = programEnrolment.getObservationValue('Last menstrual period');
        return _.isNil(lmpDate) ?
            new FormElementStatus(formElement.uuid, true) :
            new FormElementStatus(formElement.uuid, true, Math.round(moment(today).diff(lmpDate, 'months', true)));
            // lib.calculations.gestationalAge(programEnrolment, today)
    }
   
    @WithName('Other place/person pregnancy registered to')
    @statusBuilder
    a11([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Where/Whom to registered your pregnancy")
        .containsAnswerConceptName("Other");
    }  
 
    @WithName('Other reason of not having mamta card')
    @statusBuilder
    a12([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not having mamta card")
        .containsAnswerConceptName("Other");
    }  

    @WithName('Other person who did investigation')
    @statusBuilder
    a13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Who did you get the investigation")
        .containsAnswerConceptName("Other");
    } 

    @WithName('Other place form where IFA tablets received')
    @statusBuilder
    a14([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("IFA tablets received from")
        .containsAnswerConceptName("Other");
    } 

     @WithName('Other reasons to choose place of delivery')
    @statusBuilder
    a16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reasons to choose this place for delivery")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other services you get on mamta divas')
    @statusBuilder
    a17([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Other services you get on mamta divas")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other people who are available on mamta divas')
    @statusBuilder
    a18([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Who are available on mamta divas")
        .containsAnswerConceptName("Other");
    }
    
    @WithName('Other reason for not attending mamta divas')
    @statusBuilder
    a19([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Why you do not attend mamta divas")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other who gave you information about government programme/scheme')
    @statusBuilder
    a21([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Information about government programme/scheme received from")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other reason for not getting benefits')
    @statusBuilder
    a22([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not getting benefits under government programme/scheme")
        .containsAnswerConceptName("Other");
    }
    

    @WithName('Other types of complementary food that should be given to the child')
    @statusBuilder
    a23([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What types of complementary food should be given to the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other source from where/whom information about contraception received')
    @statusBuilder
    a24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("From where/whom information about contraception received")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other reason for not using any contraception method')
    @statusBuilder
    a25([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not using any contraception method")
        .containsAnswerConceptName("Other");
    }

    @WithName('Month in which pregnancy was registered')
    @statusBuilder
    a26([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have you registered pregnancy").is.yes;
    }

    @WithName('Where/Whom to registered your pregnancy?')
    @statusBuilder
    a27([], statusBuilder) {
        statusBuilder.skipAnswers('Under SNEHA programme');
        statusBuilder.show().when.valueInEnrolment("Have you registered pregnancy").is.yes;
    }
    
    @WithName('Whether have mamta card')
    @statusBuilder
    ab28([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Have you registered pregnancy").is.yes;
    }

    @WithName('Is mamta card updated')
    @statusBuilder
    a28([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether have mamta card").is.yes;
    }

    @WithName('Reason for not having mamta card')
    @statusBuilder
    a29([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether have mamta card").is.no;
    }

    @WithName('Number of live children')
    @statusBuilder
    a30([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Age of youngest child')
    @statusBuilder
    a31([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Number of times checkup done from doctor')
    @statusBuilder
    a32([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Who did you get the investigation?')
    @statusBuilder
    a33([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of IFA pills (every month)')
    @statusBuilder
    a54([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Received IFA tablets at every month").is.yes;
    }

    @WithName('IFA tablets received from')
    @statusBuilder
    a55([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Received IFA tablets at every month").is.yes;
    }

    @WithName('Do you consume IFA tablets? (check the strip of IFA tablet)')
    @statusBuilder
    a56([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Received IFA tablets at every month").is.yes;
    }

    @WithName('When do you consume IFA tablet')
    @statusBuilder
    a57([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Consumed IFA tablets").is.yes;
    }

    @WithName('Why you did not consume IFA tablets')
    @statusBuilder
    a58([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Consumed IFA tablets").is.no;
    }


    @WithName('Who took the decision')
    @statusBuilder
    a59([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.yes;
    }

    @WithName('At which place you will do your delivery')
    @statusBuilder
    a60([], statusBuilder) {
        statusBuilder.skipAnswers('Yet not decided');
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.yes;
    }

    @WithName('Reasons to choose this place for delivery')
    @statusBuilder
    a61([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is decision taken for place of delivery").is.yes;
    }

    @WithName('What are the services you get on mamta divas')
    @statusBuilder
    a62([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get services of mamta divas").is.yes;
    }

     @WithName('Who are available on mamta divas')
    @statusBuilder
    a64([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get services of mamta divas").is.yes;
    }

    @WithName('Why you do not attend mamta divas')
    @statusBuilder
    a65([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get services of mamta divas").is.no;
    }

    @WithName('What does mother get as a snacks')
    @statusBuilder
    a67([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get nutrition/snacks from anganwadi centre")
        .is.yes;
    }

    @WithName('Number of times snack/nutrition receievd in the month')
    @statusBuilder
    a69([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get nutrition/snacks from anganwadi centre")
        .is.yes;
    }

    @WithName('Number of times food reveived in the last month')
    @statusBuilder
    ac69([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get nutrition/snacks from anganwadi centre")
        .is.yes;
    }

    @WithName('Who gave you information about government programme/scheme')
    @statusBuilder
    a70([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.yes;
    }

    @WithName('Programme/scheme under which received entitlements')
    @statusBuilder
    a72([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.yes;
    }

    @WithName('Reason for not getting benefits under government programme/scheme')
    @statusBuilder
    a73([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.no;
    }

   
    @WithName('In which illness you cannot give mother’s milk to the child')
    @statusBuilder
    a74([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Can we give mother’s milk to child if mother is sick").is.no;
    }

    @WithName('What did you use')
    @statusBuilder
    a75([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('From where/whom information about contraception received')
    @statusBuilder
    a76([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('Reason for not using any contraception method')
    @statusBuilder
    a77([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.no;
    }

    @WithName('What do you consume')
    @statusBuilder
    a78([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you have any addiction").is.yes;
    }

    @WithName('How much quantity of Oil mother gets')
    @statusBuilder
    a80([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Oil");
    }

    @WithName('How much quantity of Wheat mother gets')
    @statusBuilder
    a82([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Wheat (cereal)");
    }

    @WithName('How much quantity of Pulses mother gets')
    @statusBuilder
    a84([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Pulses");
    }

    @WithName('How much quantity of Salt mother gets')
    @statusBuilder
    a86([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Salt");
    }

    @WithName('Number of times weight measurement')
    @statusBuilder
    a88([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of times BP measurement')
    @statusBuilder
    a89([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Got TT vaccines')
    @statusBuilder
    a90([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of times blood test')
    @statusBuilder
    a91([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of times urine test')
    @statusBuilder
    a92([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Have got Calcium supplement')
    @statusBuilder
    a93([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of times ultrasound scan')
    @statusBuilder
    a94([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Number of time abdominal check-ups')
    @statusBuilder
    a95([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.yes;
    }

    @WithName('Weight measurement')
    @statusBuilder
    a100([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('BP measurement')
    @statusBuilder
    a101([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('TT vaccines')
    @statusBuilder
    a102([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Blood test')
    @statusBuilder
    a103([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Urine test')
    @statusBuilder
    a104([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('IFA tablets')
    @statusBuilder
    a105([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Calcium supplement')
    @statusBuilder
    a106([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Ultrasound scan')
    @statusBuilder
    a107([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Abdominal check-ups')
    @statusBuilder
    a108([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Done checkup by doctor in current pregnancy").is.no
        .and.when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    @WithName('Has any child died')
    @statusBuilder
    ad11([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1)
    }

    @WithName('Reason for child\'s death')
    @statusBuilder
    ad12([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Has any child died").is.yes;
    }


    @WithName('Other reason for child\'s death')
    @statusBuilder
    ad13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for child\'s death").containsAnswerConceptName("Other");
    }

    @WithName('Reason for miscarriage')
    @statusBuilder
    ad15([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for child\'s death").containsAnswerConceptName("Miscarriage");
    }

    @WithName('Other reason for miscarriage')
    @statusBuilder
    ad16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for miscarriage").containsAnswerConceptName("Other");
    }
}

module.exports = {PregnantWomenEnrolmentViewHandler};
