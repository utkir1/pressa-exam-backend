select
  to_json(res)
from
  (
    select
      c .conference_id,
      c .conference_date,
      c .conference_type,
      c .status,
      to_json(o) "organizer",
      to_json(p) "post"
    from
      conferences c
      inner join (
        select
          o.organizer_id,
          o.organizer_name,
          o.organizer_profession
        from
          organizers o
      ) as o 
      on c .organizer_id = o.organizer_id
      inner join (
        select
          p.post_id,
          p.post_title,
          p.conference_id,
          i.post_image_link
        from
          posts p
          inner join post_images as
           i on p.post_id = i.post_id
      ) as
       p on p.conference_id = c .conference_id
    where
      c .status = 'active'
  ) res;

select
  c .category_id,
  c .category_name,
  json_agg(s. *) as sub_categories
from
  categories as c
  left join (
    select
      s.sub_category_id,
      s.sub_category_name,
      s.category_id
    from
      sub_categories as s
  ) as s 
  on s.category_id = c .category_id
where
  c .status = 'active'
group by
  c .category_id;
insert into
  categories(category_name)
values
  ($1) returning *;
update
  categories
set
  category_name = $2
where
  category_id = $1 
returning *;