import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage = async ({ searchParams }) => {
  // Dynamic APIs are Asynchronous
  // See: https://nextjs.org/docs/messages/sync-dynamic-apis
  let { page } = await searchParams;
  page = parseInt(page) || 1;
  page = page > 0 ? page : 1;

  const pageSize = 2;

  await connectDB();
  const skip = (page - 1) * pageSize;
  const totalProperties = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

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
      </div>
    </section>
  );
};

export default PropertiesPage;
