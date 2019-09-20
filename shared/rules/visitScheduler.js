
import _ from 'lodash';
import moment from 'moment';
import {RuleFactory} from 'rules-config/rules';
import RuleHelper from "./RuleHelper";

const visitDate = ({programEnrolment}) => {
    return moment(programEnrolment.enrolmentDateTime).add(1, 'months').toDate();
};

const visitDateDuringEncounter = ({programEncounter}) => {
    var enrolmentDay = moment(programEncounter.programEnrolment.enrolmentDateTime).date();
    var dateContext = moment(programEncounter.encounterDateTime).add(1, 'months').toDate();
        return moment(dateContext).set('date',enrolmentDay).toDate();
    };


@RuleFactory("1d08e3e9-30a0-4fee-b1ce-55aeec627ea1", "VisitSchedule")
("7a0c2772-c346-4183-ac3c-e2aa954fa8cd", "CHETNA SNEHA Pregnant Woman Enrolment Visit schedules", 100.0)
class ScheduleVisitsDuringPregnantWomanEnrolment {
    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createEnrolmentScheduleBuilder(programEnrolment, visitSchedule);
        RuleHelper.addSchedule(scheduleBuilder, 'Monthly monitoring of pregnant woman', 'Monthly monitoring of pregnant woman', visitDate({programEnrolment}), 8);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@RuleFactory("d440e0b4-a404-4bdf-ba5e-f1e5d5cf5cc0", "VisitSchedule")
("f61959cd-1291-452f-b5da-d6320a9b0b09", "CHETNA SNEHA Child Enrolment Visit schedules", 100.0)
class ScheduleVisitsDuringChildEnrolment {
    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {

        const ageOfChild = programEnrolment.individual.getAgeInMonths();
        if(ageOfChild > 24 ) 
        {
            return visitSchedule;
        }else {
            let scheduleBuilder = RuleHelper.createEnrolmentScheduleBuilder(programEnrolment, visitSchedule);
            RuleHelper.addSchedule(scheduleBuilder, 'Monthly monitoring of child', 'Monthly monitoring of child', visitDate({programEnrolment}), 8);
            return scheduleBuilder.getAllUnique("encounterType");
        }

       
    }
}

@RuleFactory("b9cc8861-f9b7-4e0e-82fa-49e3eabe6968", "VisitSchedule")
("2f7e54a8-b405-4fac-aec5-a1a89a56b74f", "ScheduleVisitsDuringMonthlyMonitoringPW", 10.0)
class ScheduleVisitsDuringMonthlyMonitoringPregnantWoman {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
    let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
    RuleHelper.addSchedule(scheduleBuilder, 'Monthly monitoring of pregnant woman', 'Monthly monitoring of pregnant woman', visitDateDuringEncounter({programEncounter}), 10);
    return scheduleBuilder.getAllUnique("encounterType");
    }
}

@RuleFactory("3e9a7b97-87fd-4936-bcec-68a4da7d7a5c", "VisitSchedule")
("e88ab575-59cf-48cc-b156-428b91c4b970", "ScheduleVisitsDuringMonthlyMonitoringChild", 10.0)
class ScheduleVisitsDuringMonthlyMonitoringChild {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {

    const ageOfChild = programEncounter.programEnrolment.individual.getAgeInMonths();
    if(ageOfChild > 24 ) return visitSchedule;
    
    let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
    RuleHelper.addSchedule(scheduleBuilder, 'Monthly monitoring of child', 'Monthly monitoring of child', visitDateDuringEncounter({programEncounter}), 10);
    return scheduleBuilder.getAllUnique("encounterType");
    }
}

export {
    ScheduleVisitsDuringPregnantWomanEnrolment,
    ScheduleVisitsDuringChildEnrolment,
    ScheduleVisitsDuringMonthlyMonitoringPregnantWoman,
    ScheduleVisitsDuringMonthlyMonitoringChild
}