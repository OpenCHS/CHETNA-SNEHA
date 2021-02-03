import moment from 'moment';
import {RuleFactory} from 'rules-config/rules';
import RuleHelper from "./RuleHelper";

const getNextVisitDate = (eventDate) => {
    return moment(eventDate).add(1, 'months').toDate();
};

const nextVisits = (programEncounter, visitSchedule) => {
    const nextVisitDate = moment(programEncounter.earliestVisitDateTime).add(1, 'months').toDate();
    if (programEncounter.encounterType.name === 'Monthly monitoring of child') {
        const ageOfChild = programEncounter.programEnrolment.individual.getAgeInMonths(nextVisitDate);
        if (ageOfChild > 24) return visitSchedule;
    }
    let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
    RuleHelper.addSchedule(scheduleBuilder, programEncounter.encounterType.name, programEncounter.encounterType.name,
        nextVisitDate, 10);
    return scheduleBuilder.getAllUnique("encounterType");
};

@RuleFactory("42ed91ba-2385-436b-aec7-b51f1207e3fa", "VisitSchedule")
("19b58664-784b-4e76-95cb-ee0973ba59a5", "CHETNA SNEHA Monthly Reporting Visit schedules", 100.0)
class ScheduleVisitsMonthlyReporting {
    static exec(encounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createGeneralEncounterScheduleBuilder(encounter, visitSchedule);
        // const nextVisitDate = moment(encounter.registrationDate).add(1, 'months').toDate();
        const nextVisitDate = moment().startOf('month').add(20, 'days').toDate();
        RuleHelper.addSchedule(scheduleBuilder, 'Monthly reporting',
            'Monthly report of field worker', nextVisitDate, 8);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@RuleFactory("d0b9e3ae-c68e-4a1c-b765-04a6491ed23d", "VisitSchedule")
("055af1f4-b858-4c73-ba5d-ec6f387dd31f", "CHETNA SNEHA Next Monthly Reporting Visit schedules", 100.0)
class ScheduleNextVisitsMonthlyReporting {
    static exec(encounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createGeneralEncounterScheduleBuilder(encounter, visitSchedule);
        const nextVisitDate = moment(encounter.earliestVisitDateTime).add(1, 'months').toDate();
        RuleHelper.addSchedule(scheduleBuilder, 'Monthly reporting',
            'Monthly report of field worker', nextVisitDate, 8);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@RuleFactory("1d08e3e9-30a0-4fee-b1ce-55aeec627ea1", "VisitSchedule")
("7a0c2772-c346-4183-ac3c-e2aa954fa8cd", "CHETNA SNEHA Pregnant Woman Enrolment Visit schedules", 100.0)
class ScheduleVisitsDuringPregnantWomanEnrolment {
    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        const nextVisitDate = moment(programEnrolment.enrolmentDateTime).add(4, 'days').toDate();
        let scheduleBuilder = RuleHelper.createEnrolmentScheduleBuilder(programEnrolment, visitSchedule);
        RuleHelper.addSchedule(scheduleBuilder, 'Monthly monitoring of pregnant woman',
            'Monthly monitoring of pregnant woman', nextVisitDate, 8);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@RuleFactory("d440e0b4-a404-4bdf-ba5e-f1e5d5cf5cc0", "VisitSchedule")
("f61959cd-1291-452f-b5da-d6320a9b0b09", "CHETNA SNEHA Child Enrolment Visit schedules", 100.0)
class ScheduleVisitsDuringChildEnrolment {
    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        const nextVisitDate = moment(programEnrolment.enrolmentDateTime).add(4, 'days').toDate();
            //getNextVisitDate(programEnrolment.enrolmentDateTime);
        const ageOfChild = programEnrolment.individual.getAgeInMonths(nextVisitDate);
        if (ageOfChild > 24) {
            return visitSchedule;
        } else {
            let scheduleBuilder = RuleHelper.createEnrolmentScheduleBuilder(programEnrolment, visitSchedule);

            RuleHelper.addSchedule(scheduleBuilder, 'Monthly monitoring of child',
                'Monthly monitoring of child', nextVisitDate, 8);
            return scheduleBuilder.getAllUnique("encounterType");
        }


    }
}

@RuleFactory("b9cc8861-f9b7-4e0e-82fa-49e3eabe6968", "VisitSchedule")
("2f7e54a8-b405-4fac-aec5-a1a89a56b74f", "ScheduleVisitsDuringMonthlyMonitoringPW", 10.0)
class ScheduleVisitsDuringMonthlyMonitoringPregnantWoman {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
       
        if (programEncounter.programEnrolment.programExitDateTime == null )
        return nextVisits(programEncounter, visitSchedule);
    }
}

@RuleFactory("3e9a7b97-87fd-4936-bcec-68a4da7d7a5c", "VisitSchedule")
("e88ab575-59cf-48cc-b156-428b91c4b970", "ScheduleVisitsDuringMonthlyMonitoringChild", 10.0)
class ScheduleVisitsDuringMonthlyMonitoringChild {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
       
        if (programEncounter.programEnrolment.programExitDateTime == null )
        return nextVisits(programEncounter, visitSchedule);
    }
}


@RuleFactory("52d0dcea-f074-4332-8ab7-ba54be9d8cf1", "VisitSchedule")
("340f0ca6-6b6d-44e3-b1f2-ea4dc88f36a3", "ScheduleVisitsOnCancel", 10.0)
class ScheduleVisitsOnCancel {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        if (programEncounter.programEnrolment.programExitDateTime == null )
        return nextVisits(programEncounter, visitSchedule);
    }
}

export {
    ScheduleVisitsDuringPregnantWomanEnrolment,
    ScheduleVisitsDuringChildEnrolment,
    ScheduleVisitsDuringMonthlyMonitoringPregnantWoman,
    ScheduleVisitsDuringMonthlyMonitoringChild,
    ScheduleVisitsOnCancel,
    ScheduleVisitsMonthlyReporting,
    ScheduleNextVisitsMonthlyReporting
}