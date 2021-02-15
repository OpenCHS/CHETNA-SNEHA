set role  chetna_sneha;
--ROTA 1
insert into checklist_item(completion_date, checklist_id, uuid, version, organisation_id, audit_id, observations,
                           checklist_item_detail_id)
select NULL,
       checklist.id,
       uuid_generate_v4(),
       0,
       32,
       create_audit((select id from users where username = 'nupoork@chetnasneha')),
       '{}'::jsonb,
        (select id from checklist_item_detail where uuid = '52f2a64a-5dc1-4d43-83bc-3f9b3dfdc0ed')
from program_enrolment enl
     join checklist on checklist.program_enrolment_id = enl.id
     join checklist_item on checklist.id = checklist_item.checklist_id
     join checklist_item_detail cid on checklist_item.checklist_item_detail_id = cid.id
where cid.uuid not in ('52f2a64a-5dc1-4d43-83bc-3f9b3dfdc0ed');
--ROTA 2
insert into checklist_item(completion_date, checklist_id, uuid, version, organisation_id, audit_id, observations,
                           checklist_item_detail_id)
select NULL,
       checklist.id,
       uuid_generate_v4(),
       0,
       32,
       create_audit((select id from users where username = 'nupoork@chetnasneha')),
       '{}'::jsonb,
       (select id from checklist_item_detail where uuid = 'a2a4a03e-5bb8-4144-b4f6-2dd1faac1d3e')
from program_enrolment enl
         join checklist on checklist.program_enrolment_id = enl.id
         join checklist_item on checklist.id = checklist_item.checklist_id
         join checklist_item_detail cid on checklist_item.checklist_item_detail_id = cid.id
where cid.uuid not in ('a2a4a03e-5bb8-4144-b4f6-2dd1faac1d3e');
--ROTA 3
insert into checklist_item(completion_date, checklist_id, uuid, version, organisation_id, audit_id, observations,
                           checklist_item_detail_id)
select NULL,
       checklist.id,
       uuid_generate_v4(),
       0,
       32,
       create_audit((select id from users where username = 'nupoork@chetnasneha')),
       '{}'::jsonb,
       (select id from checklist_item_detail where uuid = 'def302ad-ab5d-4e24-98c4-22891f7d8ebe')
from program_enrolment enl
         join checklist on checklist.program_enrolment_id = enl.id
         join checklist_item on checklist.id = checklist_item.checklist_id
         join checklist_item_detail cid on checklist_item.checklist_item_detail_id = cid.id
where cid.uuid not in ('def302ad-ab5d-4e24-98c4-22891f7d8ebe');
