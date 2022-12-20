const GET = `
  select
    *
  from
    posts
  where 
    case
      when $1 > 0 then post_id = $1
      when $1 = 0 then post_title ilike concat('%', $2::varchar, '%')
      else true
    end;
`;

const ADDIMAGE = `
  insert into
    post_images(post_id, post_image_link)
  values ($1, $2)
  returning *;
`;
export default { GET, ADDIMAGE };
