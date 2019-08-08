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

   
    @WithName('Sickness in last 3 months')
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

    // @WithName('Till which age your child has breastfed exclusively')
    // @statusBuilder
    // ab10([], statusBuilder) {
    //     statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    // }

    // // When did you give water to the child
    // @WithName('When did you give water to the child')
    // @statusBuilder
    // ab37([], statusBuilder) {
    // statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    // }

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

    @WithName('Whether child goes to the Anganwadi centre regularly')
    @statusBuilder
    ab17([], statusBuilder) {
        statusBuilder.show().when.ageInYears.not.lessThanOrEqualTo(3)
        .and.when.valueInEnrolment("Is child registered in anganwadi centre").is.yes;
    }

    @WithName('What does mother get as a snacks')
    @statusBuilder
    ab13([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Does the child get snacks as take home ration from Anganwadi regularly")
        .is.yes;
    } 
    
    @WithName('Reason for not going to Anganwadi centre regularly')
    @statusBuilder
    ab14([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether child goes to the Anganwadi centre regularly")
        .is.no;
    } 

    @WithName('Other reason for not going to Anganwadi centre regularly')
    @statusBuilder
    ab15([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not going to Anganwadi centre regularly")
        .containsAnswerConceptName("Other");
    } 

    // Treatment given for warm infestation
    @WithName('Treatment given for warm infestation')
    @statusBuilder
    abc16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did child suffer from warm infestation")
        .is.yes;
    } 

    @WithName('Other treatment given for warm infestation')
    @statusBuilder
    ab16([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Treatment given for warm infestation")
        .containsAnswerConceptName("Other");
    } 
  
    @WithName('Who is taking care of child')
    @statusBuilder
    ab18([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is mother alive").is.no;
    } 

    @WithName('Place for the occupational activity')
    @statusBuilder
    ab19([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Involved in any occupational activity").is.yes;
    } 

    @WithName('In which occupational activity are you involved')
    @statusBuilder
    ab20([], statusBuilder) {
        statusBuilder.skipAnswers("Farming","Other","Don't know",'Housework');
        statusBuilder.show().when.valueInEnrolment("Involved in any occupational activity").is.yes;
    }       

    // Number of times got pregnant
    @WithName('Number of times got pregnant')
    @statusBuilder
    ab21([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is mother alive").not.is.no;
    }

    // Number of live children
    @WithName('Number of live children')
    @statusBuilder
    ab22([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    // Has any child died
    @WithName('Has any child died')
    @statusBuilder
    ab23([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of times got pregnant").is.greaterThan(1);
    }

    // Reason for child's death
    @WithName('Reason for child\'s death')
    @statusBuilder
    ab24([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Has any child died").is.yes;
    }

    // Other reason for child's death
    @WithName('Other reason for child\'s death')
    @statusBuilder
    ab25([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for child\'s death")
        .containsAnswerConceptName("Other");
    }

    // Reason for miscarriage    
    @WithName('Reason for miscarriage')
    @statusBuilder
    ab26([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for child\'s death")
        .containsAnswerConceptName("Miscarriage");
    }

    // Other reason for miscarriage
    @WithName('Other reason for miscarriage')
    @statusBuilder
    ab27([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for miscarriage")
        .containsAnswerConceptName("Other");
    }

    // Whether have mamta card
    @WithName('Whether have mamta card')
    @statusBuilder
    ab28([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is mother alive").not.is.no;
    }

    // Reason for not having mamta card 
    @WithName('Reason for not having mamta card')
    @statusBuilder
    ab29([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether have mamta card").is.no
        .and.when.valueInEnrolment("Is mother alive").not.is.no;
    }    

    // Other reason for not having mamta card
    @WithName('Other reason for not having mamta card')
    @statusBuilder
    ab30([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not having mamta card")
        .containsAnswerConceptName("Other").and.when.valueInEnrolment("Is mother alive").not.is.no;
    }

    // Place of delivery
    @WithName('Place of delivery')
    @statusBuilder
    ab31([], statusBuilder) {
        statusBuilder.skipAnswers('Sub Center','Primary Health Center','Regional Hospital',
        'NGO Hospital','During Transportation like in Ambulance etc')
        .and.when.valueInEnrolment("Is mother alive").not.is.no;;
    }

    // Type of delivery
    @WithName('Type of delivery')
    @statusBuilder
    ab32([], statusBuilder) {
        statusBuilder.skipAnswers('Instrumental');
        statusBuilder.show().when.valueInEnrolment("Is mother alive").not.is.no;
    }

    // Other type of delivery
     @WithName('Other type of delivery')
     @statusBuilder
     ab33([], statusBuilder) {
         statusBuilder.show().when.valueInEnrolment("Type of delivery").containsAnswerConceptName("Other");
     }

    //  Other types of complementary food that should be given to the child
    @WithName('Other types of complementary food that should be given to the child')
    @statusBuilder
    ab34([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What types of complementary food should be given to the child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other things that should be kept in mind while preparing food')
    @statusBuilder
    ab35([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What should be kept in mind when preparing a food for child")
        .containsAnswerConceptName("Other");
    }

    @WithName('Other things that should be kept in mind while feed the child')
    @statusBuilder
    ab36([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What should be kept in mind while feed the child")
        .containsAnswerConceptName("Other");
    }

    // When did you start giving complementary food to the child
    @WithName('When did you start giving complementary food to the child')
    @statusBuilder
    ab38([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    }
    
   // Who has taken decision to start complementary food to the child
    @WithName('Who has taken decision to start complementary food to the child')
    @statusBuilder
    ab39([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    // What type of food do you give to the child as complementary food
    @WithName('What type of food do you give to the child as complementary food')
    @statusBuilder
    ab40([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    // Other types of complementary food given to the child
    @WithName('Other types of complementary food given to the child')
    @statusBuilder
    ab41([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What type of food do you give to the child as complementary food")
        .containsAnswerConceptName("Other");
    }

     // How much do you give complementary food to the child
    @WithName('How much do you give complementary food to the child')
    @statusBuilder
    ab42([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    // How often do you give complementary food to the children
    @WithName('How often do you give complementary food to the children')
    @statusBuilder
    ab43([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    // What are the points you kept in a mind while preparing a food for the child
    @WithName('What are the points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ab44([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    // Other points you kept in a mind while preparing a food for the child
    @WithName('Other points you kept in a mind while preparing a food for the child')
    @statusBuilder
    ab45([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while preparing a food for the child")
        .containsAnswerConceptName("Other");
    }

    // Do you give complementary food along with breast feeding
    @WithName('Do you give complementary food along with breast feeding')
    @statusBuilder
    ab46([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6);
    }

    @WithName('Other points you kept in a mind while feed the child')
    @statusBuilder
    abc48([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What are the points you kept in a mind while feed the child")
        .containsAnswerConceptName("Other");
    }

    // When do you breastfeed to your child
    @WithName('When do you breastfeed to your child')
    @statusBuilder
    ab47([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you give complementary food along with breast feeding")
        .is.yes;
    }

    // Why don't you give complementary food
    @WithName('Why don\'t you give complementary food')
    @statusBuilder
    ab48([], statusBuilder) {
     statusBuilder.show().when.valueInEnrolment("Do you give complementary food along with breast feeding")
          .is.no;
    }

   // When do you wash child’s hand
    @WithName('When do you wash child’s hand')
    @statusBuilder
    ab49([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    @WithName('What are the points you kept in a mind while feed the child')
    @statusBuilder
    ab50([], statusBuilder) {
        statusBuilder.show().when.ageInMonths.is.greaterThanOrEqualTo(6)
        .and.when.valueInEnrolment("When did you start giving complementary food to the child")
        .not.containsAnswerConceptName("Yet not started");
    }

    // Does the child get snacks as take home ration from Anganwadi regularly
    @WithName('Does the child get snacks as take home ration from Anganwadi regularly')
    @statusBuilder
    abc51([], statusBuilder) {
        statusBuilder.show().when.ageInYears.is.greaterThanOrEqualTo(3).
        and.when.valueInEnrolment("Is child registered in anganwadi centre").is.yes;
    }

    // What does child get as a snacks
    @WithName('What does child get as a snacks')
    @statusBuilder
    ab51([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Does the child get snacks as take home ration from Anganwadi regularly")
        .is.yes;
    }    

    // What do you cook from that snacks for a child
    @WithName('What do you cook from that snacks for a child')
    @statusBuilder
    abc52([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get nutrition/snacks from anganwadi centre")
        .is.yes;
    }

    // How much quantity of Oil child gets
    @WithName('How much quantity of Oil child gets')
    @statusBuilder
    ab52([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does child get as a snacks")
        .containsAnswerConceptName("Oil");
    }

    // How much quantity of Wheat child gets
    @WithName('How much quantity of Wheat child gets')
    @statusBuilder
    ab53([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does child get as a snacks")
        .containsAnswerConceptName("Wheat (cereal)");
    }
    
    // How much quantity of Pulses child gets
    @WithName('How much quantity of Pulses child gets')
    @statusBuilder
    ab54([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does child get as a snacks")
        .containsAnswerConceptName("Pulses");
    }

    // How much quantity of Salt child gets
    @WithName('How much quantity of Salt child gets')
    @statusBuilder
    ab55([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does child get as a snacks")
        .containsAnswerConceptName("Salt");
    }

    @WithName('What does mother get as a snacks')
    @statusBuilder
    ab56([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get snacks as take home ration from Anganwadi centre")
        .is.yes;
    }

    @WithName('How much quantity of Oil mother gets')
    @statusBuilder
    ab57([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Oil");
    }

    @WithName('How much quantity of Wheat mother gets')
    @statusBuilder
    ab58([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Wheat (cereal)");
    }
   
    @WithName('How much quantity of Pulses mother gets')
    @statusBuilder
    ab59([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Pulses");
    }

    @WithName('How much quantity of Salt mother gets')
    @statusBuilder
    ab60([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("What does mother get as a snacks")
        .containsAnswerConceptName("Salt");
    }

    @WithName('What did you cook from the snacks received')
    @statusBuilder
    abc60([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you get snacks as take home ration from Anganwadi centre")
        .is.yes;
    }

    @WithName('Programme/scheme under which received entitlements')
    @statusBuilder
    ab61([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.yes;
    }

    @WithName('Reason for not getting benefits under government programme/scheme')
    @statusBuilder
    ab62([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Got any benefits of government programme/scheme")
        .is.no;
    }

    @WithName('Other reason for not getting benefits')
    @statusBuilder
    ab63([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Reason for not getting benefits under government programme/scheme")
        .containsAnswerConceptName("Other");
    }

    @WithName('Method of contraception used')
    @statusBuilder
    ab64([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('From where/whom information about contraception received')
    @statusBuilder
    ab65([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Did you use any method of contraception before pregnancy")
        .is.yes;
    }

    @WithName('Other source from where/whom information about contraception received')
    @statusBuilder
    ab66([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("From where/whom information about contraception received")
        .containsAnswerConceptName("Other");
    }

    @WithName('What do you consume')
    @statusBuilder
    ab67([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Do you have any addiction").is.yes;
    }

    @WithName('What are the advantages of immunization')
    @statusBuilder
    ab68([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is vaccination good for child's health").is.yes;
    }

    @WithName('What are the reasons of vaccination not being good')
    @statusBuilder
    ab69([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Is vaccination good for child's health").is.no;
    }

}

module.exports = {ChildrenEnrolmentViewHandler};
