import axios from 'axios';
const endpoint = 'https://s3-us-west-2.amazonaws.com/anchor-website/challenges/bsb.json';

const getMedia = async () => {
  try {
    const media = await axios.get(endpoint); 
    return media;
  } catch (e) {
    console.error(e);
  }
}

export default getMedia;
