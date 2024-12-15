document.getElementById('sendUrl').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getPageTitle
        }, function(results) {
            fetch('http://localhost:5000/send_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: tabs[0].url,
                    title: results[0].result
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        function: insertPopupContent,
                        args: [data.image, data.numbers, data.store, data.others]
                    });
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});

function getPageTitle() {
    return document.title;
}

function insertPopupContent(base64data, numbers, store, others) {
    const popupId = 'customNonModalPopup';
    let existingPopup = document.getElementById(popupId);
    if (existingPopup) {
        existingPopup.remove(); // 기존 팝업 제거
    }

    // 팝업 생성
    const popup = document.createElement('div');
    popup.id = popupId;
    popup.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        padding: 15px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        font-size: 14px;
        cursor: pointer;
    `;
    closeButton.addEventListener('click', () => popup.remove());

    const title = document.createElement('h3');
    title.textContent = `${store} 재방문율 순위` || '정보 수집중';
    title.style.cssText = 'text-align: center; margin-top: 0; color: #333;';

    const image = document.createElement('img');
    image.src = `data:image/png;base64,${base64data}`|| ''; 
    image.style.cssText = 'width: 100%; height: auto; margin-top: 10px; border-radius: 4px;';

    const info = document.createElement('p');
    if (numbers && numbers.length >= 3 && numbers[0] && numbers[1] && numbers[2]) {
        info.innerHTML = `
            <b>재방문율:</b> ${numbers[0]}위<br/>
            <b>최근 6개월 방문:</b> ${numbers[1]}명<br/>
            <b>재방문:</b> ${numbers[2]}명
        `;
        info.style.cssText = 'font-size: 14px; color: #555; margin: 10px 0;';
    } else {
        info.innerHTML = '이 가게는 정보 수집 중입니다!'; // 공백으로 설정
        info.style.cssText = 'text-align: center; font-size: 14px; color: #555; margin: 10px 0;';
    }
    

    const recommendations = document.createElement('div');
    if (others && others.length > 1) {
        recommendations.innerHTML = `
            <div style="text-align: center; font-weight: bold; margin-bottom: 10px;">
                이 가게를 좋아한다면 추천해요!
            </div>
            ${others.map((item, index) => `<b>${index + 1}. ${item}</b>`).join('<br/>')}
        `;
    } else {
        recommendations.innerHTML = '추천 정보 수집 중';
    }
    recommendations.style.cssText = 'font-size: 14px; color: #555; margin-top: 10px;';

    popup.appendChild(closeButton);
    popup.appendChild(title);
    if (base64data) popup.appendChild(image);
    popup.appendChild(info);
    popup.appendChild(recommendations);

    document.body.appendChild(popup);
}
