import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

interface ResponseObject {
  "lpid-offer-url": string;
  "company-name": string;
  "company-orgnr": string;
  "company-is-deleted": boolean;
  "lpid-generated-sucessfully": boolean;
}

const LpidPage: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const [data, setData] = useState<ResponseObject>({} as ResponseObject);
  const [error, setError] = useState<string | null>(null);

  // Helper function to extract query parameters
  const getQueryParams = (query: string) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const partyId = queryParams.get('partyId');

    if (partyId && auth.user?.access_token) {
      fetch(`http://localhost:8080/api/v1/lpid`, {
        headers: new Headers({
          'Authorization': `Bearer ${auth.user.access_token}`,
          'Party': `partyid:${partyId}`,
          'Content-type': 'application/json'
        }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json(); // Parse the response body as JSON
      })
      .then((data) => {
        setData(data); // Set the fetched data to state
      })
      .catch(error => {
        setError('There was a problem with the fetch operation');
      });
    } else {
      setError('No partyId provided in the query parameters or user is not authenticated');
    }
  }, [location.search, auth.user?.access_token]);

  return (
    <div>
      {error && <div>{error}</div>}
      {data && data['lpid-offer-url']}
      <br />
      <br />
      <button onClick={() => {
        void auth.removeUser();
        void auth.signoutRedirect();
      }}
      >
        Log out
      </button>
    </div>
  );
};

export default LpidPage;
