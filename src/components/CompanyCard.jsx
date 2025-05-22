import React from "react";

function CompanyCard({ name, description, logoUrl }) {
  return (
    <div className="CompanyCard">
      <h3>{name}</h3>
      {logoUrl && <img src={logoUrl} alt={`${name} logo`} width={80} />}
      <p>{description}</p>
    </div>
  );
}

export default CompanyCard;