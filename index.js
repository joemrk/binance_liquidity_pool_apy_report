import Binance from './binance.js';
import dotenv from 'dotenv';
import Sheets from './sheets.js';

dotenv.config();

(async () => {

  const shhet = new Sheets(process.env.GSHEET_ID, process.env.GSHEET_GID)
  await shhet.auth();
  await shhet.loadInfo();

  const binance = new Binance();
  
  const headers = await shhet.getHeaders();
  const liquidityList = await binance.getAll();

  const newRow = headers.reduce((acc, cur) => {
    const poll = liquidityList.find((p) => p.poolName === cur)
    if(poll){
      return {...acc, [cur]: poll.apy };
    }
  }, {})

  const date = new Date().toISOString().split('T')[0]
  const newRowWitDate = { ...newRow, DATE: date }

  await shhet.addRow(newRowWitDate);

})();