import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome</h1>
      <Link href="/properties/1">Go To Properties</Link>
    </div>
  );
};

export default HomePage;
