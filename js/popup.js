document.getElementById('sendUrl').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // 현재 페이지의 제목을 가져오는 코드
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: getPageTitle
        }, function(results) {
            // 가져온 제목을 서버로 전송
            fetch('http://127.0.0.1:5000/send_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    url: tabs[0].url, 
                    title: results[0].result // 제목 데이터 추가
                })
            })
            .then(response => response.json()) // JSON 응답 파싱
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        function: insertContent,
                        args: [data.image, data.numbers, data.store, data.others] // 이미지, 숫자, 가게 데이터를 스크립트로 전달
                    });
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});

// 현재 페이지의 제목을 가져오는 함수
function getPageTitle() {
    return document.title;
}

function insertContent(base64data, numbers, store, others) {
    const targetElement = document.querySelector('#entryIframe').parentElement;
    targetElement.style.width = '100%'; 
    targetElement.style.overflow = 'hidden';
    const idsToRemove = ['dynamicImg', 'dynamicNumContainer', 'dynamicStoreContainer', 'dynamicRecommendContainer', 'dynamicHoverBtn', 'dynamicPopupImg'];
    idsToRemove.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    });
    const existingImg = document.getElementById('dynamicImg');
    if (existingImg) existingImg.remove();

    const existingNumContainer = document.getElementById('dynamicNumContainer');
    if (existingNumContainer) existingNumContainer.remove();

    const existingStoreContainer = document.getElementById('dynamicStoreContainer');
    if (existingStoreContainer) existingStoreContainer.remove();

    const existingRecommendContainer = document.getElementById('dynamicRecommendContainer');
    if (existingRecommendContainer) existingRecommendContainer.remove();

    const existinghoverBtn = document.getElementById('dynamicHover-Btn');
    if (existinghoverBtn) existinghoverBtn.remove();
    
    const existingpopupImg = document.getElementById('dynamicPopupImg');
    if (existingpopupImg) existingpopupImg.remove();

    const img = document.createElement('img');
    img.src = `data:image/png;base64,${base64data}`;
    img.style.maxWidth = '70%';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.id = 'dynamicImg';

    const hoverBtn = document.createElement('button');
    hoverBtn.textContent = '추천 기준';
    hoverBtn.style.cssText = 'padding: 10px; font-size: 9px; position: relative; text-decoration : underline;';
    hoverBtn.id = 'dynamicHover-Btn';

    const popupImg = document.createElement('img');
    popupImg.src = "imgpath";
    popupImg.style.cssText = 'width: 600px; height: auto; position: absolute; left: 100%; top: 0; display: none;';
    popupImg.id = 'dynamicPopupImg';

    hoverBtn.appendChild(popupImg);
    hoverBtn.addEventListener('mouseover', () => popupImg.style.display = 'block');
    hoverBtn.addEventListener('mouseout', () => popupImg.style.display = 'none');


    const numContainer = document.createElement('div');
    numContainer.innerHTML = `이 가게는 <b> ${store} 가게 </b> 중 <br/> 재방문율 <b>${numbers[0]}위</b> 가게 입니다. <br/><br/> 최근 3개월간 방문 인원: <b>${numbers[1]}명</b> <br/> 재방문 인원: <b>${numbers[2]}명</b> `;
    numContainer.style.textAlign = 'center';
    numContainer.style.marginTop = '9px';
    numContainer.style.marginBottom = '1px'
    numContainer.id = 'dynamicNumContainer';
<<<<<<< HEAD
=======

    const storeContainer = document.createElement('div');
    storeContainer.innerHTML = `이 가게를 좋아한다면 추천해요!`;
    storeContainer.style.textAlign = 'center';
    storeContainer.style.marginTop = '9px';
    storeContainer.id = 'dynamicStoreContainer';

    let recommendContainer = document.createElement('div');
    recommendContainer.style.textAlign = 'center';
    recommendContainer.style.marginTop = '3px';
    recommendContainer.id = 'dynamicRecommendContainer';

    if (others.length > 1) {
        recommendContainer.innerHTML = `
            ① <b> ${others[0] ? others[0] : ''} </b><br/>
            ② <b> ${others[1] ? others[1] : ''} </b> <br/>
            ③ <b> ${others[2] ? others[2] : ''} </b>`;
    } else {
        recommendContainer.innerHTML = '이 가게는 아직 정보 수집중입니다';
        recommendContainer.style.color = 'gray';
    }
>>>>>>> a87d9bc2ea637afdd602627543b08f983d71b080

    const storeContainer = document.createElement('div');
    storeContainer.innerHTML = `이 가게를 좋아한다면 추천해요!`;
    storeContainer.style.textAlign = 'center';
    storeContainer.style.marginTop = '9px';
    storeContainer.id = 'dynamicStoreContainer';

<<<<<<< HEAD
    let recommendContainer = document.createElement('div');
    recommendContainer.style.textAlign = 'center';
    recommendContainer.style.marginTop = '3px';
    recommendContainer.id = 'dynamicRecommendContainer';

    if (others.length > 1) {
        recommendContainer.innerHTML = `
            ① <b> ${others[0] ? others[0] : ''} </b><br/>
            ② <b> ${others[1] ? others[1] : ''} </b> <br/>
            ③ <b> ${others[2] ? others[2] : ''} </b>`;
    } else {
        recommendContainer.innerHTML = '이 가게는 아직 정보 수집중입니다';
        recommendContainer.style.color = 'gray';
    }

    targetElement.parentNode.insertBefore(hoverBtn, targetElement.nextSibling)
    targetElement.parentNode.insertBefore(img, hoverBtn.nextSibling);
    targetElement.parentNode.insertBefore(numContainer, img.nextSibling);
    targetElement.parentNode.insertBefore(storeContainer, numContainer.nextSibling);
    targetElement.parentNode.insertBefore(recommendContainer, storeContainer.nextSibling);

=======
    targetElement.parentNode.insertBefore(hoverBtn, targetElement.nextSibling)
    targetElement.parentNode.insertBefore(img, hoverBtn.nextSibling);
    targetElement.parentNode.insertBefore(numContainer, img.nextSibling);
    targetElement.parentNode.insertBefore(storeContainer, numContainer.nextSibling);
    targetElement.parentNode.insertBefore(recommendContainer, storeContainer.nextSibling);

>>>>>>> a87d9bc2ea637afdd602627543b08f983d71b080
    
}

