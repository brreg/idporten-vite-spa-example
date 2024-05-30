import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

// Define an interface for the company data
interface Company {
  partyId: number;
  partyUuid: string;
  partyTypeName: number;
  orgNumber: string;
  ssn: string | null;
  unitType: string;
  name: string;
  isDeleted: boolean;
  onlyHierarchyElementWithNoAccess: boolean;
  person: any | null;
  organization: any | null;
  childParties: any[];
}

const UserPage: React.FC = () => {
  const auth = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.user?.access_token) {
      fetch(`http://localhost:8080/api/v1/company`, {
        headers: new Headers({
          'Authorization': `Bearer ${auth.user?.access_token}`,
          'Content-type': 'application/json'
        }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json(); // Parse the response body as JSON
      })
      .then((data: Company[]) => {
        console.log(data)
        setCompanies(data); // Set the fetched data to state
      })
      .catch(error => {
        setError('There was a problem with the fetch operation');
      });
    }
  }, [auth.user?.access_token]);

  return (
    <div>
      {error && <div>{error}</div>}
      <ul>
        {companies.map(company => (
          <li key={company.partyUuid}>
            {company.name} (Org Number: {company.orgNumber})
            <button onClick={() => window.location.href = `/lpid?partyId=${company.partyId}`}>
              Get LPID
            </button>
          </li>
        ))}
      </ul>
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

export default UserPage;
