'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

const PropertyEditButton = ({ property }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When session check finishes, mark loading as false
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  if (!session) {
    return;
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Link
      href={`/properties/${property._id}/edit`}
      className="bg-amber-500 hover:bg-amber-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      title={`Edit ${property.name} property`}>
      <FaPencilAlt className="mr-2" /> Edit
    </Link>
  );
};

export default PropertyEditButton;
