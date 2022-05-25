import React from "react";
import Loader from "./Loader";
import { getTrainerStats } from "./services/trainer.servise";

const Stats = () => {
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState([]);

  const fetchStats = async () => {
    setLoading(true);
    const res = await getTrainerStats();
    console.log(res);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <div>Stats</div>;
};

export default Stats;
