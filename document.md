# NOWapis (v3api)

提供給 mobile, app, 甚至於一般網站使用的 api 端點

##  NOWapis 系統資訊

Node.js 版本: v6.4.0

##  執行方式

先確認是否有在 Server 安裝 `pm2` 這個 module，本機端則不用安裝

### NOWapis

NOWnews api 端點

#### 主程式

`./bin/api.js`

#### 啟動方式

Server: `NODE_ENV=production pm2 start bin/api.js -i max --name 'NOWapis'`

dev: `npm run api`

### Cron Job

每  3 分鐘撈取一些資料當作 cache

#### 主程式

`./cron.js`

#### 啟動方式

Server: `NODE_ENV=production pm2 start cron.js --name 'NOWapis-cron'`

dev: `npm run cron`

## NOWapis 端點


### `GET` /category/news

取得所有新聞大分類資料

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "_id": 419883,
    "_type": "taxonomy_term",
    "_bundle": "main_category",
    "tid": 419883,
    "vid": 14,
    "name": "政治",
    "weight": 0
  },
  {
    "_id": 419884,
    "_type": "taxonomy_term",
    "_bundle": "main_category",
    "tid": 419884,
    "vid": 14,
    "name": "財經",
    "weight": 0
  },
  .....
  .....
]
```

### `GET` /category/news/{:taxId}

取得某個新聞分類的所有新聞列表

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| taxId | 某個分類的 taxId | String | √ | `/category/news/419883` |

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "_id": 2214630,
    "title": "台中港漢光聯合反登陸操演　首加入空勤總隊直升機",
    "created": 1471940365,
    "field_release_date": {
      "value": 1471941315
    },
    "field_short_title": {
      "value": "漢光實兵操演　首度加入空勤直升機"
    },
    "field_main_category": {
      "tid": 419883
    },
    "image": {
      "title": "國軍第五作戰區「漢光32號」演習23日在台中港進行實兵作戰演練， M60A3坦克戰車（圖）執行地面掃蕩，展現強大打擊與機動力。中央社記者廖壬楷攝　105年8月23日",
      "description": "國軍第五作戰區「漢光32號」演習23日在台中港進行實兵作戰演練， M60A3坦克戰車（圖）執行地面掃蕩，展現強大打擊與機動力。中央社記者廖壬楷攝　105年8月23日",
      "uri": "hash://20160823126.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/45/01/4501e36ea99a0b10ad089cf76c33e0c6.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/45/01/4501e36ea99a0b10ad089cf76c33e0c6.jpg"
    },
    "category": "政治",
    "createdAt": "2016/08/23 16:19:25"
  },
  {
    "_id": 2214508,
    "title": "兆豐銀涉洗錢遭美方開罰　黃國昌痛批：根本是慣犯",
    "created": 1471934990,
    "field_release_date": {
      "value": 1471934991
    },
    "field_short_title": {
      "value": "兆豐銀洗錢案　黃國昌痛批慣犯"
    },
    "field_main_category": {
      "tid": 419883
    },
    "image": {
      "title": "▲針對兆豐銀紐約分行涉洗錢案，遭美方開罰新台幣57億元一事，時代力量立委黃國昌今（23）日質疑「金管會是路人甲，還是銀行的好兄弟？」並痛批「兆豐根本是違反洗錢防制的慣犯」。（圖／翻攝自黃國昌臉書）",
      "description": "▲針對兆豐銀紐約分行涉洗錢案，遭美方開罰新台幣57億元一事，時代力量立委黃國昌今（23）日質疑「金管會是路人甲，還是銀行的好兄弟？」並痛批「兆豐根本是違反洗錢防制的慣犯」。（圖／翻攝自黃國昌臉書）",
      "uri": "hash://14115020_1895757900651387_4916849079006134515_o.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/ac/1d/ac1d4ae6409132348a9ef5df9ee492d4.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/ac/1d/ac1d4ae6409132348a9ef5df9ee492d4.jpg"
    },
    "category": "政治",
    "createdAt": "2016/08/23 14:49:50"
  },
  ......
  ......
]
```

### `GET` /channels/news

取得新聞特輯的列表資料

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "name": "今日整點報",
    "nodeId": 979373,
    "news": [
      {
        "target_id": 2214448
      },
      {
        "target_id": 2155193
      },
      {
        "target_id": 2214420
      },
      {
        "target_id": 2214221
      },
      {
        "target_id": 2214320
      },
      {
        "target_id": 2214267
      },
      {
        "target_id": 2214331
      },
      {
        "target_id": 2213445
      },
      {
        "target_id": 2214337
      },
      {
        "target_id": 2214334
      }
    ]
  },
  {
    "name": "雙城論壇",
    "nodeId": 2214569,
    "news": [
      {
        "target_id": 2197896
      },
      {
        "target_id": 2197904
      },
      {
        "target_id": 2197903
      },
      {
        "target_id": 2197901
      },
      {
        "target_id": 2197924
      },
      {
        "target_id": 2197909
      },
      {
        "target_id": 2197917
      },
      {
        "target_id": 2197923
      },
      {
        "target_id": 2197931
      }
    ]
  },
  ......
  ......
]
```

### `GET` /channels/news/{:nodeId}

取得某個特輯新聞內的所有新聞列表

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| nodeId | 特輯的 nodeId  | String | √ | `/channels/news/2214569` |

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "_id": 2197896,
    "title": "在沙海林面前　鄧家基談太陽花學運、民主選舉",
    "created": 1470651194,
    "changed": 1471928295,
    "body": {
      "summary": "雙城論壇今（23）日登場，台北市副市長鄧家基演講時，當著上海市長代表、統戰部長沙海林的面表示，台北市是公民社會，場外抗議團體就是具體展現，並以太陽花學運為例，這就是「政府沒有認真傾聽，變成反服貿，反了好多東西到最後不可收拾」。 ",
      "value": "<p>雙城論壇今（23）日登場，台北市副市長鄧家基演講時，當著上海市長代表、統戰部長沙海林的面表示，台北市是公民社會，場外抗議團體就是具體展現，並以太陽花學運為例，這就是「政府沒有認真傾聽，變成反服貿，反了好多東西到最後不可收拾」。</p>\r\n<p>鄧家基表示，台灣受到荷蘭、西班牙、明鄭、日本再到光復的影響，已經是個多元文化的社會，大家可以包容不同聲音。</p>\r\n<p>鄧家基以交通為例，強調是台北城市活力的動脈，捷運讓居民四通八達，也帶動禮讓長者、排隊不爭先、車廂禁止飲食保持整潔等城市風氣；城市的心臟則是治安，日前一銀盜領事件，警方在短時間內就找回新台幣8500萬元，迅速破案，引起國際關注；環境治理是城市活力的靜脈，和世界城市接軌。</p>\r\n<p>鄧家基說，台北市已經是一個「選舉社會」，台北市長柯文哲原本只是一個醫生，過去沒有政治淵源與背景，經由公平選舉，將權力和平轉移，但拿到權力的合約只有4年。從1994年到現在5次市長選舉，每次都沒有暴動，贏的慶祝、輸的回家，是城市活力的具體展現。</p>\r\n<p>鄧家基還說，選舉社會也不得不提議會，他透露很多陸方代表私下向他說「議會很麻煩，昨天請了很多人，結果才來了10幾位」，但他回覆，「10幾位很不錯，這些議員是在抑制政府權力的擴張」，台灣已經是一個公民社會，不同的聲音意見都能「有話直說」，就像太陽花學運，當初學運翻轉台灣整體社會，超越政府、政黨的力量。</p>\r\n<p>鄧家基強調，青年的行為模式不能把它當成政治問題，不爽要讓他表達，因為他只是有意見，並不是為了要推翻你，就像服貿協議在立法院，三個月沒有審查，就把他當行政命令直接發布，這就是「政府沒有認真傾聽，變成反服貿，反了好多東西到最後不可收拾」。</p>\r\n",
      "format": "full_html"
    },
    "field_authors": {
      "target_id": 1006727
    },
    "field_newsby": {
      "value": "記者邱明玉／台北報導"
    },
    "field_short_title": {
      "value": "沙海林面前　鄧家基暢談太陽花學運"
    },
    "image": {
      "title": "▲台北市副市長鄧家基23日演講時，當著沙海林的面表示，台北市是公民社會，場外抗議團體就是具體展現，並以太陽花學運為例，這就是「政府沒有認真傾聽，變成反服貿，反了好多東西到最後不可收拾」。（圖／記者陳明安攝,2016.8.23）",
      "description": "▲台北市副市長鄧家基23日演講時，當著沙海林的面表示，台北市是公民社會，場外抗議團體就是具體展現，並以太陽花學運為例，這就是「政府沒有認真傾聽，變成反服貿，反了好多東西到最後不可收拾」。（圖／記者陳明安攝,2016.8.23）",
      "uri": "hash://S__33357853.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/67/cd/67cd23f8fbf8eb22896f996cf42beca0.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/67/cd/67cd23f8fbf8eb22896f996cf42beca0.jpg"
    }
  },
  {
    "_id": 2197904,
    "title": "提九二共識　沙海林：眾所周知原因，出現不願看到的局面",
    "created": 1470651195,
    "changed": 1471927718,
    "body": {
      "summary": "上海市長代表、統戰部長沙海林來台參加雙城論壇，他今（23）日演講時表示，過去八年，兩岸堅持九二共識，兩岸和平發展；當前由於「眾所周知的原因」，而出現中國大陸不願看到的局面，但無論出現什麼情況，大陸推動兩岸關係和平發展、替台灣同胞謀福祉的心不會改變。 ",
      "value": "<p>上海市長代表、統戰部長沙海林來台參加雙城論壇，他今（23）日演講時表示，過去八年，兩岸堅持九二共識，兩岸和平發展；當前由於「眾所周知的原因」，而出現中國大陸不願看到的局面，但無論出現什麼情況，大陸推動兩岸關係和平發展、替台灣同胞謀福祉的心不會改變。</p>\r\n<p>沙海林首先說，這次是他第12次到台灣，為促進上海與台北友好，為血濃於水的兩岸同胞構建命運、利益共同體、實現中華民族復興美好憧憬。</p>\r\n<p>沙海林表示，過去八年，兩岸在堅持「九二共識」政治基礎上，兩岸關係和平發展取得重大進展，交流合作蓬勃發展，符合兩岸同胞根本利益。他珍視上海和台北得來不易的交流成果，深知能達到這些交流成果，「有賴於雙方對兩岸關係及城市交流性質有正確的認識」。</p>\r\n<p>沙海林說，由於眾所周知的原因，當前台海局勢出現中國大陸不願看到的局面，但無論出現什麼情況，中國大陸推動兩岸關係和平發展、為台灣同胞謀福祉、推進兩岸同胞心靈契合決心不會改變。</p>\r\n<p>沙海林表示，兩岸同胞是一家人，兩岸同胞前途跟命運已經緊密相連、密不可分，「我們要維護兩岸關係和平發展的政治基礎」。此外去年上海通過《投資權益保護規定》，未來會持續支持上海台資企業發展，幫助台資企業轉型升級，並深化文化、衛生、體育、交通、青年等交流，藉此不斷增進雙邊的感情。</p>\r\n",
      "format": "full_html"
    },
    "field_authors": {
      "target_id": 1006727
    },
    "field_newsby": {
      "value": "記者邱明玉／台北報導"
    },
    "field_short_title": {
      "value": "提九二共識　沙：出現不願看到局面"
    },
    "image": {
      "title": "▲沙海林23日演講時表示，過去八年，兩岸堅持九二共識，兩岸和平發展；當前由於「眾所周知的原因」，而出現中國大陸不願看到的局面。（圖／記者陳明安攝,2016.8.23）",
      "description": "▲沙海林23日演講時表示，過去八年，兩岸堅持九二共識，兩岸和平發展；當前由於「眾所周知的原因」，而出現中國大陸不願看到的局面。（圖／記者陳明安攝,2016.8.23）",
      "uri": "hash://S__33357860.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/cb/6c/cb6c9076e5b652bf78f4ed380cdba786.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/cb/6c/cb6c9076e5b652bf78f4ed380cdba786.jpg"
    }
  },
  ......
  ......
]
```

### `GET` /news/headline

取得頭條新聞

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "_id": 2214610,
    "title": "純萃喝被新加坡要求召回　台灣比菲多強調：產品沒問題",
    "created": 1471939410,
    "field_release_date": {
      "value": 1471939411
    },
    "field_short_title": {
      "value": "純萃喝被召回　比菲多：產品沒問題"
    },
    "field_main_category": {
      "tid": 419884
    },
    "image": {
      "title": "▲「純萃。喝」品牌旗下的醇乳奶茶被新加坡要求召回，對此，台灣比菲多食品公司表示，茶胺酸在台灣是可以添加的食品添加物，已和有關當局聯絡，另外提出申請許可。（圖／翻攝自比菲多官網）",
      "description": "▲「純萃。喝」品牌旗下的醇乳奶茶被新加坡要求召回，對此，台灣比菲多食品公司表示，茶胺酸在台灣是可以添加的食品添加物，已和有關當局聯絡，另外提出申請許可。（圖／翻攝自比菲多官網）",
      "uri": "hash://螢幕快照 2016-08-23 下午4.00.29.png",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/4d/8e/4d8e3fa8aa8f49aa8e34c46d87933e6f.png",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/4d/8e/4d8e3fa8aa8f49aa8e34c46d87933e6f.png"
    },
    "category": "財經",
    "createdAt": "2016/08/23 16:03:30"
  },
  {
    "_id": 2214483,
    "title": "純萃喝含「這」遭新加坡召回？　成分在台合法",
    "created": 1471933649,
    "field_release_date": {
      "value": 1471933650
    },
    "field_short_title": {
      "value": "純萃喝含這遭召回？　成分在台合法"
    },
    "field_main_category": {
      "tid": 419896
    },
    "image": {
      "title": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／NOWnews）",
      "description": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／NOWnews）",
      "uri": "hash://消費_01_5.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/ee/95/ee953a34f7d7d523e03247a8d24fdcb7.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/ee/95/ee953a34f7d7d523e03247a8d24fdcb7.jpg"
    },
    "category": "健康",
    "createdAt": "2016/08/23 14:27:29"
  },
  {
    "_id": 2214413,
    "title": "混血妻管教有方　謝和弦大讚炎亞綸「勇敢的人」",
    "created": 1471928573,
    "field_release_date": {
      "value": 1471938983
    },
    "field_short_title": {
      "value": "混血妻管教有方　謝和弦大讚炎亞綸"
    },
    "field_main_category": {
      "tid": 419889
    },
    "image": {
      "title": "▲謝和弦（右）誇獎炎亞綸很勇敢。（合成圖／記者陳明安、林柏年攝，2016.8.23）",
      "description": "▲謝和弦（右）誇獎炎亞綸很勇敢。（合成圖／記者陳明安、林柏年攝，2016.8.23）",
      "uri": "hash://506_5793178c9b21c-horz.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/01/0a/010ac81b3bf89f69a7b0aed287e1f0ab.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/01/0a/010ac81b3bf89f69a7b0aed287e1f0ab.jpg"
    },
    "category": "娛樂",
    "createdAt": "2016/08/23 13:02:53"
  },
  ......
  ......
]
```

### `GET` /news/hotNews

取得頭條新聞

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "_id": 2214061,
    "title": "寶可夢玩家擠爆北投　美國時代雜誌：預見了末日景象",
    "created": 1471914285,
    "field_release_date": {
      "value": 1471914286
    },
    "field_short_title": {
      "value": "北投抓寶瘋潮　時代雜誌：預見末日"
    },
    "field_main_category": {
      "tid": 419885
    },
    "image": {
      "title": "台北市北投公園（圖）因手遊寶可夢常出現稀有神奇寶貝，大批民眾21日趁假日尾聲前去抓怪，附近車陣也回堵將近1公里，人潮甚至多到沒有手機訊號。中央社記者游凱翔攝  105年8月21日",
      "description": "台北市北投公園（圖）因手遊寶可夢常出現稀有神奇寶貝，大批民眾21日趁假日尾聲前去抓怪，附近車陣也回堵將近1公里，人潮甚至多到沒有手機訊號。中央社記者游凱翔攝  105年8月21日",
      "uri": "hash://20160821155.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/55/25/5525b407d464a27e19c145595f79487d.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/55/25/5525b407d464a27e19c145595f79487d.jpg"
    },
    "category": "生活",
    "createdAt": "2016/08/23 09:04:45"
  },
  {
    "_id": 2214210,
    "title": "男子酒駕開貨車無罪？　法官判決「神標準」大公開",
    "created": 1471920806,
    "field_release_date": {
      "value": 1471920806
    },
    "field_short_title": {
      "value": "酒駕有罪變無罪？　法官神標準公開"
    },
    "field_main_category": {
      "tid": 419887
    },
    "image": {
      "title": "圖說：對陳姓男子實施酒測其酒測值高達0.41毫克。",
      "description": "圖說：對陳姓男子實施酒測其酒測值高達0.41毫克。",
      "uri": "hash://1_857.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/4f/d2/4fd2042f3728b91979fed49bacecbe04.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/4f/d2/4fd2042f3728b91979fed49bacecbe04.jpg"
    },
    "category": "社會",
    "createdAt": "2016/08/23 10:53:26"
  },
  ......
  ......
]
```

### `GET` /news/instant

取得速報新聞

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  {
    "_id": 2214404,
    "title": "《偶像料理王》9月播出！兩百名藝人競爭「料理王」寶座",
    "created": 1471927992,
    "field_release_date": {
      "value": 1471942800
    },
    "field_short_title": {
      "value": "《偶像料理王》9月中旬播出"
    },
    "field_main_category": {
      "tid": 419889
    },
    "image": {
      "title": "▲《偶像料理王》將在9月播出。（圖／翻攝自OSEN、MBC）",
      "description": "▲《偶像料理王》將在9月播出。（圖／翻攝自OSEN、MBC）",
      "uri": "hash://201608230956774220_57bba02e5f4c7.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/c1/b9/c1b9e8c87de5ef51b0443c917b732489.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/c1/b9/c1b9e8c87de5ef51b0443c917b732489.jpg"
    },
    "category": "娛樂",
    "createdAt": "2016/08/23 12:53:12"
  },
  {
    "_id": 2214526,
    "title": "巨乳訓練師出沒　比基尼皮卡丘等你收服",
    "created": 1471935455,
    "field_release_date": {
      "value": 1471942800
    },
    "field_short_title": {
      "value": "巨乳玩家出沒　泳裝皮卡丘等你收服"
    },
    "field_main_category": {
      "tid": 419892
    },
    "image": {
      "title": "▲巨乳訓練師出沒，比基尼皮卡丘等你收服。（圖／翻攝自推特）",
      "description": "▲巨乳訓練師出沒，比基尼皮卡丘等你收服。（圖／翻攝自推特）",
      "uri": "hash://507_577fac478b30c_31.jpg",
      "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/9e/67/9e672e7f3b8a6a35a7cf0fefcea17ec7.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/9e/67/9e672e7f3b8a6a35a7cf0fefcea17ec7.jpg"
    },
    "category": "新奇",
    "createdAt": "2016/08/23 14:57:35"
  },
  ......
  ......
]
```

### `GET` /news/{:nodeId}

單一則新聞

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| nodeId | 新聞的 nodeId  | String | √ | `/news/2214404` |

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "nodeId": 2214404,
  "title": "《偶像料理王》9月播出！兩百名藝人競爭「料理王」寶座",
  "shortTitle": "《偶像料理王》9月中旬播出",
  "url": "/n/2016/08/23/2214404",
  "image": {
    "title": "▲《偶像料理王》將在9月播出。（圖／翻攝自OSEN、MBC）",
    "description": "▲《偶像料理王》將在9月播出。（圖／翻攝自OSEN、MBC）",
    "uri": "hash://201608230956774220_57bba02e5f4c7.jpg",
    "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/c1/b9/c1b9e8c87de5ef51b0443c917b732489.jpg",
    "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/c1/b9/c1b9e8c87de5ef51b0443c917b732489.jpg"
  },
  "summary": "韓國MBC電視台從2010年開始，每年的中秋和新年都會推出《偶像明星運動會》，邀請各家藝人共同競賽。日前，MBC電視台也傳出今年中秋將再加開一檔特別綜藝《偶像料理王》，今（23）日，部分參加名單也已經公開，預計有50組團體、多達200名藝人參加，一同競爭「料理王」寶座。",
  "created": 1471927992,
  "changed": 1471928507,
  "createdAt": "2016/08/23 12:53:12",
  "updatedAt": "2016/08/23 13:01:47",
  "htmlBody": "<p>韓國MBC電視台從2010年開始，每年的中秋和新年都會推出《偶像明星運動會》，邀請各家藝人共同競賽。日前，MBC電視台也傳出今年中秋將再加開一檔特別綜藝《偶像料理王》，今（23）日，部分參加名單也已經公開，預計有50組團體、多達200名藝人參加，一同競爭「料理王」寶座。</p>\r\n<p>根據《OSEN》報導，《偶像料理王》將邀請EXO、BTS防彈少年團、BTOB、VIXX、TWICE、Lovelyz、NCT 127等50組團體，約200名的藝人參加。</p>\r\n<p>此外，在近200名的藝人中，只有8名能取得參加《偶像料理王》決賽的資格，最後再從這8名藝人中選出1名「料理王」，將會是一場相當激烈的比賽。</p>\r\n<p>《偶像料理王》預計在9月中旬、作為中秋特集播出，到時候藝人們會在比賽中展現什麼樣的廚藝，也讓粉絲相當期待。</p>\r\n<p><img alt=\"\" class=\"media-image attr__typeof__foaf:Image img__fid__1306514 media__2214403__isAuth__1 img__view_mode__media_crop attr__media_crop_rotate__0 attr__media_crop_x__0 attr__media_crop_y__0 attr__media_crop_w__0 attr__media_crop_h__0 attr__media_crop_scale_w__0 attr__media_crop_scale_h__0 attr__media_crop_image_style__-1 attr__media_crop_instance__138545 attr__description__▲《偶像料理王》將邀請200名藝人參加。（圖／翻攝自EXO、BTS、BTOB、VIXX臉書）\" id=\"media_crop_7585146201598\" src=\"http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/media_crop/138545/hash/b6/ec/b6ecd7fbe76b8fe12c3026afb8d28b39.jpg\" typeof=\"foaf:Image\"><br>\r\n\t<cite>▲《偶像料理王》將邀請200名藝人參加。（圖／翻攝自EXO、BTS、BTOB、VIXX臉書）</cite></p>\r\n",
  "videos": [],
  "mobileBody": [
    {
      "tag": "p",
      "content": "韓國MBC電視台從2010年開始，每年的中秋和新年都會推出《偶像明星運動會》，邀請各家藝人共同競賽。日前，MBC電視台也傳出今年中秋將再加開一檔特別綜藝《偶像料理王》，今（23）日，部分參加名單也已經公開，預計有50組團體、多達200名藝人參加，一同競爭「料理王」寶座。"
    },
    {
      "tag": "p",
      "content": "根據《OSEN》報導，《偶像料理王》將邀請EXO、BTS防彈少年團、BTOB、VIXX、TWICE、Lovelyz、NCT 127等50組團體，約200名的藝人參加。"
    },
    {
      "tag": "p",
      "content": "此外，在近200名的藝人中，只有8名能取得參加《偶像料理王》決賽的資格，最後再從這8名藝人中選出1名「料理王」，將會是一場相當激烈的比賽。"
    },
    {
      "tag": "p",
      "content": "《偶像料理王》預計在9月中旬、作為中秋特集播出，到時候藝人們會在比賽中展現什麼樣的廚藝，也讓粉絲相當期待。"
    },
    {
      "tag": "image",
      "src": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/media_crop/138545/hash/b6/ec/b6ecd7fbe76b8fe12c3026afb8d28b39.jpg",
      "content": "▲《偶像料理王》將邀請200名藝人參加。（圖／翻攝自EXO、BTS、BTOB、VIXX臉書）"
    }
  ],
  "freeBody": "<div class=\"other_info1\">\r\n\t<a href=\"http://goo.gl/C8QriH\" style=\"display:block; color:#E40012; line-height: 1em; margin-bottom: 0.5em; font-weight: 900;\">》》投票去，我有話要說！</a>\r\n\t<div class=\"other_info1\">\r\n\t\t<div>\r\n\t\t\t<span style=\"color: rgb(51, 51, 51); font-family: Arial, 新細明體; font-size: 16px; line-height: 30px;\">更多NOWnews新聞</span>都在行動APP上：</div>\r\n\t\t<a href=\"https://goo.gl/AWVNkD\" style=\"display:block; color:#097cd2;\">》》Android APP請點這裡下載</a> <a href=\"https://goo.gl/M49ADW\" style=\"display:block; color:#097cd2;\">》》iOS APP請點這裡下載</a> <a href=\"http://legacy.nownews.com/events/adtips/mobile_app/NowNews_Mobile.apk\" style=\"display:block; color:#097cd2;\">》》大陸地區請點此直接下載APK安裝</a></div>\r\n</div>\r\n",
  "author": "娛樂中心／綜合報導",
  "adult": "0"
}
```

### `GET` /news/newest

取得最新 10 筆的新聞的 Id (順益專用)

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
[
  "http://www.nownews.com/n/2016/08/23/2214713",
  "http://www.nownews.com/n/2016/08/23/2214697",
  "http://www.nownews.com/n/2016/08/23/2214689",
  "http://www.nownews.com/n/2016/08/23/2214684",
  "http://www.nownews.com/n/2016/08/23/2214681",
  "http://www.nownews.com/n/2016/08/23/2214669",
  "http://www.nownews.com/n/2016/08/23/2214662",
  "http://www.nownews.com/n/2016/08/23/2214655",
  "http://www.nownews.com/n/2016/08/23/2214651",
  "http://www.nownews.com/n/2016/08/23/2214647"
]
```