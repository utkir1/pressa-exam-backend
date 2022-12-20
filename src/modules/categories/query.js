const GET = `
  select
    c.category_id,
    c.category_name,
    json_agg(s.*) as sub_categories
  from
    categories as c
    left join (
      select
        s.sub_category_id,
        s.sub_category_name,
        s.category_id
      from
        sub_categories as s
    ) as s on s.category_id = c.category_id
  where
    c.status = 'active'
  group by
    c.category_id;
`;

const POST = `
  insert into
    categories(category_name)
  values ($1)
  returning *;
`;

const PUT = `
  update categories set
    category_name = $2
  where
    status = 'active'
    and category_id = $1 
  returning *;
`;

const DELETE = `
  update categories set
    status = 'deleted'
  where
    category_id = $1 
  returning *;
`;

const CHECK = `
  select * from 
    categories
  where 
    category_name = $1
    and status = 'deleted';
`;

const POSTDELETED = `
  update categories set
    status = 'active'
  where
    category_id = $1 
  returning *;
`;

export default { GET, POST, PUT, DELETE, CHECK, POSTDELETED };
