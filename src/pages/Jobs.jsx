import React, { useEffect, useState } from "react";
import JobList from "../components/JobList";
import joblyApi from "../API/JoblyAPI";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function searchJobs(title) {
    setLoading(true);
    try {
      const response = await joblyApi.getJobs(title ? { title } : {});
      setJobs(response);
    } catch (error) {
      console.error("Error searching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Jobs</h1>
      <JobList jobs={jobs} onSearch={searchJobs} />
    </div>
  );
}

export default Jobs;