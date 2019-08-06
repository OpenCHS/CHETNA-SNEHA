const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName
} from 'rules-config/rules';

const ViewFilter = RuleFactory("d712105c-14d9-4c64-b5e0-6150cf88f7a2", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('checklistItem', 'formElement');
const EnrolmentChecklists = RuleFactory("d440e0b4-a404-4bdf-ba5e-f1e5d5cf5cc0", "Checklists");

@ViewFilter("54501bb9-43e9-4b32-aea5-59358d3832a2", "Chetna Check List View Filter", 100.0, {})
class CheckListViewFilterChetna {
    static exec(checklistItem, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CheckListViewFilterChetna(), checklistItem, formElementGroup, today);
    }

    @WithName("Specify Other")
    @WithStatusBuilder
    other([checklistItem], statusBuilder) {
        statusBuilder.show().when.valueInChecklistItem("Place of Vaccination").containsAnswerConceptName("Other");
    }

}

@EnrolmentChecklists("fae40f1f-3669-452f-ab99-b5323346ef4c", "Child vaccination schedule", 1.0)
class ChildVaccinationChecklist {
    static exec(enrolment, checklistDetails) {
        const vaccinationDetails = checklistDetails.find(cd => cd.name === 'Vaccination');
        if (vaccinationDetails === undefined) return [];
        const vaccinationList = {
            baseDate: enrolment.individual.dateOfBirth,
            detail: {uuid: vaccinationDetails.uuid},
            items: vaccinationDetails.items.map(vi => ({
                detail: {uuid: vi.uuid}
            }))
        };
        return [vaccinationList];
    }
}



module.exports = {CheckListViewFilterChetna, ChildVaccinationChecklist};