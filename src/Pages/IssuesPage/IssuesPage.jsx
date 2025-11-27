import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IssuesPage() {
  const [loading, setLoading] = useState(true);
  const [allIssues, setAllIssues] = useState([]);
  const [newIssues, setNewIssues] = useState([]);

  const Token = localStorage.getItem("authToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleResolveIssue = async (workId, issueId) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/issue-resolve`,
        { workId, issueId },
        { headers: { Authorization: `Bearer ${Token}` } }
      );

      if (res.data.success) { 
        setNewIssues((prev) =>
          prev.filter((issue) => issue.issueId !== issueId)
        );
      }
    } catch (error) {
      console.error("Resolve error:", error);
    }
  };

  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/getallissue`, {
          headers: { Authorization: `Bearer ${Token}` },
        });

        if (res.data.success) {
          setAllIssues(res.data.issues || []);
          console.log(allIssues)
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllIssues();
  }, [Token, apiUrl]);

  useEffect(() => {
    const fetchNewIssues = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/getnewissue`, {
          headers: { Authorization: `Bearer ${Token}` },
        });

        if (res.data.success) {
          setNewIssues(res.data.issues || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewIssues();
  }, [Token, apiUrl]);

  if (loading)
    return (
      <p className="text-center min-h-[100vh] flex items-center justify-center">
        Loading...
      </p>
    );

  return (
    <div className="IssuesPage">
      <div className="IssuesPage-wrapper max-w-[1280px] mx-auto p-4">
   
        <h2 className="text-2xl font-semibold my-6">New Issues</h2>

        {newIssues.length === 0 ? (
          <p>No new issues found.</p>
        ) : (
          newIssues.map((issue) => (
            <div
              key={issue.issueId}
              className="issue-box flex justify-between  p-4 mb-4 rounded-lg  shadow-[1px_1px_4px_1px_#57595B] relative"
            >
              <div className="left-bar">
                {issue.technician && (
                  <p className="text-[16px] font-semibold text-[var(--primary-color)]">
                    {issue.technician.firstName} {issue.technician.lastName}
                  </p>
                )}
                <p className="text-[13px] font-bold text-[var(--primary-color)]">
                  {issue.client.phone}
                </p>
                <p className="text-[13px] mt-[5px] font-bold text-gray-700">
                  {issue.serviceType}
                </p>
                <p className="text-[11px] font-bold text-gray-700 mt-[2px]">
                  {issue.message || "No message"}
                </p>
              </div>

              <div className="right-bar">
                <p className="absolute top-0 right-0 bg-green-700 text-white p-[2px] text-[12px] rounded-[3px]">
                  {issue.workStatus}
                </p>
                <div className="eta flex flex-col gap-2">
                  <button
                    onClick={() =>
                      handleResolveIssue(issue.workId, issue.issueId)
                    }
                    className="bg-green-600 text-white py-1 px-3 rounded text-[13px]"
                  >
                    Mark Resolved
                  </button>

                  <Link to={`/adminDashboard/issues/${issue.workId}`}>
                    <button className="bg-[var(--primary-color)] text-white py-1 px-3 rounded mt-[5px] text-[13px] font-semibold">
                      View Work
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

        <h2 className="text-2xl font-semibold my-4">All Issues</h2>

        {allIssues.length === 0 ? (
          <p>No issues found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-[600px]:grid-cols-1 max-[1000px]:grid-cols-2">
            {allIssues.map((issue) => (
              <div
                key={issue.issueId}
                className="issue-box flex justify-between  p-4 mb-4 rounded-lg  shadow-[1px_1px_4px_1px_#57595B] relative"
              >
                <div className="left-row mb-3">
                  <p>
                    {issue.client.firstName} {issue.client.lastName}
                  </p>
                  <p>{issue.client.phone}</p>
                  <p>{issue.serviceType}</p>
                </div>

                <div className="right flex flex-col gap-2">
                  <p>
                    <strong>Issue:</strong> {issue.message || "No message"}
                  </p>
                  <p>
                    <strong>Status:</strong> {issue.workStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default IssuesPage;
