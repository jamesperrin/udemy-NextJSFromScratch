'use client';



const Delay = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('--- Delaying...');
    }, 200000);

    return () => {
      setLoading(false);
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <p>Delayed</p>
    </>
  );
};

export default Delay;
