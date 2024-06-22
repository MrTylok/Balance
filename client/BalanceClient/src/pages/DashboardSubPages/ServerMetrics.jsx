import './ServerMetrics.css';
import { Link } from 'react-router-dom';
import MetricCard from '../../components/DashboardComponents/MetricCard';
import useServerMetrics from '../../hooks/useServerMetrics';
import { useEffect, useState } from 'react';

function ServerMetrics() {
  const serverMetricsLoader = useServerMetrics();

  const [metricsRetrived, setMetricsRetrieved] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState(undefined);
  //TODO: implement refresh function AFTER implementing loader
  const handleRefreshMetrics = () => {
    console.log('refreshing');
  };

  useEffect(() => {
    setMetricsRetrieved(false);
    serverMetricsLoader().then((result) => {
      if (result?.metrics) {
        setMetrics(result?.metrics);
      } else {
        setError(result.message + ' ' + result.status);
      }

      setMetricsRetrieved(true);
    });

    return () => {
      setMetrics([]);
      setError('');
      setMetricsRetrieved(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshLink = (
    <Link
      to={'#'}
      onClick={handleRefreshMetrics}
    >
      here
    </Link>
  );

  const metricsLoading = () => {
    return (
      <div className="metrics-loading">
        <p>Loading</p>
      </div>
    );
  };

  const metricsLoaded = (metrics, error) => {
    if (error)
      return (
        <div className="metrics-body-div">
          <p>{error}</p>
        </div>
      );
    else {
      return (
        <div className="metrics-body-div">
          {metrics.map((el, idx) => {
            return (
              <MetricCard
                key={idx}
                metric={el.metric}
                info={el.info}
                value={el.value}
              />
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="metrics-main-div">
      <div className="metrics-header-div">
        <h2>Server Metrics</h2>
        <h4>Not updated live, click {refreshLink} to update</h4>
      </div>
      {!metricsRetrived ? metricsLoading() : metricsLoaded(metrics, error)}
    </div>
  );
}

export default ServerMetrics;
