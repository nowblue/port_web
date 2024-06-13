$(document).ready(function() {
    // 배너 설정 함수
    function verticalBanner($wrap, $list) {
        let wrapHeight; // 배너 컨테이너의 높이
        let listHeight; // 배너 리스트의 전체 높이

        // 배너 리스트 복제 후 추가
        let $clone = $list.clone();
        $wrap.append($clone);

        // 배너 컨테이너와 리스트 아이템의 현재 높이 가져오기
        wrapHeight = $wrap.innerHeight();
        listHeight = $list.innerHeight();
        const speed = $list.find('li').outerHeight(true) * 2.5; // 속도를 두 배 빠르게 설정

        // 내용이 컨테이너보다 작은 경우 무한 반복을 만들기 위해 리스트를 복제하여 추가
        while (listHeight < wrapHeight * 2) {
            $clone = $clone.clone();
            $wrap.append($clone);
            listHeight += $list.innerHeight();
        }

        // 수직 롤링 효과를 위해 모든 리스트 아이템에 애니메이션 적용
        const totalHeight = listHeight * $wrap.find('.list').length;
        const animationDuration = totalHeight / speed;

        $wrap.find('.list').css({
            'animation': `${animationDuration}s linear infinite verticalRolling`
        });

        // 1, 3, 5번째 배너의 시작점을 -20vw로 설정
        if ($wrap.index() % 2 === 0) {
            $wrap.css('margin-top', '-30vw');
        }
        // 2, 4번째 배너의 시작점을 -10vw로 설정
        else {
            $wrap.css('margin-top', '-15vw');
        }
    }

    // 초기 배너 설정
    $('.vertical_banner').each(function() {
        verticalBanner($(this), $(this).find('.list'));
    });

    // 창 크기에 따른 현재 디바이스 유형을 반환하는 함수
    function getWindow() {
        return window.innerWidth > 1280 ? 'pc' : window.innerWidth > 767 ? 'ta' : 'mo';
    }

    // 반응형 처리 설정
    let oldWindow = getWindow();
    $(window).on('resize', function () {
        const newWindow = getWindow();
        // 디바이스 유형이 변경된 경우에만 배너 롤링 재설정
        if (newWindow !== oldWindow) {
            oldWindow = newWindow;
            $('.vertical_banner').each(function() {
                verticalBanner($(this), $(this).find('.list'));
            });
        }
    });

    // 이미지 크기 조절을 위한 wheel scroll 이벤트 핸들러
    const img = document.querySelector(".bg");
    let scale = 1;
    const initialHeight = img.offsetHeight;

    const handleScroll = (e) => {
        e.preventDefault(); // 기본 스크롤 동작 막기
        const delta = Math.sign(e.deltaY);
        
        // 위로 스크롤일 때와 아래로 스크롤일 때 각각 다르게 처리
        if (delta > 0) {
            // 아래로 스크롤일 때
            scale += delta * 0.05; // 스크롤마다 이미지 크기 조절
            scale = Math.min(window.innerHeight / initialHeight, scale); // 화면 세로 크기만큼 커지면 멈춤
        } else {
            // 위로 스크롤일 때
            scale = Math.max(1.0, scale + delta * 0.5); // 이미지가 50vw보다 작아지지 않게 함
        }

        img.style.transform = `scale(${scale})`;
    };

    document.addEventListener("wheel", handleScroll);
});


$(document).ready(function() {
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();

        // section2 배경 이미지 위치 조정
        $('.section2').css('background-position-y', -scrollTop / 2 + 'px');
    });
});
