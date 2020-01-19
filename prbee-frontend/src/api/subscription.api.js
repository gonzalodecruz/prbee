import axios from '../axios';

const getSchema = () => axios.get('/subscription/schema');

const saveSchema = (schema) => axios.put('/subscription', { schema });

export default {
  getSchema,
  saveSchema,
};
