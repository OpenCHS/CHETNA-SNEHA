DO
$$
    DECLARE
        enl_row program_enrolment%rowtype;
    BEGIN
        FOR enl_row IN SELECT * FROM program_enrolment
            LOOP
                INSERT INTO program_encounter(observations,
                                              earliest_visit_date_time,
                                              encounter_date_time,
                                              program_enrolment_id,
                                              uuid,
                                              version,
                                              encounter_type_id,
                                              name,
                                              max_visit_date_time,
                                              organisation_id,
                                              cancel_date_time,
                                              cancel_observations,
                                              audit_id,
                                              encounter_location,
                                              cancel_location)
                SELECT '{}'::jsonb,
                       enl_row.enrolment_date_time + interval '1 month' * 1,
                       null,
                       enl_row.id,
                       uuid_generate_v4(),
                       0,
                       case
                           when enl_row.program_id = 8 then 61
                           when enl_row.program_id = 9 then 65
                           end,
                       case
                           when enl_row.program_id = 8 then 'Monthly monitoring of pregnant woman'
                           when enl_row.program_id = 9 then 'Monthly monitoring of child'
                           end,
                       enl_row.enrolment_date_time + interval '1 month' * 1 + interval '10 days',
                       (select id from organisation where name = 'CHETNA SNEHA'),
                       null,
                       '{}'::jsonb,
                       create_audit((select id
                                     from users
                                     where username = 'dataimporter@chetna')),
                       null,
                       null;
            END LOOP;
    END;
$$
LANGUAGE plpgsql;