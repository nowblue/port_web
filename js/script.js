// 스크롤 이벤트 핸들러 추가
window.addEventListener('scroll', function() {
    var mainImg = document.querySelector('.main_img');
    var scrollPosition = window.scrollY;
    
    // 이미지 확대/축소 비율 계산 (스크롤 위치에 따라 0.5 배율부터 1 배율까지 변화)
    var scale = 0.5 + scrollPosition / window.innerHeight;

    // 최대 1.5 배율로 설정
    if (scale > 1.5) {
        scale = 1.5;
    }

    // 이미지 크기 조정
    mainImg.style.transform = 'scale(' + scale + ')';
});
