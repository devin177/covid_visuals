import axios from 'axios';

export default async function getData(req, res) {
  try {
    const result = await axios.get("https://api.covidtracking.com/v1/states/ca/current.json");
    console.log(result.data);
    res.json("hello");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}
