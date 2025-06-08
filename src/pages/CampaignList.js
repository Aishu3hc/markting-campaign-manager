import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CampaignList.css";

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Active",
    platform: "",
    budget: ""
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = () => {
    axios.get("http://localhost:5000/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/campaigns", formData)
      .then(() => {
        setFormData({
          name: "",
          startDate: "",
          endDate: "",
          status: "Active",
          platform: "",
          budget: ""
        });
        fetchCampaigns();
      })
      .catch((err) => console.error(err));
  };
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <form className="add-campaign-form" onSubmit={handleSubmit}>
        <h2>Add New Campaign</h2>
        <div className="form-grid">
          <label>
            Campaign Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Start Date:
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </label>
          <label>
            End Date:
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Platform:
            <input type="text" name="platform" value={formData.platform} onChange={handleChange} />
          </label>
          <label>
            Budget:
            <input type="number" name="budget" value={formData.budget} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Add Campaign</button>
      </form>

      <div className="campaign-list">
        <h2>All Campaigns</h2>
        <ul>
      {campaigns.map((campaign) => (
        <li
          key={campaign._id}
          className="campaign-item"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/shopping")}
        >
          <h3>{campaign.name}</h3>
          <p><strong>Platform:</strong> {campaign.platform}</p>
          <p><strong>Budget:</strong> ₹{campaign.budget}</p>
          <p><strong>Status:</strong> {campaign.status}</p>
          <p><strong>Duration:</strong> {campaign.startDate?.slice(0, 10)} to {campaign.endDate?.slice(0, 10)}</p>
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
}

export default CampaignList;
