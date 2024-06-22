import useAxiosPrivate from './useAxiosPrivate';

const useServerMetrics = () => {
  const axiosPrivate = useAxiosPrivate();
  const URL_METRICS = '/dashboard/metrics/retrieve';

  const loaderMetrics = () => {
    return axiosPrivate
      .get(URL_METRICS)
      .then((response) => {
        if (response?.status === 200) {
          return { metrics: response.data };
        }
        return { message: response.statusText, status: response.status };
      })
      .catch((error) => {
        return { message: error.message, status: error.code };
      });
  };

  return loaderMetrics;
};

export default useServerMetrics;
