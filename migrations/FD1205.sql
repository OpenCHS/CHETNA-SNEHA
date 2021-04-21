--Ticket: https://avni.freshdesk.com/a/tickets/1205

--Error is coming because earlier in Pregnancy enrolment Form "Where/Whom to registered your pregnancy" was singleSelect and
--later it was made multiSelect. So when editing the older records, app is breaking and giving error
--i.isAnswerAlreadyPresent is not a function.

--This migration will convert all the singleSelect obs to multiselect.

set role chetna_sneha;
with audits as (
    update program_enrolment
        set observations = observations ||
                           json_build_object('17b01907-dab2-4c56-8c69-1f9e801aac33',
                                             array [observations ->> '17b01907-dab2-4c56-8c69-1f9e801aac33'])::jsonb
        where program_id = (select id from program where name = 'Pregnant Woman')
            and observations -> '17b01907-dab2-4c56-8c69-1f9e801aac33' notnull
            and (observations ->> '17b01907-dab2-4c56-8c69-1f9e801aac33')::text not like '[%'
        returning audit_id
)
update audit
set last_modified_date_time = current_timestamp
where id in (select audit_id from audits)

