import React, { useState, useEffect } from "react";
import axios from "axios";

const Tablelist = ({ handleOpen, searchTerm }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/clients/");
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredData = data.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client ?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/api/clients/delete/${id}`);
        setData((prevData) => prevData.filter((client) => client.id !== id));
      } catch (error) {
        console.error("Error deleting client", error);
        setError(error);
      }
    }
  };

  return (
    <>
      {error && <div className=" alert alert-error">{error}</div>}
      <div className="overflow-x-auto mt-6">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="hover">
            {filteredData.map((client) => (
              <tr key={client.id}>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>{client.isactive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="btn btn-success rounded-lg"
                    onClick={() => handleOpen("edit", client)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error ml-3"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tablelist;
