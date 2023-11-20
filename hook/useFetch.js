import { useState, useEffect } from "react";
import axios from "axios"; 
import { RAPID_API_KEY } from '@env';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query }
  };

  console.log(RAPID_API_KEY)
  // 'X-RapidAPI-Key': '85cf506f5cmsh30f5278b0abbc1cp18d7f7jsnee041b84c310',

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      console.log("Esta es la response del fetch de mierda: ", response.data.data)
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        console.log('Server response error:', error.response.data);
        alert('There is an error: ' + error.response.data);
      } else if (error.request) {
        setError("The server did not respond");
        console.log('No response from server');
        alert('The server did not respond');
      } else {
        setError(error)
        console.log('Other error occurred:', error.message);
        alert('There is an error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
