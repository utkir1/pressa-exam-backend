const LOGIN = `
  select
    u.user_id,
    u.username,
    u.create_at
  from
    users as u
  where
    lower(username) = lower($1)
    and password = crypt($2, u.password);
`;

const REGISTER = `
  insert into
    users(username, password)
  values
    (
      $1,
      crypt($2, gen_salt('bf'))
    )
  returning user_id, username, create_at;
`;

export default { LOGIN, REGISTER };
