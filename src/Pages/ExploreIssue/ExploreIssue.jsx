import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ExploreIssue() {
  const { workId } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(false);

  const Token = localStorage.getItem("authToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWorkFromIssues = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/getallissue`, {
          headers: { Authorization: `Bearer ${Token}` },
        });

        if (res.data.success && res.data.issues?.length > 0) {
          const foundWork = res.data.issues.find(
            (issue) => issue.workId === workId
          );
          if (foundWork) setWork(foundWork);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkFromIssues();
  }, [workId, Token, apiUrl]);

  const handleResolveIssue = async () => {
    if (!work) return;
    setResolving(true);

    try {
      const res = await axios.post(
        `${apiUrl}/api/issue-resolve`,
        {
          workId: work.workId,
          issueId: work.issueId,
        },
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );

      if (res.data.success) {
        setWork((prev) => ({
          ...prev,
          workStatus: "Resolved",
        }));
      }
    } catch (error) {
      console.error("Resolve issue failed:", error);
    } finally {
      setResolving(false);
    }
  };

  // --------------------------------------
  // UI
  // --------------------------------------
  if (loading) return <p>Loading...</p>;

  if (!work)
    return (
      <div className="max-w-[800px] mx-auto p-4">
        <p>Work not found.</p>
        <Link to="/adminDashboard/issues" className="text-blue-600 underline">
          Back to all issues
        </Link>
      </div>
    );

  return (
    <div className="issue-detail max-w-[800px] mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Work Details</h2>

      <p>
        <strong>Client:</strong> {work.client.firstName} {work.client.lastName}
      </p>
      <p>
        <strong>Phone:</strong> {work.client.phone}
      </p>
      <p>
        <strong>Service:</strong> {work.serviceType}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="font-semibold">{work.workStatus}</span>
      </p>

      {/* ─────────────── Issue Details ─────────────── */}
      <h3 className="text-xl font-semibold mt-4">Issue Details</h3>
      <div className="border p-2 rounded mb-2">
        <p>
          <strong>Type:</strong> {work.message || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {work.workStatus}
        </p>
        <p>
          <strong>Raised At:</strong>{" "}
          {new Date(work.raisedAt).toLocaleString()}
        </p>
      </div>

      {work.technician && (
        <p>
          <strong>Technician:</strong> {work.technician.firstName}{" "}
          {work.technician.lastName}
        </p>
      )}

      <button
        onClick={handleResolveIssue}
        disabled={resolving}
        className={`mt-4 py-2 px-4 rounded text-white ${
          resolving
            ? "bg-gray-500 cursor-wait"
            : "bg-green-700 hover:bg-green-800"
        }`}
      >
        {resolving ? "Resolving..." : "Mark Resolved"}
      </button>

      <br />

      <Link
        to="/adminDashboard/issues"
        className="text-blue-600 underline mt-4 inline-block"
      >
        Back to all issues
      </Link>
    </div>
  );
}

export default ExploreIssue;
