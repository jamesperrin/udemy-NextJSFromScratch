import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';
import Formatter from '@/utils/Formatter';

const PropertyCard = ({ property }) => {
  const squareFeet = new Intl.NumberFormat().format(property.square_feet);

  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${Formatter.formatMoney(rates.monthly)}/mo`;
    } else if (rates.weekly) {
      return `${Formatter.formatMoney(rates.weekly)}/wk`;
    } else if (rates.nightly) {
      return `${Formatter.formatMoney(rates.nightly)}/night`;
    }
  };

  const getRateNames = Object.keys(property.rates).map(
    (item) => `${item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}`,
  );

  const getRateNamesDisplay = () => {
    return getRateNames.map((rate) => {
      return (
        <p key={rate}>
          <FaMoneyBill className="md:hidden lg:inline" />
          &nbsp;{rate}
        </p>
      );
    });
  };

  return (
    // <!-- Listing 1 -->
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property._id}`} title={`View ${property.name} property`}>
        <Image
          src={property.images[0]}
          width="0"
          height="0"
          sizes="100vw"
          alt={`View ${property.name}`}
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" />
            &nbsp;
            {property.beds}&nbsp;<span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" />
            &nbsp;
            {property.baths}&nbsp;<span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            &nbsp;
            {squareFeet}&nbsp;
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">{getRateNamesDisplay()}</div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {property.location.city}&nbsp;{property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            title={`View ${property.name} property`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
