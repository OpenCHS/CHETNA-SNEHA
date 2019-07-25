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


module.exports = {CheckListViewFilterChetna};