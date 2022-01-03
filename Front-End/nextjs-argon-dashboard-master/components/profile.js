import { v4 as uuid } from 'uuid';
// import { userSession } from './auth';
import { userSession } from "../pages/_app";
import { Storage } from '@stacks/storage';

const USERINFO_TABLE = 'USERINFO_TABLE.json';

export async function saveUserInfo(userinfo)
{
  const storage = new Storage({ userSession });
  return await storage.putFile(USERINFO_TABLE, JSON.stringify({ userinfo }));
}

export const defaultUserInfo = 
{
    Username: "",
    EmailAddress: "",
    FirstName: "",
    LastName: "",
    id: uuid(),
};

export async function fetchUserInfo()
{
  const storage = new Storage({ userSession });
  try {
    
    const userInfoJSON = await storage.getFile(USERINFO_TABLE);
    if (userInfoJSON) {
      const json = JSON.parse(userInfoJSON);
      return json.userinfo;
    }
  } catch (error) {
    return defaultUserInfo;
  }
}


