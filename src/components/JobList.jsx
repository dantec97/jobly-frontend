import React, { useState } from "react";
import JobCard from "./JobCard";

function JobList({ jobs, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map(j => (
          <JobCard
            key={j.id}
            id={j.id}
            title={j.title}
            salary={j.salary}
            equity={j.equity}
            companyName={j.companyName}
          />
        ))
      )}
    </div>
  );
}

export default JobList;