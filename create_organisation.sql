select create_db_user('chetna-sneha', 'password');

INSERT into organisation(name, db_user, uuid, parent_organisation_id)
values ('CHETNA SNEHA', 'chetna-sneha', '28435bdb-0152-4175-a4e6-ed233372d3a7',
    (select id FROM organisation WHERE name = 'OpenCHS'))
ON CONFLICT (uuid) DO NOTHING;
