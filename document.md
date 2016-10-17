# NOWapis (v3api)

提供給 mobile, app, 甚至於一般網站使用的 api 端點

##  NOWapis 系統資訊

Node.js 版本: v6.5.0

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
{
  "newsList": [
    {
      "_id": 2253561,
      "title": "9月29日世界各報頭條",
      "created": 1475114432,
      "field_release_date": {
        "value": 1475116207
      },
      "field_short_title": {
        "value": "9月29日世界各報頭條"
      },
      "field_main_category": {
        "tid": 419883
      },
      "image": {
        "title": "▲美國首場總統選舉電視辯論會，外界普遍認為共和黨總統候選人川普表現不如對手希拉蕊。（圖／達志影像）",
        "description": "▲美國首場總統選舉電視辯論會，外界普遍認為共和黨總統候選人川普表現不如對手希拉蕊。（圖／達志影像）",
        "uri": "hash://T73476554_5M.jpg",
        "originImage": "http://s.nownews.com/04/ef/04ef6cd606b8546153e2b2a2e96ebe05.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/04/ef/04ef6cd606b8546153e2b2a2e96ebe05.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/04/ef/04ef6cd606b8546153e2b2a2e96ebe05.jpg"
      },
      "category": {
        "_id": 419883,
        "name": "政治"
      },
      "createdAt": "2016/09/29 10:30:07"
    },
    {
      "_id": 2253409,
      "title": "立委認為颱風假應補班、補課　網友嗆：無薪假何解？",
      "created": 1475076491,
      "field_release_date": {
        "value": 1475107440
      },
      "field_short_title": {
        "value": "立委認為颱風假應補班　網友這樣說"
      },
      "field_main_category": {
        "tid": 419883
      },
      "image": {
        "title": "▲民進黨立委王定宇21日總質詢時表示，外界有一說，行政院長林全民調直落是受「三大罪人」影響，一個就是政務委員張景森、一個是交通部長賀陳旦，最後則是國防部長馮世寬。（圖／記者陳彥驊攝,2016.06.21）",
        "description": "▲民進黨立委王定宇21日總質詢時表示，外界有一說，行政院長林全民調直落是受「三大罪人」影響，一個就是政務委員張景森、一個是交通部長賀陳旦，最後則是國防部長馮世寬。（圖／記者陳彥驊攝,2016.06.21）",
        "uri": "hash://DSCN4323.JPG",
        "originImage": "http://s.nownews.com/e9/4c/e94c98ea3306e75e7da1a3dc68a04a3e.JPG",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/e9/4c/e94c98ea3306e75e7da1a3dc68a04a3e.JPG",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/e9/4c/e94c98ea3306e75e7da1a3dc68a04a3e.JPG"
      },
      "category": {
        "_id": 419883,
        "name": "政治"
      },
      "createdAt": "2016/09/29 08:04:00"
    },
    ......,
    ......
  ],
  "ads": [
    {
      "sn": 1,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100805-4452js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2994&bannerid=35235"
      }
    },
    {
      "sn": 2,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100954-1099js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2996&bannerid=35236"
      }
    },
    ......
    ......
  ]
}
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
      "category": {
        "_id": 419892,
        "name": "新奇"
      },
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
      "category": {
        "_id": 419891,
        "name": "大陸"
      },
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
{
  "newsList": [
    {
      "_id": 2253616,
      "title": "快訊／文湖線列車傳爆炸聲　初判設備異常",
      "created": 1475116444,
      "field_release_date": {
        "value": 1475116445
      },
      "field_short_title": {
        "value": "快訊／文湖線列車傳爆炸聲嚇壞乘客"
      },
      "field_main_category": {
        "tid": 419887
      },
      "image": {
        "title": "▲搭乘文湖線碰到異常事件時，謹記安全攻略「壓、說、聽」三步驟。。（圖／記者王苡嫣攝 2016.07.13）",
        "description": "▲搭乘文湖線碰到異常事件時，謹記安全攻略「壓、說、聽」三步驟。。（圖／記者王苡嫣攝 2016.07.13）",
        "uri": "hash://IMG_3728.JPG",
        "originImage": "http://s.nownews.com/20/f0/20f097f85f66fbdb5f5c128cb4c24632.JPG",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/20/f0/20f097f85f66fbdb5f5c128cb4c24632.JPG",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/20/f0/20f097f85f66fbdb5f5c128cb4c24632.JPG"
      },
      "category": {
        "_id": 419887,
        "name": "社會"
      },
      "createdAt": "2016/09/29 10:34:04"
    },
    {
      "_id": 2253563,
      "title": "手機巨星殞落！黑苺公司不再發展硬體　轉向開發軟體",
      "created": 1475114486,
      "field_release_date": {
        "value": 1475114487
      },
      "field_short_title": {
        "value": "手機巨星殞落！黑苺公司不發展硬體"
      },
      "field_main_category": {
        "tid": 419895
      },
      "image": {
        "title": "▲黑苺公司已在官網宣布，朝向軟體業務發展。（圖／翻攝自黑苺官方網站）",
        "description": "▲黑苺公司已在官網宣布，朝向軟體業務發展。（圖／翻攝自黑苺官方網站）",
        "uri": "hash://擷取_312.PNG",
        "originImage": "http://s.nownews.com/c6/ad/c6ad2bc9f14eee3bd43ab46498e7f9c0.PNG",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/c6/ad/c6ad2bc9f14eee3bd43ab46498e7f9c0.PNG",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/c6/ad/c6ad2bc9f14eee3bd43ab46498e7f9c0.PNG"
      },
      "category": {
        "_id": 419895,
        "name": "科技"
      },
      "createdAt": "2016/09/29 10:01:26"
    },
    ......
    ......
  ],
  "ads": [
    {
      "sn": 1,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100805-4452js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2994&bannerid=35235"
      }
    },
    {
      "sn": 2,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100954-1099js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2996&bannerid=35236"
      }
    },
    ......
    ......
  ]
}
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
{
  "newsList": [
    {
      "_id": 2253512,
      "title": "美南卡州逆倫慘案　少年殺父後再闖小學槍傷3人",
      "created": 1475112638,
      "field_release_date": {
        "value": 1475114054
      },
      "field_short_title": {
        "value": "美少年殺父後　再闖小學槍傷3人"
      },
      "field_main_category": {
        "tid": 419890
      },
      "image": {
        "title": "▲美國南卡羅來納州湯維爾小學（Townville Elementary）發生槍擊案，造成3人受傷。警方進入校園搜捕嫌犯。（圖／達志影像／美聯社）",
        "description": "▲美國南卡羅來納州湯維爾小學（Townville Elementary）發生槍擊案，造成3人受傷。警方進入校園搜捕嫌犯。（圖／達志影像／美聯社）",
        "uri": "hash://AP_16272684881979.jpg",
        "originImage": "http://s.nownews.com/5e/74/5e740301294655897a3ac56f6de692be.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/5e/74/5e740301294655897a3ac56f6de692be.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/5e/74/5e740301294655897a3ac56f6de692be.jpg"
      },
      "category": {
        "_id": 419890,
        "name": "國際"
      },
      "createdAt": "2016/09/29 09:54:14"
    },
    {
      "_id": 2253561,
      "title": "9月29日世界各報頭條",
      "created": 1475114432,
      "field_release_date": {
        "value": 1475116207
      },
      "field_short_title": {
        "value": "9月29日世界各報頭條"
      },
      "field_main_category": {
        "tid": 419883
      },
      "image": {
        "title": "▲美國首場總統選舉電視辯論會，外界普遍認為共和黨總統候選人川普表現不如對手希拉蕊。（圖／達志影像）",
        "description": "▲美國首場總統選舉電視辯論會，外界普遍認為共和黨總統候選人川普表現不如對手希拉蕊。（圖／達志影像）",
        "uri": "hash://T73476554_5M.jpg",
        "originImage": "http://s.nownews.com/04/ef/04ef6cd606b8546153e2b2a2e96ebe05.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/04/ef/04ef6cd606b8546153e2b2a2e96ebe05.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/04/ef/04ef6cd606b8546153e2b2a2e96ebe05.jpg"
      },
      "category": {
        "_id": 419883,
        "name": "政治"
      },
      "createdAt": "2016/09/29 10:30:07"
    },
    ......
    ......
  ],
  "ads": [
    {
      "sn": 1,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100805-4452js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2994&bannerid=35235"
      }
    },
    {
      "sn": 2,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100954-1099js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2996&bannerid=35236"
      }
    },
    ......
    ......
  ]
}
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
{
  "newsList": [
    {
      "_id": 2253644,
      "title": "輔導劵商請辭爆危機　匯特：財務健全將積極重新送件",
      "created": 1475117250,
      "field_release_date": {
        "value": 1475117251
      },
      "field_short_title": {
        "value": "匯特生技爆危機　將積極重新送件"
      },
      "field_main_category": {
        "tid": 419884
      },
      "image": {
        "title": "▲匯特生技上櫃輔導劵商紛紛請辭受到不少關注，匯特表示公司營運正常、財務健全，也會積極接洽其他證券商擔任主辦及協辦輔導推薦證券商，一旦確定，就會重新送件申請恢復交易。圖左三為匯特總經理江滄炫。（圖／匯特生技提供）",
        "description": "▲匯特生技上櫃輔導劵商紛紛請辭受到不少關注，匯特表示公司營運正常、財務健全，也會積極接洽其他證券商擔任主辦及協辦輔導推薦證券商，一旦確定，就會重新送件申請恢復交易。圖左三為匯特總經理江滄炫。（圖／匯特生技提供）",
        "uri": "hash://S__42000393.jpg",
        "originImage": "http://s.nownews.com/bf/59/bf5914bc85e3862ca8cea3b8dedb8c69.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/bf/59/bf5914bc85e3862ca8cea3b8dedb8c69.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/bf/59/bf5914bc85e3862ca8cea3b8dedb8c69.jpg"
      },
      "category": {
        "_id": 419884,
        "name": "財經"
      },
      "createdAt": "2016/09/29 10:47:30"
    },
    {
      "_id": 2253631,
      "title": "MLB／海盜隊Jaso「完全打擊」",
      "created": 1475117142,
      "field_release_date": {
        "value": 1475117179
      },
      "field_short_title": {
        "value": "海盜隊Jaso「完全打擊」"
      },
      "field_main_category": {
        "tid": 419888
      },
      "image": {
        "title": "▲海盜隊John Jaso（右）成功滑上三壘，締造完全打擊紀錄。（圖／美聯社／達志影像）",
        "description": "▲海盜隊John Jaso（右）成功滑上三壘，締造完全打擊紀錄。（圖／美聯社／達志影像）",
        "uri": "hash://AP_633856198709.jpg",
        "originImage": "http://s.nownews.com/10/6c/106c380267117dc9c8ef819a80b6479f.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/10/6c/106c380267117dc9c8ef819a80b6479f.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/10/6c/106c380267117dc9c8ef819a80b6479f.jpg"
      },
      "category": {
        "_id": 419888,
        "name": "運動"
      },
      "createdAt": "2016/09/29 10:45:42"
    },
    ......
    ......
  ],
  "ads": [
    {
      "sn": 1,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100805-4452js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2994&bannerid=35235"
      }
    },
    {
      "sn": 2,
      "ad": {
        "title": "屋主降價 緊來看!過了這村就沒這店",
        "img": "http://legacy.nownews.com/ad2004/160919-100954-1099js.jpg",
        "url": "http://ad1.nownews.com/adclick.php?ownerid=2996&bannerid=35236"
      }
    },
    ......
    ......
  ]
}
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
    "originImage": "http://s.nownews.com/c1/b9/c1b9e8c87de5ef51b0443c917b732489.jpg",
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
  "freeBody": "\r\n",
  "author": "娛樂中心／綜合報導",
  "adult": "0",
  "keywords": "速報,首頁,八卦,娛樂,美食,料理,比賽,廚藝,EXO,BTOB,料理王,娛樂看板,VIXX,LOVELYZ,韓綜,TWICE,日韓流行線,BTS防彈少年團,NCT 127,偶像料理王",
  "prev": {
    "_id": 2214550,
    "title": "如果自己是男人　Mina「我想和定延交往」",
    "field_short_title": {
      "value": "如果是男人　Mina想和定延交往"
    }
  },
  "next": {
    "_id": 2214681,
    "title": "艾爾帕西諾、安東尼霍普金斯　破天荒同台拍片",
    "field_short_title": {
      "value": "帕西諾、霍普金斯　破天荒同台拍片"
    }
  },
  "category": {
    "_id": 419889,
    "name": "娛樂"
  },
  "refNews": [
    {
      "_id": 2207028,
      "title": "不只要偶像動起來！MBC計畫推新綜《偶像料理王》",
      "field_main_category": {
        "tid": 419889
      },
      "image": {
        "title": "▲《偶像明星運動會》是MBC推出的一檔大型綜藝節目。（圖／翻攝自osen）",
        "description": "▲《偶像明星運動會》是MBC推出的一檔大型綜藝節目。（圖／翻攝自osen）",
        "uri": "hash://201608161541775508_57b2b5ae8a285.jpg",
        "originImage": "http://s.nownews.com/9a/ff/9aff2fcf5d5c6e3e816430d147ae66f6.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/9a/ff/9aff2fcf5d5c6e3e816430d147ae66f6.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/9a/ff/9aff2fcf5d5c6e3e816430d147ae66f6.jpg"
      },
      "category": {
        "_id": 419889,
        "name": "娛樂"
      }
    },
    {
      "_id": 2207943,
      "title": "李準基《RM》首秀　公開與洪宗玄、姜河那錄影認證照",
      "field_main_category": {
        "tid": 419889
      },
      "image": {
        "title": "▲李準基、姜河那、洪宗玄16日參加《Running Man》錄影。（圖／翻攝自李準基IG）",
        "description": "▲李準基、姜河那、洪宗玄16日參加《Running Man》錄影。（圖／翻攝自李準基IG）",
        "uri": "hash://LEE.PNG",
        "originImage": "http://s.nownews.com/63/e1/63e16fb2a766d0d6462f90c46cfc7e83.PNG",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/63/e1/63e16fb2a766d0d6462f90c46cfc7e83.PNG",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/63/e1/63e16fb2a766d0d6462f90c46cfc7e83.PNG"
      },
      "category": {
        "_id": 419889,
        "name": "娛樂"
      }
    },
    {
      "_id": 2202385,
      "title": "皇子來了！李準基、洪宗玄、姜河那攜手出演《RM》",
      "field_main_category": {
        "tid": 419889
      },
      "image": {
        "title": "▲李準基、姜河那、洪宗玄將參加《RM》。（圖／翻攝自日刊體育）",
        "description": "▲李準基、姜河那、洪宗玄將參加《RM》。（圖／翻攝自日刊體育）",
        "uri": "hash://擷取_231.PNG",
        "originImage": "http://s.nownews.com/fb/43/fb437641e3ca438bffb9e6889aaeb983.PNG",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/fb/43/fb437641e3ca438bffb9e6889aaeb983.PNG",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/fb/43/fb437641e3ca438bffb9e6889aaeb983.PNG"
      },
      "category": {
        "_id": 419889,
        "name": "娛樂"
      }
    },
    {
      "_id": 2194787,
      "title": "娛樂報報／宋慧喬、宋仲基　男神女神都是運動員？",
      "field_main_category": null,
      "image": {
        "title": "張梓琳——跳高、三級跳遠和百米跨欄。",
        "description": "張梓琳——跳高、三級跳遠和百米跨欄。",
        "uri": "hash://28_673.jpg",
        "originImage": "http://s.nownews.com/bb/31/bb319ad15cde136fed1824f7eb325370.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/bb/31/bb319ad15cde136fed1824f7eb325370.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/bb/31/bb319ad15cde136fed1824f7eb325370.jpg"
      },
      "category": null
    },
    {
      "_id": 2194596,
      "title": "越老人生越高潮　Gary秀中文駁斥：我不花心",
      "field_main_category": {
        "tid": 419889
      },
      "image": {
        "title": "▲Gary平面專訪。（圖／記者陳明安攝，2016.8.5）",
        "description": "▲Gary平面專訪。（圖／記者陳明安攝，2016.8.5）",
        "uri": "hash://959_57a4376c4399b.jpg",
        "originImage": "http://s.nownews.com/ff/5f/ff5f17cd8c1eb0c34ca21cb21b89dfb9.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/ff/5f/ff5f17cd8c1eb0c34ca21cb21b89dfb9.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/ff/5f/ff5f17cd8c1eb0c34ca21cb21b89dfb9.jpg"
      },
      "category": {
        "_id": 419889,
        "name": "娛樂"
      }
    },
    {
      "_id": 2190454,
      "title": "ZICO出演《無限挑戰》美國特輯　拍攝現場圖公開！",
      "field_main_category": {
        "tid": 419889
      },
      "image": {
        "title": "▲Block B隊長ZICO。（圖／翻攝自網路）",
        "description": "▲Block B隊長ZICO。（圖／翻攝自網路）",
        "uri": "hash://12973207_1000225200026685_1389170792829085858_o.jpg",
        "originImage": "http://s.nownews.com/e9/8b/e98b6e60cd7ebfff6ac3baa475632ab9.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/e9/8b/e98b6e60cd7ebfff6ac3baa475632ab9.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/e9/8b/e98b6e60cd7ebfff6ac3baa475632ab9.jpg"
      },
      "category": {
        "_id": 419889,
        "name": "娛樂"
      }
    }
  ],
  "jsonld": {
    "context": "http://schema.org",
    "type": "NewsArticle",
    "datePublished": "2016-08-23T12:53:12+08:00",
    "dateModified": "2016-08-23T13:01:47+08:00",
    "mainEntityOfPage": {
      "type": "WebPage",
      "id": "http://m.nownews.com/news/2214404"
    },
    "articleBody": "韓國MBC電視台從2010年開始，每年的中秋和新年都會推出《偶像明星運動會》，邀請各家藝人共同競賽。日前，MBC電視台也傳出今年中秋將再加開一檔特別綜藝《偶像料理王》，今（23）日，部分參加名單也已經公開，預計有50組團體、多達200名藝人參加，一同競爭「料理王」寶座。",
    "headline": "《偶像料理王》9月播出！兩百名藝人競爭「料理王」寶座",
    "image": {
      "type": "ImageObject",
      "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/c1/b9/c1b9e8c87de5ef51b0443c917b732489.jpg",
      "width": 640,
      "height": 360
    },
    "author": {
      "type": "Person",
      "name": "NOWnews 今日新聞"
    },
    "publisher": {
      "type": "Organization",
      "name": "NOWnews 今日新聞",
      "logo": {
        "type": "ImageObject",
        "url": "http://www.nownews.com/assets/images/logo.png",
        "width": 220,
        "height": 52
      }
    },
    "description": "韓國MBC電視台從2010年開始，每年的中秋和新年都會推出《偶像明星運動會》，邀請各家藝人共同競賽。日前，MBC電視台也傳出今年中秋將再加開一檔特別綜藝《偶像料理王》，今（23）日，部分參加名單也已經公開，預計有50組團體、多達200名藝人參加，一同競爭「料理王」寶座。"
  },
  "ad": {
    "title": "屋主降價 緊來看!過了這村就沒這店",
    "img": "http://legacy.nownews.com/ad2004/160919-102214-6458js.jpg",
    "url": "http://ad1.nownews.com/adclick.php?ownerid=2994&bannerid=35242"
  }
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
  ],
  "categories": [
    {
      "_id": 2607,
      "name": "運動"
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
  "createdAt": "2014/07/06 04:46:55",
  "categories": [
    {
      "_id": 3981,
      "name": "美食"
    },
    {
      "_id": 14133,
      "name": "知識"
    }
  ]
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
      "category": {
        "_id": 419883,
        "name": "政治"
      },
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
      "category": {
        "_id": 419883,
        "name": "政治"
      },
      "createdAt": "2016/08/27 16:51:59"
    },
    ......
    ......
  ]
}
```

### `GET` /nearByNews

找出座標附近的使用者觀看過的新聞

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
| longitude | 經度 | String | √ | `/nearByNews?longitude=25.03505257&latitude=121.53838206` |
| latitude | 緯度 | String | √ | `/nearByNews?longitude=25.03505257&latitude=121.53838206` |

#### Response Status Code

200

#### Response Data

```
{
  "newsList": [
    {
      "_id": 2262306,
      "_type": "node",
      "_bundle": "news",
      "_revision_id": 3424599,
      "nid": 2262306,
      "vid": 3424599,
      "type": "news",
      "language": "zh-hant",
      "title": "買房vs.租房哪個好？　來聽專家怎麼說再決定",
      "uid": 992,
      "status": 1,
      "created": 1475721670,
      "changed": 1475732983,
      "comment": 2,
      "promote": 0,
      "sticky": 0,
      "tnid": 0,
      "translate": 0,
      "body": {
        "summary": "到底買房好還是租房好？這是千古不變的熱門討論話題。許多年輕人認為高房價無力負擔，就算負擔得起，還必須承擔2、30年左右的房貸壓力，所以寧可選擇一輩子當租屋族，也不願意當房奴。每個人的財務狀況和身處環境不同，先了解租屋及買屋的差別，再評估自己的能力狀況。",
        "value": "<p>到底買房好還是租房好？這是千古不變的熱門討論話題。許多年輕人認為高房價無力負擔，就算負擔得起，還必須承擔2、30年左右的房貸壓力，所以寧可選擇一輩子當租屋族，也不願意當房奴。每個人的財務狀況和身處環境不同，先了解租屋及買屋的差別，再評估自己的能力狀況。</p>\r\n<p>中信房屋羅東富貴加盟店魏聚瑋店長分析，租屋族適合短期使用者或是手頭無資金者，像是在外讀書的學生或是選擇在工作附近租屋的上班族，通常待2至4年就會離開此地。買屋者則適合有足夠資金、希望有家的感覺或是想強迫儲蓄的人。</p>\r\n<p>租屋族雖然享有自由的移居生活，但生活沒有保障，最害怕遇到的就是惡房東，再來是不定期的房租漲價，這些都難以掌控，因為活在他人的屋簷下；買屋者則需準備3成的自備款，手頭有足夠資金以及能承受未來房貸的考驗，每月房貸建議別超過薪水的3分之1，才能保有正常的生活品質。</p>\r\n<p>以下整理租屋及買屋的優缺點：</p>\r\n<p>租屋者</p>\r\n<p>優點：</p>\r\n<p>1.享有更好生活品質</p>\r\n<p>2.多餘錢可以用在其他花費上</p>\r\n<p>3.可依照工作地點選擇交通方便的租屋處</p>\r\n<p>缺點：</p>\r\n<p>1.無法保證生活品質（房東隨時調整租金、遇到惡房東、房東隨時收回房子等）</p>\r\n<p>2.年紀大不好租房</p>\r\n<p>3.租屋久，房子也不屬於自己</p>\r\n<p>買屋者</p>\r\n<p>優點：</p>\r\n<p>1.安心踏實</p>\r\n<p>2.房子未來可增值</p>\r\n<p>3.可擁有自己的房子</p>\r\n<p>缺點：</p>\r\n<p>1.需承受高經濟壓力</p>\r\n<p>2.需接受購屋的無形機會成本（損失掉部分娛樂費、生活費等）</p>\r\n<p>那到底買房好還是租房好？魏聚瑋認為，套用華人觀念「有土斯有財」，現在低利率時代，銀行利息跟不上通膨速度，把錢存在銀行，錢反而變薄；把錢繳給房東，租金可以拿來負擔房貸，而房產是最具保值性的投資物件，趁年輕為自己打拚存錢，有個人生目標才能讓自己成長。</p>\r\n<p>現在房價下修、屋主心態鬆動議價空間大、銀行利率低，再加上政府推出「青年安心成家方案」，前兩年零利率，最長可寬限30年，很多人認為租屋可以減少很多生活開銷，可以將錢運用在娛樂和其他投資上，但買房也是一種投資，比起其他投資物件，房地產產生的稅收相對低。不過魏聚瑋也提醒，買房必須謹慎挑選，建議尋找合法房屋仲介，否則買錯後悔莫及。</p>\r\n",
        "format": "full_html"
      },
      "field_adult": {
        "value": "0"
      },
      "field_auth": {
        "value": "1"
      },
      "field_authors": {
        "target_id": 1546329
      },
      "field_free_body": {
        "value": "<div class=\"other_info1\">\r\n\t<a href=\"http://goo.gl/C8QriH\" style=\"display:block; color:#E40012; line-height: 1em; margin-bottom: 0.5em; font-weight: 900;\">》》投票去，我有話要說！</a>\r\n\t<div class=\"other_info1\">\r\n\t\t<div>\r\n\t\t\t<span style=\"color: rgb(51, 51, 51); font-family: Arial, 新細明體; font-size: 16px; line-height: 30px;\">更多NOWnews新聞</span>都在行動APP上：</div>\r\n\t\t<a href=\"https://goo.gl/AWVNkD\" style=\"display:block; color:#097cd2;\">》》Android APP請點這裡下載</a> <a href=\"https://goo.gl/M49ADW\" style=\"display:block; color:#097cd2;\">》》iOS APP請點這裡下載</a> <a href=\"http://legacy.nownews.com/events/adtips/mobile_app/NowNews_Mobile.apk\" style=\"display:block; color:#097cd2;\">》》大陸地區請點此直接下載APK安裝</a></div>\r\n</div>\r\n",
        "format": "free_style"
      },
      "field_free_tags": [
        {
          "tid": 22529
        },
        {
          "tid": 370713
        },
        {
          "tid": 235737
        },
        {
          "tid": 4014
        },
        {
          "tid": 458779
        },
        {
          "tid": 2572
        }
      ],
      "field_handler": {
        "target_id": 86
      },
      "field_hot_status": {
        "value": "5"
      },
      "field_image_title": null,
      "field_is_red": {
        "value": 0
      },
      "field_news_hide": {
        "value": 0
      },
      "field_news_ref": [
        {
          "target_id": 2262298
        },
        {
          "target_id": 2262291
        },
        {
          "target_id": 2229741
        },
        {
          "target_id": 2262222
        },
        {
          "target_id": 2262241
        },
        {
          "target_id": 2255324
        },
        {
          "target_id": 2262151
        },
        {
          "target_id": 2262193
        }
      ],
      "field_newsby": {
        "value": "記者章瑋芸／綜合報導"
      },
      "field_original_id": null,
      "field_push_to": null,
      "field_ra": {
        "radioactivity_energy": 8290,
        "radioactivity_timestamp": 1475748055
      },
      "field_release_date": {
        "value": 1475732910
      },
      "field_release_status": {
        "value": 1
      },
      "field_short_title": {
        "value": "買房、租房哪個好？來聽專家怎麼說"
      },
      "field_source": {
        "target_id": 639
      },
      "field_today_pv": {
        "value": 0
      },
      "field_today_pv2": {
        "value": 0
      },
      "field_release_status2": {
        "value": 5
      },
      "field_script_memo": null,
      "field_zeekmag": null,
      "field_main_category": {
        "tid": 419885
      },
      "image": {
        "title": "▲買房vs.租房哪個好？來聽專家怎麼說再決定。（圖／翻攝自網路）",
        "description": "▲買房vs.租房哪個好？來聽專家怎麼說再決定。（圖／翻攝自網路）",
        "uri": "hash://買房好租屋好.jpg",
        "originImage": "http://s.nownews.com/6b/01/6b015e82a52358a4f3a561570c8468a4.jpg",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/6b/01/6b015e82a52358a4f3a561570c8468a4.jpg",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/6b/01/6b015e82a52358a4f3a561570c8468a4.jpg"
      },
      "category": {
        "_id": 419885,
        "name": "生活"
      },
      "createdAt": "2016/10/06 13:48:30"
    },
    {
      "_id": 2262453,
      "_type": "node",
      "_bundle": "news",
      "_revision_id": 3424368,
      "nid": 2262453,
      "vid": 3424368,
      "type": "news",
      "language": "zh-hant",
      "title": "更高的捕捉率！寶可夢全新系統將到來",
      "uid": 964,
      "status": 1,
      "created": 1475726685,
      "changed": 1475726685,
      "comment": 2,
      "promote": 0,
      "sticky": 0,
      "tnid": 0,
      "translate": 0,
      "body": {
        "summary": "《Pokemon GO》官方粉絲頁面於今(6)日發出的公告中釋出全新功能，未來當玩家獲得成就徽章時，可以提升捕捉該系寶可夢的成功率，官方同時也表示這個全新的功能很快就會到來。",
        "value": "<p>《Pokemon GO》官方粉絲頁面於今(6)日發出的公告中釋出全新功能，未來當玩家獲得成就徽章時，可以提升捕捉該系寶可夢的成功率，官方同時也表示這個全新的功能很快就會到來。</p>\r\n<p>這個全新系統有區分屬性類別，每一種屬性都會各自擁有等級，分為銅、銀、金三個階段，玩家透過捕捉該同屬性寶可夢之後，就可以提升屬性位階，獲取新的成就徽章；銅牌徽章提升需要捕捉10隻寶可夢、銀牌則為50隻、金牌200隻。</p>\r\n<p>這邊簡單舉例，玩家如果達到Kindler（火系金牌）這個等級，捕捉小火龍、六尾、小火馬之類的火系寶可夢會提升它的「捕捉率」，官網目前則無透露銅、銀、金的捕捉率提升百分比，只能依照邏輯推測應該是以位階排序高低。另外，像是波波同時具有飛行、普通二種類別，獎勵將同時分給這二個屬性徽章；也就是說抓二種屬性的寶可夢，將能一次提升二種屬性徽章。</p>\r\n<p>官方目前尚未透露這個新系統開放的時間，只表示將很快到來。</p>\r\n",
        "format": "full_html"
      },
      "field_adult": {
        "value": "0"
      },
      "field_auth": {
        "value": "0"
      },
      "field_authors": {
        "target_id": 2257436
      },
      "field_free_body": {
        "value": "<div class=\"other_info1\">\r\n\t<a href=\"http://vote.nownews.com/\" style=\"display:block; color:#E40012; line-height: 1em; margin-bottom: 0.5em; font-weight: 900;\">》》投票去，我有話要說！</a>\r\n\t<div class=\"other_info1\">\r\n\t\t<div>\r\n\t\t\t<span style=\"color: rgb(51, 51, 51); font-family: Arial, 新細明體; font-size: 16px; line-height: 30px;\">更多NOWnews新聞</span>都在行動APP上：</div>\r\n\t\t<a href=\"https://goo.gl/AWVNkD\" style=\"display:block; color:#097cd2;\">》》Android APP請點這裡下載</a> <a href=\"https://goo.gl/M49ADW\" style=\"display:block; color:#097cd2;\">》》iOS APP請點這裡下載</a> <a href=\"http://legacy.nownews.com/events/adtips/mobile_app/NowNews_Mobile.apk\" style=\"display:block; color:#097cd2;\">》》大陸地區請點此直接下載APK安裝</a></div>\r\n</div>\r\n",
        "format": "free_style"
      },
      "field_free_tags": [
        {
          "tid": 432477
        },
        {
          "tid": 435263
        },
        {
          "tid": 2625
        },
        {
          "tid": 2611
        },
        {
          "tid": 3970
        },
        {
          "tid": 3973
        },
        {
          "tid": 3977
        }
      ],
      "field_handler": {
        "target_id": 964
      },
      "field_hot_status": {
        "value": "5"
      },
      "field_image_title": null,
      "field_is_red": {
        "value": 0
      },
      "field_news_hide": {
        "value": 0
      },
      "field_news_ref": [
        {
          "target_id": 2261323
        },
        {
          "target_id": 2260673
        },
        {
          "target_id": 2259504
        },
        {
          "target_id": 2259016
        },
        {
          "target_id": 2257467
        }
      ],
      "field_newsby": {
        "value": "電玩中心／台北報導"
      },
      "field_original_id": null,
      "field_push_to": null,
      "field_ra": {
        "radioactivity_energy": 9078,
        "radioactivity_timestamp": 1475748055
      },
      "field_release_date": {
        "value": 1475726686
      },
      "field_release_status": {
        "value": 1
      },
      "field_short_title": {
        "value": "更高的捕捉率！寶可夢新系統將到來"
      },
      "field_source": {
        "target_id": 639
      },
      "field_today_pv": {
        "value": 2
      },
      "field_today_pv2": {
        "value": 0
      },
      "field_release_status2": {
        "value": 5
      },
      "field_script_memo": null,
      "field_zeekmag": null,
      "field_main_category": {
        "tid": 419895
      },
      "image": {
        "title": "▲這套新系統在推出後，玩家將有更高的捕捉率，捕捉稀有的寶可夢。（圖／翻攝自網路）",
        "description": "▲這套新系統在推出後，玩家將有更高的捕捉率，捕捉稀有的寶可夢。（圖／翻攝自網路）",
        "uri": "hash://14481778_987452574734634_8289876730596488518_o.png",
        "originImage": "http://s.nownews.com/50/8b/508bca989ee3a19cade78bcdd272c1de.png",
        "thumbnail": "http://imgapi.nownews.com/?w=640&h=360&q=60&src=http://s.nownews.com/50/8b/508bca989ee3a19cade78bcdd272c1de.png",
        "url": "http://imgapi.nownews.com/?w=640&q=75&src=http://s.nownews.com/50/8b/508bca989ee3a19cade78bcdd272c1de.png"
      },
      "category": {
        "_id": 419895,
        "name": "科技"
      },
      "createdAt": "2016/10/06 12:04:46"
    },
    ......
    ......
  ]
}
```