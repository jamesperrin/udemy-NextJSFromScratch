import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
  await connectDB();

  const locationPattern = new RegExp(location, 'i');

  // Match location pattern against database fields
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  // Only check for property if its not 'All'
  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializeableObject);
  console.log(properties);

  return (
    <>
      <section className="font-bold">Search Results</section>
    </>
  );
};
export default SearchResultsPage;
