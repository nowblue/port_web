// 카테고리 선택에 따라 갤러리 그리드 변경
document.getElementById('category').addEventListener('change', function () {
    var category = this.value;
    var phoneGrid = document.querySelector('.phone-grid');
    var cameraGrid = document.querySelector('.camera-grid');

    if (category === 'phone') {
        phoneGrid.classList.add('active');
        cameraGrid.classList.remove('active');
    } else if (category === 'camera') {
        cameraGrid.classList.add('active');
        phoneGrid.classList.remove('active');
    }
});

// 기본적으로 phone-grid를 표시
document.querySelector('.phone-grid').classList.add('active');

// 모달 제어 함수들
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const locationText = document.getElementById("location");
const modalClose = document.getElementsByClassName("close")[0];
const modalArrowLeft = document.querySelector(".modal-arrow.left");
const modalArrowRight = document.querySelector(".modal-arrow.right");

let currentImgIndex;
let currentGrid;

function openModal(date, location) {
    currentGrid = document.querySelectorAll('.gallery-item'); // currentGrid 초기화
    const item = currentGrid[currentImgIndex];
    const img = item.querySelector("img");
    const description = item.querySelector(".description").textContent;

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.textContent = description;
    locationText.textContent = `Date: ${date}, Location: ${location}`;
}

function closeModal() {
    modal.style.display = "none";
}

function plusSlides(direction) {
    currentImgIndex += direction;
    if (currentImgIndex < 0) {
        currentImgIndex = currentGrid.length - 1;
    } else if (currentImgIndex >= currentGrid.length) {
        currentImgIndex = 0;
    }
    openModal();
}

// 각각의 이미지 항목에 클릭 이벤트 리스너 추가
document.querySelectorAll('.gallery-item').forEach((item, index, array) => {
    item.addEventListener('click', function () {
        currentImgIndex = index;
        // openModal('2024-01-19', 'Australia'); // date와 location은 임시로 설정
    });
});

modalClose.onclick = function () {
    closeModal();
}

modalArrowLeft.onclick = function () {
    plusSlides(-1);
}

modalArrowRight.onclick = function () {
    plusSlides(1);
}

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}
