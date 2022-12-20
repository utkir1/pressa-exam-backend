const GET = `
  select
    distinct o.organizer_name
  from
    organizers as o;
`;

export default { GET };
