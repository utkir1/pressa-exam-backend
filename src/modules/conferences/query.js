const GET = `
  select
    to_json(res)
  from
    (
      select
        c.*,
        to_json(o) "organizer",
        to_json(p) "post"
      from
        conferences c
        inner join (
          select
            o.*,
            o.organizer_profession
          from
            organizers o
        ) as o on c.organizer_id = o.organizer_id
        inner join (
          select
            p.*,
            json_agg(i.post_image_link) as post_images
          from
            posts p
            left join post_images as i on p.post_id = i.post_id
          group by
            p.post_id
        ) as p on p.conference_id = c.conference_id
      where
        case
          when $4 > 0 then c.conference_id = $4
          when $4 = 0 then c.status = $3
          else true
        end
      order by 
        c.create_at desc
      offset 
        $1
      limit
        $2
    ) res;
`;

const POSTORGANIZER = `
  insert into
    organizers(
      organizer_name,
      organizer_profession,
      organizer_type,
      organizer_phone,
      organizer_phone_stuck,
      user_id
    )
  values
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
  returning *;
`;

const POSTORGANIZATION = `
  insert into
    organizations (
      organization_name,
      organizer_id
    )
  values
    (
      $1,
      $2
    )
  returning *;
`;

const POSTCONFERENCE = `
  insert into
    conferences (  
      conference_date,
      conference_type,
      organizer_id,
      category_id,
      sub_category_id
    )
  values
    (
      to_timestamp($1 / 1000.0),
      $2,
      $3,
      $4,
      $5
    )
  returning *;
`;

const POSTCONFERENCELINK = `
  insert into
    conference_links (  
      conference_link,
      conference_id
    )
  values
    (
      $1,
      $2
    )
  returning *; 
`;

const POSTCONFERENCEPOST = `
  insert into
    posts (  
      post_title,
      post_description,
      conference_id
    )
  values
    (
      $1,
      $2,
      $3
    )
  returning *; 
`;

const POSTCONFERENCEPOSTBODY = `
  insert into
    post_bodys (  
      post_body_text,
      post_id
    )
  values
    (
      $1,
      $2
    )
  returning *; 
`;

const PUTSTATUS = `
  update conferences set status = $2
  where
    conference_id = $1 and
    status = 'waiting'
  returning *;
`;

export default {
  GET,
  POSTORGANIZER,
  POSTORGANIZATION,
  POSTCONFERENCE,
  POSTCONFERENCELINK,
  POSTCONFERENCEPOST,
  POSTCONFERENCEPOSTBODY,
  PUTSTATUS,
};
