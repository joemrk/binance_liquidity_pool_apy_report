import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

class Binance {
  constructor() {
    this.instans = axios.create({
      baseURL: process.env.BINANCE_PAIR_LIST_URL
    });
  }

  async fetchList() {
    const list = [];
    const request = async (p) => {
      return (await this.instans.get('', {
        params: {
          pageSize: 100,
          pageIndex: p
        }
      })).data.data;
    }
    
    try {
      const { data } = await this.instans.get('', {
        params: {
          pageSize: 100,
        }
      })
    
      if(data.data.length) {
        list.push(...data.data);
      }
  
      if(data.total > 100) {
        const promises = [];
        const pages = Math.ceil(data.total / 100);
        for (let i = 2; i < pages; i++) {
          promises.push(request(i));
        }
  
        const promisesResult = await Promise.all(promises);
        promisesResult.forEach((r) => { list.push(...r) });
      }
  
    } catch (error) {
      console.error(error);
    }
  
    return list;
  }

  async getAll() {
    const fetch = await this.fetchList();

    return fetch.map((l) => ({
      poolName: l.poolName,
      apy: ((Number(l.apyComposition.feeRatio) + Number(l.apyComposition.tokenRewardList[0].ratio)) * 100)
        .toFixed(2)
        .replace('.', ',')
    }));
  }
}

export default Binance;