// スクロール矢印がクリックされたときに画面をスクロールするイベントリスナーを追加
document.querySelector('.scroll-arrow-container').addEventListener('click', function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const galleryImages = document.querySelectorAll(".gallery-column img");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    let currentPopup = null;

    // 複数のポップアップ画像を持つギャラリー画像の設定
    const multiImageGallery = {
        'image2.jpg': ['popimage2a.jpg', 'popimage2b.jpg'],
        // 他のギャラリー画像に対しても同様に設定できる
    };

    galleryImages.forEach((image) => {
        image.addEventListener("click", function() {
            overlay.style.display = "block";

            const popup = document.createElement("div");
            popup.classList.add("popup");

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("popup-image-container");

            let imageCount = 1; // Default image count

            // 複数の画像をポップアップに追加
            if (multiImageGallery[image.src.split('/').pop()]) {
                const images = multiImageGallery[image.src.split('/').pop()];
                imageCount = images.length;
                images.forEach(popupImagePath => {
                    const popupImage = document.createElement("img");
                    popupImage.src = popupImagePath;
                    popupImage.alt = `Popup Image ${popupImagePath}`;
                    popupImage.classList.add("popup-image");
                    imageContainer.appendChild(popupImage);
                });
            } else {
                // 通常の1枚の画像をポップアップに追加
                const popupImage = document.createElement("img");
                popupImage.src = image.src.replace('image', 'popimage');
                popupImage.alt = `Popup Image ${image.alt.split(' ')[1]}`;
                popupImage.classList.add("popup-image");
                imageContainer.appendChild(popupImage);
            }

            popup.appendChild(imageContainer);

            let currentIndex = 0;

            if (imageCount > 1) {
                // Only show image count and arrows if there are multiple images
                const imageCountDisplay = document.createElement("div");
                imageCountDisplay.classList.add("image-count-display");
                imageCountDisplay.textContent = `1 / ${imageCount}`;
                popup.appendChild(imageCountDisplay);

                const leftArrow = document.createElement("div");
                leftArrow.classList.add("popup-arrow", "left-arrow");
                leftArrow.innerHTML = "\u003c"; // Left arrow symbol

                const rightArrow = document.createElement("div");
                rightArrow.classList.add("popup-arrow", "right-arrow");
                rightArrow.innerHTML = "\u003e"; // Right arrow symbol

                popup.appendChild(leftArrow);
                popup.appendChild(rightArrow);

                leftArrow.addEventListener("click", () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                    } else {
                        currentIndex = imageCount - 1;
                    }
                    updateImagePosition();
                });

                rightArrow.addEventListener("click", () => {
                    if (currentIndex < imageCount - 1) {
                        currentIndex++;
                    } else {
                        currentIndex = 0;
                    }
                    updateImagePosition();
                });

                function updateImagePosition() {
                    // Hide all images
                    imageContainer.querySelectorAll(".popup-image").forEach(img => {
                        img.style.display = "none";
                    });
                    // Show only the current image
                    imageContainer.children[currentIndex].style.display = "block";

                    // Update image count display
                    imageCountDisplay.textContent = `${currentIndex + 1} / ${imageCount}`;
                }

                // Initially, display only the first image
                updateImagePosition();
            } else {
                // If only one image, display it without any count or arrows
                imageContainer.querySelector(".popup-image").style.display = "block";
            }

            document.body.appendChild(popup);
            currentPopup = popup;

            const closeBtn = document.createElement("div");
            closeBtn.classList.add("popup-close");
            closeBtn.innerHTML = "Close";
            popup.appendChild(closeBtn);

            const infoBtn = document.createElement("button");
            infoBtn.classList.add("information-btn");
            infoBtn.innerHTML = "Information +";
            popup.appendChild(infoBtn);

            const infoText = document.createElement("div");
            infoText.classList.add("information-text");
            infoText.innerHTML = "サンプルテキスト表示中。ここ を差し替え";
            popup.appendChild(infoText);

            infoBtn.addEventListener("click", function() {
                if (infoText.classList.contains("visible")) {
                    infoText.classList.remove("visible");
                    infoBtn.innerHTML = "Information +";
                } else {
                    infoText.classList.add("visible");
                    infoBtn.innerHTML = "Information -";
                }
            });

            closeBtn.addEventListener("click", closePopup);
        });
    });

    overlay.addEventListener("click", closePopup);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && currentPopup) {
            closePopup();
        }
    });

    function closePopup() {
        if (currentPopup) {
            currentPopup.remove();
            overlay.style.display = "none";
            currentPopup = null;
        }
    }

    // スクロールアニメーションをシンプルに
    window.addEventListener("scroll", function() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
    
            // フェードインのタイミングを遅くするために、閾値を増やす
            if (elementPosition < windowHeight - 200) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    });
    window.addEventListener("scroll", function() {
        const fadeElements = document.querySelectorAll('.fade-in-2');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
    
            // フェードインのタイミングを遅くするために、閾値を増やす
            if (elementPosition < windowHeight - 800) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    });
    
});
document.addEventListener("DOMContentLoaded", function() {
    const galleryColumns = document.querySelectorAll(".gallery-column");

    window.addEventListener("scroll", function() {
        galleryColumns.forEach((column, index) => {
            const images = column.querySelectorAll("img");
            images.forEach((image) => {
                const imagePosition = image.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (imagePosition < windowHeight - 400) {
                    setTimeout(() => {
                        image.classList.add("visible");
                    }, 100 * index); // 左右のカラムで異なるタイミングを設定
                } else {
                    image.classList.remove("visible");
                }
            });
        });
    });
});




const rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.5; // キャンバスの幅を画面の50%に設定
canvas.height = window.innerHeight * 0.5; // キャンバスの高さを画面の50%に設定



window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.globalCompositeOperation = 'lighter';
});

let backgroundColors = ['#FFFFFF', '#E6E6E6'];// 背景のグラデーション色
let colors = [
    ['#569aff', '#26b2fb'], // 円のグラデーション色1
    ['#eaf8c4', '#ecffba'], // 円のグラデーション色2
    ['#7b7b7e', '#cfccdd']  // 円のグラデーション色3
];

let count = 20; // 円の数
let blur = [0, 40]; // ぼかしの度合いの範囲
let radius = [1, 120]; // 円の半径の範囲

// ウィンドウサイズに応じて円の数と大きさを調整

// ウィンドウのリサイズイベントでカウントと半径を更新
window.addEventListener('resize', function() {
    count = window.innerWidth <= 768 ? 10 : 20;
    radius = window.innerWidth <= 768 ? [1, 30] : [1, 120];
});

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = 'lighter';

let grd = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
grd.addColorStop(0, backgroundColors[0]);
grd.addColorStop(1, backgroundColors[1]);
ctx.fillStyle = grd;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let items = [];

while (count--) {
    let thisRadius = rand(radius[0], radius[1]); // 円の半径をランダムに設定
    let thisBlur = rand(blur[0], blur[1]); // ぼかしの度合いをランダムに設定
    let x = rand(-100, canvas.width + 100);
    let y = rand(-100, canvas.height + 100);
    let colorIndex = Math.floor(rand(0, 299) / 100);
    let colorOne = colors[colorIndex][0];
    let colorTwo = colors[colorIndex][1];

    let directionX = Math.round(rand(-99, 99) / 100);
    let directionY = Math.round(rand(-99, 99) / 100);

    items.push({
        x: x,
        y: y,
        blur: thisBlur,
        radius: thisRadius,
        initialXDirection: directionX,
        initialYDirection: directionY,
        initialBlurDirection: directionX,
        colorOne: colorOne,
        colorTwo: colorTwo,
        gradient: [x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius],
    });
}

function changeCanvas(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let adjX = 0.2; // X方向の移動速度調整
    let adjY = 0.6; // Y方向の移動速度調整
    let adjBlur = 0.2; // ぼかしの変化速度調整

    let grd = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
    grd.addColorStop(0, backgroundColors[0]);
    grd.addColorStop(1, backgroundColors[1]);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    items.forEach(function(item) {
        if (item.x + (item.initialXDirection * adjX) >= canvas.width && item.initialXDirection !== 0 || item.x + (item.initialXDirection * adjX) <= 0 && item.initialXDirection !== 0) {
            item.initialXDirection = item.initialXDirection * -1;
        }
        if (item.y + (item.initialYDirection * adjY) >= canvas.height && item.initialYDirection !== 0 || item.y + (item.initialYDirection * adjY) <= 0 && item.initialYDirection !== 0) {
            item.initialYDirection = item.initialYDirection * -1;
        }

        if (item.blur + (item.initialBlurDirection * adjBlur) >= blur[1] && item.initialBlurDirection !== 0 || item.blur + (item.initialBlurDirection * adjBlur) <= blur[0] && item.initialBlurDirection !== 0) {
            item.initialBlurDirection *= -1;
        }

        item.x += (item.initialXDirection * adjX);
        item.y += (item.initialYDirection * adjY);
        item.blur += (item.initialBlurDirection * adjBlur);

        ctx.beginPath();
        ctx.filter = `blur(${item.blur}px)`;
        let grd = ctx.createLinearGradient(item.gradient[0], item.gradient[1], item.gradient[2], item.gradient[3]);
        grd.addColorStop(0, item.colorOne);
        grd.addColorStop(1, item.colorTwo);
        ctx.fillStyle = grd;
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
    window.requestAnimationFrame(changeCanvas);
}

window.requestAnimationFrame(changeCanvas);






const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function confirmSubmission() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var budget = document.getElementById("budget").value;

    var confirmationMessage = "お名前: " + name + "\n" +
                              "メールアドレス: " + email + "\n" +
                              "概要: " + subject + "\n" +
                              "ご希望の予算・納期: " + budget + "\n\n" +
                              "この内容でよろしいですか？";

    return confirm(confirmationMessage);
}
function toggleMenu() {
    var overlayMenu = document.getElementById("overlayMenu");
    if (overlayMenu.style.right === "0px") {
        overlayMenu.style.right = "-100%";
    } else {
        overlayMenu.style.right = "0px";
    }
    
     document.querySelector('.hamburger-menu').classList.toggle('open');
}
document.querySelector('.nav-mobile').addEventListener('click', function(event) {
    event.stopPropagation();
});
function scrollToWorks() {
    document.getElementById('works').scrollIntoView({
        behavior: 'smooth'
    });
}

