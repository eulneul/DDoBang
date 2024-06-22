# 🍏 DDoBang - 재방문율 분석을 통한 가게 평가 시각화
<br/><br/>

 <p align="center"><img src = "https://github.com/eulneul/DDoBang/assets/70475010/8bea7858-1924-41d6-97f1-fc1b1a3fe043" width = 30%></p>
 <p align="center">${\textsf{\color{#417F37}또 방문할 맛집 찾고 싶을땐 ────── 또방}}$</p>
 <p align="center">가게 별로 재방문율을 시각화하고, 특정 가게를 많이 간 사람이 다른 어떤 가게를 많이 방문했는지 클러스터링 기반으로 추천하는 크롬 익스텐션</p>
 
 ---
 ## 문제 정의 및 주제 설정
 최근 온라인 리뷰의 신뢰도가 저하되고 있는 상황에서, 전통적인 리뷰 시스템의 대안으로 재방문율을 제시한다. <br/>
 재방문율을 통해 소비자는 일회성 광고 리뷰를 감별할 수 있고, 소비자의 진정한 만족도와 충성도를 파악할 수 있다. <br/>
 또한, 단골 비율 등의 새로운 인사이트를 파악하여 소비자들에게 전달하고자 한. <br/><br/>

+ 이에 따라 다음과 같은 방식으로 아이디어를 검증한다. <br/>
  + 재방문율이 리뷰/평점을 대체할 수 있는지에 대한 가능성 검토 <br/>
  + 재방문율을 통한 가게 평가 시각화<br/>
  + 재방문율 기반 가게 클러스터링 및 추천<br/><br/>

해당 내용에서 파악한 인사이트를 바탕으로, <b>가게 별로 재방문율을 시각화하고, 특정 가게를 재방문한 사람이 어떤 다른 가게를 방문했는지 추천하는 서비스</b>를 주제로 선정하였다.

## 프로젝트 진행과정
### (1) 데이터 수집 및 전처리
<img src = "https://mblogthumb-phinf.pstatic.net/MjAyMjAzMjNfOTYg/MDAxNjQ4MDE5NzI4OTIx.41TGlc-bLymrFd8xSKHRMFo4MeawD4epK87u2YNLz_0g.ngVCjuV3t39jtuzZ-TaZghrMTrpbbzPvzgSKfIe9j7Qg.PNG.booroogo/%EB%84%A4%EC%9D%B4%EB%B2%84%EC%A7%80%EB%8F%84.png?type=w800" width =30%>
<br/>
네이버 플레이스 리뷰 약 90,000개 수집 및 전처리
<br/>

### (2) 재방문율의 평점 대체 가능성 검토
![image](https://github.com/eulneul/DDoBang/assets/70475010/db1d38d2-b322-491f-a26f-723fe1b76563)
<br/>

### (3) 재방문율 기반 가게 클러스터링 및 추천
![image](https://github.com/eulneul/DDoBang/assets/70475010/3cbc5a6d-a9d4-4bb1-81fe-5cdac6d9487e)
<br/>

### (4) 재방문율 시각화 & 재방문율 기반 가게 추천 크롬 익스텐션 개발
<b> - Arcitecture </b> <br/>
![image](https://github.com/eulneul/DDoBang/assets/70475010/5e0a57fe-a24f-4587-919c-141d66fe5cea)

<br/>
<b> - 데모영상 </b> <br/>

 [![Video Label](http://img.youtube.com/vi/A8Q9c6DGajo/0.jpg)](https://youtu.be/A8Q9c6DGajo)

