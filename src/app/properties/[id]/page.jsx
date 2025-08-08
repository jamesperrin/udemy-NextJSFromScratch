const PropertyPage = async ({ params }) => {
  // Dynamic APIs are Asynchronous
  // See: https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;

  return <div>Propety Page -- id {id}</div>;
};

export default PropertyPage;
