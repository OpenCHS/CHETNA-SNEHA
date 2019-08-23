set role "chetna-sneha";
drop table if exists chetna_nutritional_status;
create table chetna_nutritional_status
(
  grade  int,
  status varchar(256)

);

insert into chetna_nutritional_status
values (1, 'Normal');
insert into chetna_nutritional_status
values (1, 'Moderately Underweight');
insert into chetna_nutritional_status
values (1, 'Severely Underweight');


create view active_individuals as
SELECT i.id,
       i.uuid,
       i.address_id,
       i.observations,
       i.version,
       i.date_of_birth,
       i.date_of_birth_verified,
       i.gender_id,
       i.registration_date,
       i.organisation_id,
       i.first_name,
       i.last_name,
       i.is_voided,
       i.audit_id,
       i.facility_id,
       i.registration_location,
       i.subject_type_id
FROM ((individual i
  LEFT JOIN program_enrolment enrolment ON ((i.id = enrolment.individual_id)))
       LEFT JOIN program_encounter encounter ON ((enrolment.id = encounter.program_enrolment_id)))
WHERE ((encounter.encounter_date_time > (now() - '5 mons 00:00:01'::interval)) OR (enrolment.enrolment_date_time > (now() - '5 mons 00:00:01'::interval)))
GROUP BY i.id;

set role none;
