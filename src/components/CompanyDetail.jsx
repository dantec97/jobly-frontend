import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyAPI from "../API/JoblyAPI";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      const result = await JoblyAPI.getCompany(handle);
      setCompany(result);
      setLoading(false);
    }
    fetchCompany();
  }, [handle]);

  if (loading) return <div>Loading...</div>;
  if (!company) return <div>Company not found.</div>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <p>Number of employees: {company.numEmployees}</p>
    </div>
  );
}

export default CompanyDetail;