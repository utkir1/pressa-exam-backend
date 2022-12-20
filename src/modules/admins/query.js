const GET = `
  select
    admin_id,
    admin_name,
    admin_avatar,
    create_at
  from
    admins
  where
    case
      when $1 > 0 then admin_id = $1
    else true
  end;
`;

const POST = `
  insert into
    admins(admin_name, password, admin_avatar)
  values ($1, $2, $3)
  returning *;
`;

const LOGIN = `
  select
    admin_id,
    admin_name,
    admin_avatar,
    create_at
  from
    admins
  where
    lower(admin_name) = lower($1)
    and password = crypt($2, password);
`;

export default { GET, POST, LOGIN };
