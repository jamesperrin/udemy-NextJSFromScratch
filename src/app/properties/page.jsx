import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Pagination from '@/components/Pagination';

const PropertiesPage = async ({ searchParams }) => {
  // Dynamic APIs are Asynchronous
  // See: https://nextjs.org/docs/messages/sync-dynamic-apis
  let { page } = await searchParams;
  page = parseInt(page) || 1;
  page = page > 0 ? page : 1;

  const pageSize = 9;
  const skip = (page - 1) * pageSize;

  await connectDB();

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

  // Calculate if pagination is needed
  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />}
      </div>
    </section>
  );
};

export default PropertiesPage;
