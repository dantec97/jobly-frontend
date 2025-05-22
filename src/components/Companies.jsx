import React, { useEffect, useState } from "react";
import JoblyAPI from "../API/JoblyAPI";
import CompanyList from "./CompanyList"; 

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function searchCompanies(name) {
    setLoading(true);
    try {
        // If name is provided, search for companies with that name
      const result = await JoblyAPI.getCompanies(name ? { name } : {});
      setCompanies(result);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchCompanies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Companies</h1>
      <CompanyList companies={companies} onSearch={searchCompanies} />
    </div>
  );
}

export default Companies;