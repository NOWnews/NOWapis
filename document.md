# NOWapis Document

## 單一新聞
獲取單一新聞資訊

### METHOD

`GET`

### ENDPOINT

`/news/{:nodeId}`

### RESPONSE FIELD

| 欄位名稱 | 型態 | 功能 | 備註 |
|---|---|---|---| 
| nodeId  | String | 這篇新聞的 node id  |  |
| title | String | 新聞的長標題 |  |
| summary | String | 新聞的簡介 |  |
| shortTitle | String | 新聞的短標 |  |
| created | Number | 建立時間 | epochTime |
| changed | Number | 更新時間 | epochTime |
| createdAt | String | 建立時間文字化 |  |
| updatedAt | String | 更新時間文字化 |  |
| htmlBody | String | 新聞內文的 html 文字檔 |  |
| videos | Array | 所有新聞中相關影片 |  |
| mobileBody | Array | 給 app 使用的新聞內文 |  |
| freeBody | String | 自由欄位裡面的 html 文字檔 |  |
| author | String | 新聞作者 |  |
| adult | String | 是否為成人 | "0"代表不是成人，"1"代表成人 |

### EXAMPLE

#### GET `http://example/news/2148719`

#### response

```
{  
    "nodeId":2148719,
    "title":" 高雄市議員陳信瑜今（27）日公布接獲投訴影片，指海軍陸戰隊憲兵連竟集體虐殺小狗，殺狗的人還拍影片炫耀，並以英文發聲誤導追查。海軍陸戰隊指揮部表示，相關人員移法辦理，絕不寬貸。",
    "summary":"陸戰隊防空警衛群遭控虐狗　軍方：絕不寬貸",
    "shortTitle":"陸戰隊遭控虐狗　軍方：絕不寬貸",
    "created":1467006305,
    "changed":1467007406,
    "createdAt":"2016/06/27 13:45:05",
    "updatedAt":"2016/06/27 14:03:26",
    "htmlBody":"<p>高雄市議員陳信瑜今（27）日公布接獲投訴影片，指海軍陸戰隊憲兵連竟集體虐殺小狗，殺狗的人還拍影片炫耀，並以英文發聲誤導追查。海軍陸戰隊指揮部表示，相關人員移法辦理，絕不寬貸。</p>\r\n<p>海軍陸戰隊指揮部表示，獲報即主動行政調查，相關人員即移法辦理，絕不寬貸。陸戰隊指揮部進一步強調，平日即藉由各項集會宣導動物保護觀念，強化官兵守法及愛護動物認知，將持續宣導《動物保護法》之相關規範，以深化官兵動物保護之法治觀念。</p>\r\n<p>海軍陸戰隊政戰主任蘇世霖表示，經過查證，當事人是陸戰隊防空警衛群憲兵，當事人也坦承犯案，軍方會依《動物保護法》依法辦理，絕不寬貸，未來還會有行政處分。</p>\r\n<p>&nbsp;</p>\r\n",
    "videos":[  
        {  
            "type":"youtube",
            "youtubeId":"FvQIahAR6K4",
            "iframe":"<iframe class=\"youtube-player\" frameborder=\"0\" height=\"390\" src=\"https://www.youtube.com/embed/FvQIahAR6K4&amp;oref=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFvQIahAR6K4&amp;has_verified=1?rel=0\" title=\"YouTube video player\" type=\"text/html\" width=\"480\"></iframe>"
        }
    ],
    "mobileBody":[  
        {  
            "tag":"p",
            "content":"高雄市議員陳信瑜今（27）日公布接獲投訴影片，指海軍陸戰隊憲兵連竟集體虐殺小狗，殺狗的人還拍影片炫耀，並以英文發聲誤導追查。海軍陸戰隊指揮部表示，相關人員移法辦理，絕不寬貸。"
        },
        {  
            "tag":"p",
            "content":"海軍陸戰隊指揮部表示，獲報即主動行政調查，相關人員即移法辦理，絕不寬貸。陸戰隊指揮部進一步強調，平日即藉由各項集會宣導動物保護觀念，強化官兵守法及愛護動物認知，將持續宣導《動物保護法》之相關規範，以深化官兵動物保護之法治觀念。"
        },
        {  
            "tag":"p",
            "content":"海軍陸戰隊政戰主任蘇世霖表示，經過查證，當事人是陸戰隊防空警衛群憲兵，當事人也坦承犯案，軍方會依《動物保護法》依法辦理，絕不寬貸，未來還會有行政處分。"
        },
        {  
            "tag":"p",
            "content":" "
        }
    ],
    "freeBody":"<p><iframe class=\"youtube-player\" frameborder=\"0\" height=\"390\" src=\"https://www.youtube.com/embed/FvQIahAR6K4&amp;oref=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFvQIahAR6K4&amp;has_verified=1?rel=0\" title=\"YouTube video player\" type=\"text/html\" width=\"480\"></iframe></p>\r\n<p><a href=\"http://goo.gl/C8QriH\" style=\"display:block; color:#E40012; line-height: 1em; margin-bottom: 0.5em; font-weight: 900;\">》》投票去，我有話要說！</a></p>\r\n<div class=\"other_info1\">\r\n\t<div>\r\n\t\t<span style=\"color: rgb(51, 51, 51); font-family: Arial, 新細明體; font-size: 16px; line-height: 30px;\">更多NOWnews新聞</span>都在行動APP上：</div>\r\n\t<a href=\"https://goo.gl/AWVNkD\" style=\"display:block; color:#097cd2;\">》》Android APP請點這裡下載</a> <a href=\"https://goo.gl/M49ADW\" style=\"display:block; color:#097cd2;\">》》iOS APP請點這裡下載</a> <a href=\"http://legacy.nownews.com/events/adtips/mobile_app/NowNews_Mobile.apk\" style=\"display:block; color:#097cd2;\">》》大陸地區請點此直接下載APK安裝</a></div>\r\n",
    "author":"記者呂炯昌／台北報導",
    "adult":"0"
}
```
