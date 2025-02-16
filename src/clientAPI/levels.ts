const serverIP = "/api/levels";

const getLevelByDate = async (date: Date) => {
  try {
    const response = await fetch(`${serverIP}/${date}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    const level = await response.json();
    return level;
  } catch (error) {
    console.error("Error fetching levels:", error);
    throw error; // Optionally re-throw the error if you want to handle it later
  }  
}
const getLevels = async () => {
  try {
    const response = await fetch(`${serverIP}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    const levels = await response.json();
    return levels;
  } catch (error) {
    console.error("Error fetching levels:", error);
    throw error; // Optionally re-throw the error if you want to handle it later
  }  
}

export { getLevelByDate, getLevels };
