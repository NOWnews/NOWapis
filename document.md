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

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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

### `GET` /category/photos

取得所有圖集大分類資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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
    "_id": 2691,
    "tid": 2691,
    "vid": 3,
    "name": "圖集總覽",
    "weight": 0
  },
  {
    "_id": 2551,
    "name": "影劇",
    "tid": 2551,
    "vid": 3,
    "weight": 0
  },
  ......
  ......
]
```

### `GET` /category/videos

取得所有影音分類資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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
    "_id": 8297,
    "tid": 8297,
    "vid": 3,
    "name": "影音",
    "weight": 0
  },
  {
    "_id": 2698,
    "tid": 2698,
    "vid": 3,
    "name": "新聞",
    "weight": 0
  },
  .....
  .....
]
```

### `GET` /category/news/{:taxId}

取得某個新聞分類的所有新聞列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| taxId | 某個分類的 taxId | String | √ | `/category/news/419883` |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| page | 分頁 | String |  | `/category/news/419883?page=2` |

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

### `GET` /category/photos/{:taxId}

取得某個圖集的所有圖集列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| taxId | 某個分類的 taxId | String | √ | `/category/photos/2691` |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| page | 分頁 | String |  | `/category/photos/2691?page=2` |

#### Response Status Code

200

#### Response Data

```
[
  {
    "title": "20160824運動圖輯",
    "mainNodeId": 2215702,
    "cite": "▲Clay Buchholz。（圖／美聯社／達志影像）",
    "nodeId": 2215559,
    "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/a4/48/a44867a11ea81eec3ad285da62e14c0b.jpg"
  },
  {
    "title": "20160823運動圖輯",
    "mainNodeId": 2214724,
    "cite": "里約奧運羽球銀牌P. V. Sindhu（左）回到印度後受到萬人簇擁，但，然後呢？（圖／美聯社／達志影像）",
    "nodeId": 2214653,
    "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/45/43/454327205871488ef85abdf75fa59abc.jpg"
  },
  ......
  ......
]
```

### `GET` /category/videos/{:taxId}

取得某個影音分類的所有影音列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| taxId | 某個分類的 taxId | String | √ | `/category/videos/3981` |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| page | 分頁 | String |  | `/category/videos/3981?page=2` |

#### Response Status Code

200

#### Response Data

```
[
  {
    "nodeId": 1309704,
    "title": "貝貝的享食生活 - 香蕉蛋糕教學",
    "createdAt": "2014/07/06 04:46:55",
    "youtubeThumbnail": "http://img.youtube.com/vi/WfShnqdiWZ0/0.jpg"
  },
  {
    "nodeId": 1039981,
    "title": "【今日美食賞】公館特色餐廳 絕妙的SABABA中東美食 ",
    "createdAt": "2013/12/03 15:01:34",
    "youtubeThumbnail": "http://img.youtube.com/vi/c8L1WXEVBKc/0.jpg"
  },
  ......
  ......
]
```

### `GET` /channels/news

取得新聞特輯的列表頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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

取得某個特輯新聞內的所有新聞列表頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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
{
  "channelId": 2168893,
  "channelName": "瘋寶可夢",
  "newsList": [
    {
      "_id": 2186993,
      "title": "拉近青年關係　國民黨中常委提案民代辦寶可夢活動",
      "created": 1469846886,
      "field_short_title": {
        "value": "找回青年　藍中常委提一起玩寶可夢"
      },
      "field_main_category": {
        "tid": 419883
      },
      "image": {
        "title": "▲台北市北投公園因手遊寶可夢常出現稀有神奇寶貝，大批民眾趁假日尾聲前去抓怪。（圖／MOWnews攝）",
        "description": "▲台北市北投公園因手遊寶可夢常出現稀有神奇寶貝，大批民眾趁假日尾聲前去抓怪。（圖／MOWnews攝）",
        "uri": "hash://S__1507333.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/ca/20/ca20463bdc387610885a0b233587b3e9.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/ca/20/ca20463bdc387610885a0b233587b3e9.jpg"
      },
      "category": "政治",
      "createdAt": "2016/07/30 10:48:06"
    },
    {
      "_id": 2215423,
      "title": "蔡阿嘎窩北投公園2天　爽獲CP值超高暴鯉龍",
      "created": 1472007182,
      "field_short_title": {
        "value": "窩北投公園2天　蔡阿嘎暴鯉龍得手"
      },
      "field_main_category": {
        "tid": 419892
      },
      "image": {
        "title": "▲蔡阿嘎在北投公園待兩天，終於將鯉魚王進化成暴鯉龍。（圖／翻攝自蔡阿嘎粉絲專頁）",
        "description": "▲蔡阿嘎在北投公園待兩天，終於將鯉魚王進化成暴鯉龍。（圖／翻攝自蔡阿嘎粉絲專頁）",
        "uri": "hash://DDFDF.PNG",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/f1/dd/f1dd56f0242cdb32f1cdb553052480be.PNG",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/f1/dd/f1dd56f0242cdb32f1cdb553052480be.PNG"
      },
      "category": "新奇",
      "createdAt": "2016/08/24 10:53:02"
    },
    ......
    ......
  ]
}
```

### `GET` /news/headline

取得頭條新聞列表頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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

取得頭條新聞列表頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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

取得速報新聞列表頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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

新聞內頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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
  "adult": "0",
  "prev": {
    "_id": 2216641,
    "title": "阿富汗美國大學遇襲2死25傷　歹徒遭擊斃",
    "field_short_title": {
      "value": "阿國美大學遇襲2死　2歹徒遭擊斃"
    }
  },
  "next": {
    "_id": 2216647,
    "title": "奧運／永不放棄　李宗偉明年還要拚世界冠軍",
    "field_short_title": {
      "value": "永不放棄　李宗偉明年要拚世界冠軍"
    }
  },
  "refNews": [
    {
      "_id": 2216590,
      "title": "驚！5歲童夜夜坐著睡　竟是這東西塞呼吸道",
      "field_main_category": {
        "tid": 419896
      },
      "image": {
        "title": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／NOWnews）",
        "description": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／NOWnews）",
        "uri": "hash://醫藥_01_4.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/df/19/df19f28714f1658775d5fa7a399e1ad0.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/df/19/df19f28714f1658775d5fa7a399e1ad0.jpg"
      },
      "category": "健康"
    },
    {
      "_id": 2216106,
      "title": "新光醫院傳暴力！　男持鐵棒闖入診間襲醫",
      "field_main_category": {
        "tid": 419896
      },
      "image": {
        "title": "▲醫療暴力事件後，新光醫院立即派人慰問受攻擊的醫師。（圖／翻攝自醫勞盟）",
        "description": "▲醫療暴力事件後，新光醫院立即派人慰問受攻擊的醫師。（圖／翻攝自醫勞盟）",
        "uri": "hash://螢幕快照 2016-08-24 下午6.13.13.png",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/d8/05/d805aa25eec91990947e3b8863e5de9c.png",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/d8/05/d805aa25eec91990947e3b8863e5de9c.png"
      },
      "category": "健康"
    },
    {
      "_id": 2216067,
      "title": "血友病藥物回收不完整？　病友團體不滿",
      "field_main_category": {
        "tid": 419896
      },
      "image": {
        "title": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／翻攝自網路）",
        "description": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／翻攝自網路）",
        "uri": "hash://醫藥圖-05_0.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/9d/84/9d842b6cc91258256476a75af87390fe.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/9d/84/9d842b6cc91258256476a75af87390fe.jpg"
      },
      "category": "健康"
    },
    {
      "_id": 2215956,
      "title": "抗癌新發現　台灣原生植物成新藥",
      "field_main_category": {
        "tid": 419896
      },
      "image": {
        "title": "▲衛福部、經濟部共同主辦「藥物科技研究發展獎」開跑，要發掘更多台灣本土新藥。（圖／記者陳鈞凱攝,2016.8.24）",
        "description": "▲衛福部、經濟部共同主辦「藥物科技研究發展獎」開跑，要發掘更多台灣本土新藥。（圖／記者陳鈞凱攝,2016.8.24）",
        "uri": "hash://S__19193858.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/bb/29/bb2950da9b397e74a36efc9e11bf4ff0.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/bb/29/bb2950da9b397e74a36efc9e11bf4ff0.jpg"
      },
      "category": "健康"
    },
    {
      "_id": 2215624,
      "title": "防缺藥潮！近千項「必要藥品」列管　缺藥不報要罰",
      "field_main_category": {
        "tid": 419896
      },
      "image": {
        "title": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／NOWnews）",
        "description": "▲最具影響力的新聞，都在NOWnews今日新聞。（圖／NOWnews）",
        "uri": "hash://醫藥_04_1.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/e9/28/e928f25067844fd1cb9e15c84fab8716.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/e9/28/e928f25067844fd1cb9e15c84fab8716.jpg"
      },
      "category": "健康"
    },
    {
      "_id": 2215534,
      "title": "當心！境外染登革熱217例　13年新高",
      "field_main_category": {
        "tid": 419896
      },
      "image": {
        "title": "▲腸病毒疫情趨緩，但疾管署公布上周仍新增1例腸病毒71型重症個案。（圖／記者陳鈞凱攝,2016.8.23）",
        "description": "▲腸病毒疫情趨緩，但疾管署公布上周仍新增1例腸病毒71型重症個案。（圖／記者陳鈞凱攝,2016.8.23）",
        "uri": "hash://S__19136535.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/67/00/6700325f496ef364ce0ecc01218cfa27.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/67/00/6700325f496ef364ce0ecc01218cfa27.jpg"
      },
      "category": "健康"
    }
  ]
}
```

### `GET` /news/newest

取得最新 10 筆的新聞的 Id (順益專用)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

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

### `GET` /photos/{:nodeId}

圖集內頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| nodeId | 圖集的 nodeId  | String | √ | `/photos/2215559` |

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "nodeId": 2215559,
  "cite": "▲Clay Buchholz。（圖／美聯社／達志影像）",
  "mainImage": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/a4/48/a44867a11ea81eec3ad285da62e14c0b.jpg",
  "collectionImages": [
    {
      "nodeId": 2215559,
      "cite": "▲Clay Buchholz。（圖／美聯社／達志影像）",
      "fileNodeId": 2215559,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/a4/48/a44867a11ea81eec3ad285da62e14c0b.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/a4/48/a44867a11ea81eec3ad285da62e14c0b.jpg"
    },
    {
      "nodeId": 2215462,
      "cite": "▲林丹及李宗偉。（圖／美聯社／達志影像）",
      "fileNodeId": 2215462,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/3f/90/3f90333b245eea1340513aec462dd0b0.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/3f/90/3f90333b245eea1340513aec462dd0b0.jpg"
    },
    {
      "nodeId": 2215387,
      "cite": "▲皇家隊Yordano Ventura投的精采。（圖／美聯社／達志影像）",
      "fileNodeId": 2215387,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/5b/f1/5bf1f9c7424fe764906e5edcdb8c9251.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/5b/f1/5bf1f9c7424fe764906e5edcdb8c9251.jpg"
    },
    {
      "nodeId": 2215355,
      "cite": "▲陽岱鋼經常在關鍵時刻建功。（圖／取材自日本職棒太平洋聯盟TV）",
      "fileNodeId": 2215355,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/64/0c/640c074f18708a5fc8bebf7c5e7edd1f.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/64/0c/640c074f18708a5fc8bebf7c5e7edd1f.jpg"
    },
    {
      "nodeId": 2215354,
      "cite": "▲Gary Sanchez。（圖／美聯社／達志影像）",
      "fileNodeId": 2215354,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/ec/16/ec16cb7bd30365bb356c125fcd4d5e7c.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/ec/16/ec16cb7bd30365bb356c125fcd4d5e7c.jpg"
    },
    {
      "nodeId": 2215317,
      "cite": "▲Jose Bautista。（圖／美聯社／達志影像）",
      "fileNodeId": 2215317,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/d5/ff/d5ff5b6d253ff1b8f0a2606e0526ef55.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/d5/ff/d5ff5b6d253ff1b8f0a2606e0526ef55.jpg"
    },
    {
      "nodeId": 2215270,
      "cite": "▲遊騎兵隊決定釋出Josh Hamilton 。（圖／美聯社／達志影像）",
      "fileNodeId": 2215270,
      "thumbnail": "http://imgapi.nownews.com/?w=640&q=60&src=http://s.nownews.com/c0/76/c076d43a95c17a0d1630fbe9cb4217ad.jpg",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/c0/76/c076d43a95c17a0d1630fbe9cb4217ad.jpg"
    }
  ]
}
```

### `GET` /videos/{:nodeId}

影音內頁

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| nodeId | 影音的 nodeId  | String | √ | `/videos/1309704` |

#### Body Parameters

None

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "_id": 1309704,
  "body": {
    "summary": "",
    "value": "<p>▲名媛Bébé貝貝將以最簡單多角度方式，示範香蕉蛋糕的作法步驟攝教學，分享給喜歡品嘗以及希望學習甜點的朋友們<br />\r\n\t影音提供：Bébé貝貝https://www.facebook.com/baybay1111</p>\r\n",
    "format": "full_html"
  },
  "changed": 1405398586,
  "created": 1404593215,
  "field_image": null,
  "field_media_entity": {
    "fid": 775624,
    "display": 1
  },
  "title": "貝貝的享食生活 - 香蕉蛋糕教學",
  "image": "http://img.youtube.com/vi/WfShnqdiWZ0/0.jpg",
  "youtubeId": "WfShnqdiWZ0",
  "src": "https://www.youtube.com/embed/WfShnqdiWZ0",
  "createdAt": "2014/07/06 04:46:55"
}
```

### `GET` /search

用 solr 搜尋相關新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsTaiwanNumberOne`] | √ | `request.header['X-NOWnews-API'] = 'NOWnewsTaiwanNumberOne'` |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| keyword | 搜尋關鍵字 | String | √ | `/search?keyword=蔡英文` |

#### Response Status Code

200

#### Response Data

```
{
  "keyword": "蔡英文",
  "newsList": [
    {
      "_id": 2219608,
      "title": "該調整就調整　蔡英文不怕外界批評",
      "created": 1472302584,
      "field_release_date": {
        "value": 1472302584
      },
      "field_short_title": {
        "value": "該調整就調整　蔡英文不怕外界批評"
      },
      "field_main_category": {
        "tid": 419883
      },
      "image": {
        "title": "▲前總統李登輝與總統蔡英文參加「人民直選總統暨台灣民主化發展20周年研討會」。（圖／總統府提供,2016.08.27）",
        "description": "▲前總統李登輝與總統蔡英文參加「人民直選總統暨台灣民主化發展20周年研討會」。（圖／總統府提供,2016.08.27）",
        "uri": "hash://全螢幕擷取 2016827 下午 015605.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/d5/53/d553819cc92c603ba16a328f246b6db2.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/d5/53/d553819cc92c603ba16a328f246b6db2.jpg"
      },
      "category": "政治",
      "createdAt": "2016/08/27 20:56:24"
    },
    {
      "_id": 2219370,
      "title": "愛滋生案衛福部開罰100萬　國防部將提行政救濟",
      "created": 1472287026,
      "field_release_date": {
        "value": 1472287919
      },
      "field_short_title": {
        "value": "衛福部開罰百萬　軍方將提行政救濟"
      },
      "field_main_category": {
        "tid": 419883
      },
      "image": {
        "title": "▲針對國防大學退學愛滋生的歧視案，疾管署不排除祭出國內最高紀錄的百萬罰單，也可能寫下公家機關挨罰的首例。（圖／記者陳鈞凱攝,2016.8.15）",
        "description": "▲針對國防大學退學愛滋生的歧視案，疾管署不排除祭出國內最高紀錄的百萬罰單，也可能寫下公家機關挨罰的首例。（圖／記者陳鈞凱攝,2016.8.15）",
        "uri": "hash://S__18702338.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/98/7e/987ebb363550ec32308878553164054d.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/98/7e/987ebb363550ec32308878553164054d.jpg"
      },
      "category": "政治",
      "createdAt": "2016/08/27 16:51:59"
    },
    ......
    ......
  ]
}
```