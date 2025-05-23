import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <div className="CompanyCard">
      <h3>
      <Link to={`/companies/${handle}`}>{name}</Link>
      </h3>
      {logoUrl && <img src={logoUrl} alt={`${name} logo`} width={80} />}
      <p>{description}</p>
    </div>
  );
}

export default CompanyCard;