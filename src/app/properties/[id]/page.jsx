import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyHeaderImage from '@/componets/PropertyHeaderImage';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const PropertyPage = async ({ params }) => {
  // Dynamic APIs are Asynchronous
  // See: https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;

  await connectDB();
  const property = await Property.findById(id).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
            title="Go back to properties listing">
            <FaArrowLeft className="mr-2" />
            &nbsp;Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">{`Property Info`}</div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
