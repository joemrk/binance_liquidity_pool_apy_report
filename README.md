# binance_liquidity_pool_apy_report
Take binance liquidity pool apys and push it to google sheet

---

use lib google-spreadsheet [npm](https://www.npmjs.com/package/google-spreadsheet) 
[lib](https://theoephraim.github.io/node-google-spreadsheet/#/)

create project on [google cloud](https://console.cloud.google.com/apis/dashboard) </br>

prepare `credentials.json` file by [instruction](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication) </br>

create google sheet like this  </br>
![image](https://user-images.githubusercontent.com/42858950/189502400-d61e7065-4c09-4f70-ab98-7750aaae98d7.png)

in table header write liquidity pairs from [binance](https://www.binance.com/en/swap/pool) and `DATE` in A1 it`s column for dates </br>
take sheet id from url 
![image](https://user-images.githubusercontent.com/42858950/189502539-48be3a6a-dbd1-42ad-a427-8fe63ef22260.png) </br>
and grid id if u use not main grid ![image](https://user-images.githubusercontent.com/42858950/189502557-6a9724e3-0ad5-43fa-881b-92b4474362b6.png)
by default grid id = 0

set it to ```.env```

---

### work steps

1. parse sheet`s header (first row) for take pool symbols
2. do request to binance for take all pairs and calculate apy
3. map headers with binance data
4. push row to google sheet

---

result like this

![image](https://user-images.githubusercontent.com/42858950/189502744-c764f049-bc96-41fa-ad10-0f4acf2d7d87.png)

