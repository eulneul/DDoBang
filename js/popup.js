document.getElementById('sendUrl').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        fetch('http://127.0.0.1:5000/send_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: tabs[0].url })
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


function insertContent(base64data, numbers, store, others) {
    const img = document.createElement('img');
    img.src = `data:image/png;base64,${base64data}`;
    img.style.maxWidth = '80%'; // 이미지의 최대 너비 설정
    img.style.display = 'block'; // 블록 요소로 설정하여 아래 마진 적용 가능
    img.style.margin = '0 auto'; // 상하 0, 좌우 자동으로 중앙 정렬

    const numContainer = document.createElement('div');
    numContainer.innerHTML = `이 가게는 <b> ${store} 가게 </b> 중 <br/> 재방문율 <b>${numbers[0]}위</b> 가게 입니다. <br/><br/> 총 3개월간 방문 인원: <b>${numbers[1]}명</b> <br/> 재방문 인원: <b>${numbers[2]}명</b> `;
    numContainer.style.textAlign = 'center'; // 텍스트를 중앙으로 정렬
    numContainer.style.marginTop = '9px'; // 이미지 아래에 위치


    const storeContainer =document.createElement('div');
    storeContainer.innerHTML = `이 가게를 좋아한다면 추천해요 <br/> <b> ${others} </b>`;
    storeContainer.style.textAlign = 'center'; // 텍스트를 중앙으로 정렬
    storeContainer.style.marginTop = '9px'; // 이미지 아래에 위치

    const targetElement = document.querySelector('#entryIframe').parentElement;
    targetElement.parentNode.insertBefore(img, targetElement.nextSibling); // 이미지를 타겟 요소 다음에 삽입
    targetElement.parentNode.insertBefore(numContainer, img.nextSibling); // 숫자 컨테이너를 이미지 다음에 삽입
    targetElement.parentNode.insertBefore(storeContainer, numContainer.nextSibling)
}
