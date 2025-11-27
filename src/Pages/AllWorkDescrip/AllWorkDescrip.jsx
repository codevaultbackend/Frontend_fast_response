import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllWorkDescrip() {
  const { workId } = useParams();
  const Token = localStorage.getItem("authToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWork = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/getAllWorkadmin`, {
          headers: { Authorization: `Bearer ${Token}` },
        });

        if (res.data.success) {
          const works = res.data.work || [];
          const selectedJob = works.find((item) => item._id === workId);
          setJob(selectedJob || null);
        }
      } catch (err) {
        console.error("Error fetching works:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWork();
  }, [apiUrl, Token, workId]);

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Work not found!</p>;

  return (
    <div className="AllWorkDescrip" style={{ padding: "20px" }}>
      <h1 className="text-center text-[32px] my-[20px] text-[var(--primary-color)]">Work Details</h1>
      <div className="section-wrapper grid grid-cols-3 max-[600px]:grid-cols-2 max-[1000px]:grid-cols-2 gap-[15px] max-w-[1280px] mx-auto">
        <section className="shadow-2xl p-[10px] rounded-[4px]">
          <p> {job.serviceType}</p>
          <p> {job.description}</p>
          <p> {job.location}</p>
          <p> {job.status}</p>
          <p> {job.publicStatus}</p>
          <p> ${job.serviceCharge}</p>
          <p> {job.token}</p>
          {job.issueCount > 0 && (
            <p>
              <strong>Issue Count:</strong> {job.issueCount}
            </p>
          )}
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(job.createdAt).toLocaleString()}
          </p>
          {job.startedAt && (
            <p>
              <strong>Started At:</strong>{" "}
              {new Date(job.startedAt).toLocaleString()}
            </p>
          )}
          {job.completedAt && (
            <p>
              <strong>Completed At:</strong>{" "}
              {new Date(job.completedAt).toLocaleString()}
            </p>
          )}
        </section>

        <section className="shadow-2xl p-[10px] rounded-[4px]">
          <h2>Client Info</h2>
          {job.client ? (
            <>
              <p>
                {" "}
                {job.client.firstName || ""} {job.client.lastName || ""}
              </p>
              <p> {job.client.email || "N/A"}</p>
              <p> {job.client.phone || "N/A"}</p>
              <p> {job.client.location || "N/A"}</p>
            </>
          ) : (
            <p>No client info available</p>
          )}
        </section>

        <section className="shadow-2xl p-[10px] rounded-[4px]">
          <h2>Assigned Technician</h2>
          {job.assignedTechnician ? (
            <>
              <p>
                {" "}
                {job.assignedTechnician.firstName}{" "}
                {job.assignedTechnician.lastName}
              </p>
              <p> {job.assignedTechnician.email}</p>
              <p> {job.assignedTechnician.phone}</p>
              <p> {job.assignedTechnician.location}</p>
            </>
          ) : (
            <p>No technician assigned</p>
          )}
        </section>

        <section className="shadow-2xl p-[10px] rounded-[4px]">
          <h2>Payment</h2>
          <p>
            <strong>Method:</strong> {job.payment.method || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {job.payment.status}
          </p>
          {job.payment.confirmedBy && (
            <p>
              <strong>Confirmed By:</strong> {job.payment.confirmedBy}
            </p>
          )}
          {job.payment.confirmedAt && (
            <p>
              <strong>Confirmed At:</strong>{" "}
              {new Date(job.payment.confirmedAt).toLocaleString()}
            </p>
          )}
          {job.payment.paidAt && (
            <p>
              <strong>Paid At:</strong>{" "}
              {new Date(job.payment.paidAt).toLocaleString()}
            </p>
          )}
        </section>


        <section className="shadow-2xl p-[10px] rounded-[4px]">
          <h2>Photos</h2>
          {job.beforephoto && (
            <img
              src={job.beforephoto}
              alt="Before Work"
              style={{ width: "300px", marginRight: "10px" }}
            />
          )}
          {job.afterphoto && (
            <img
              src={job.afterphoto}
              alt="After Work"
              style={{ width: "300px" }}
            />
          )}
        </section>

        {job.issues?.length > 0 && (
          <section className="shadow-2xl p-[10px] rounded-[4px]">
            <h2>Issues</h2>
            <ul>
              {job.issues.map((issue) => (
                <li key={issue._id}>
                  <p>
                    <strong>Type:</strong> {issue.issueType}
                  </p>
                  <p>
                    <strong>Remarks:</strong> {issue.remarks}
                  </p>
                  <p>
                    <strong>Status:</strong> {issue.status}
                  </p>
                  <p>
                    <strong>Raised At:</strong>{" "}
                    {new Date(issue.raisedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {job.invoice?.usedMaterials?.length > 0 && (
          <section className="shadow-2xl p-[10px] rounded-[4px]">
            <h2>Used Materials</h2>
            <ul>
              {job.invoice.usedMaterials.map((material, idx) => (
                <li key={idx}>{material}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default AllWorkDescrip;
