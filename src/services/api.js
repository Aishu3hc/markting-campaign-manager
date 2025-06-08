import axios from 'axios';


export const getCampaigns = () => axios.get('/api/campaigns');


export const getCampaignById = (id) => axios.get(`/api/campaigns/${id}`);
