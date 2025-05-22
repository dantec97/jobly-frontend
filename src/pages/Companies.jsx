import React, { useEffect, useState } from 'react';
import CompanyList from '../components/CompanyList';
import joblyApi from '../API/JoblyAPI';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function searchCompanies(name) {
    setLoading(true);
    try {
      const response = await joblyApi.getCompanies(name ? { name } : {});
      setCompanies(response);
    } catch (error) {
      console.error("Error searching companies:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Companies</h1>
      <CompanyList companies={companies} onSearch={searchCompanies} />
    </div>
  );
}

export default Companies;