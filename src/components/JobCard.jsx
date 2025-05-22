import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import JoblyAPI from "../API/JoblyAPI";

function JobCard({ id, title, salary, equity, companyName }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(
    currentUser?.applications?.includes(id)
  );
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    setLoading(true);
    try {
      await JoblyAPI.applyToJob(currentUser.username, id);
      setApplied(true);
      // Update user context with new application
      setCurrentUser({
        ...currentUser,
        applications: [...(currentUser.applications || []), id],
      });
    } catch (err) {
      // Handle error
    }
    setLoading(false);
  }

  return (
    <div className="JobCard">
      <h3>{title}</h3>
      <p>Company: {companyName}</p>
      <p>Salary: {salary ? `$${salary}` : "N/A"}</p>
      <p>Equity: {equity ? equity : "N/A"}</p>
      {applied ? (
        <button disabled>Applied</button>
      ) : (
        <button onClick={handleApply} disabled={loading}>
          {loading ? "Applying..." : "Apply"}
        </button>
      )}
    </div>
  );
}

export default JobCard;