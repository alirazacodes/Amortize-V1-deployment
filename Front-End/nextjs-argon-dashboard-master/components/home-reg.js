import { v4 as uuid } from 'uuid';
// import { userSession } from './auth';
import { userSession } from "../pages/_app";
import { Storage } from '@stacks/storage';

const HOMEINFO_TABLE = 'HOMEINFO_TABLE.json';

export async function saveHomeInfo(homeinfo)
{
  const storage = new Storage({ userSession });
  return await storage.putFile(HOMEINFO_TABLE, JSON.stringify({ homeinfo }));
}

export const defaultHomeInfo = 
{
    Address: "",
    Phone: "",
    Zipcode: "",
    City: "",
    Estate: "",
    id: uuid(),
};

export async function fetchHomeInfo()
{
  const storage = new Storage({ userSession });
  try {
    
    const homeInfoJSON = await storage.getFile(HOMEINFO_TABLE);
    if (homeInfoJSON) {
      const json = JSON.parse(homeInfoJSON);
      return json.homeinfo;
    }
  } catch (error) {
    return defaultHomeInfo;
  }
}


