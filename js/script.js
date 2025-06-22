document.addEventListener('DOMContentLoaded', () => {
    // Select the new loader elements
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const mainContent = document.querySelector('.main-container');
    const loadingText = document.querySelector('.loading-text');

    // Add a class to the body to prevent scrolling while loading
    document.body.classList.add('loading');

    // --- Minimum display time for the loader ---
    const loadingMinTime = 3000; // 3 seconds
    const loadingStart = Date.now();

    // --- Text animation for the loader ---
    if (loadingText) {
        const texts = [
            "Đang Khám Phá Vẻ Đẹp Cố Đô...",
            "Chuẩn Bị Các Di Tích Lịch Sử...",
            "Sắp Đặt Bàn Tiệc Ẩm Thực Huế...",
            "Sẵn Sàng Để Bạn Trải Nghiệm!"
        ];
        
        let currentTextIndex = 0;
        
        const textInterval = setInterval(() => {
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            
            loadingText.style.opacity = 0;
            
            setTimeout(() => {
                loadingText.textContent = texts[currentTextIndex];
                loadingText.style.opacity = 1;
            }, 500); // 0.5s for fade out before changing text
        }, 2000); // Change text every 2 seconds

        // Store interval ID to clear it later
        loaderWrapper.dataset.textInterval = textInterval;
    }

    // --- Function to hide the loader ---
    const hideLoader = () => {
        // Ensure the function runs only once
        if (loaderWrapper.classList.contains('hidden')) {
            return;
        }

        // Stop the text animation
        const textInterval = loaderWrapper.dataset.textInterval;
        if (textInterval) {
            clearInterval(textInterval);
        }

        // Hide the loader
        loaderWrapper.classList.add('hidden');
        
        // Show the main content and allow scrolling
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = 1;
        document.body.classList.remove('loading');

        // Optional: remove the loader from the DOM after the transition
        setTimeout(() => {
            if (loaderWrapper.parentNode) {
                loaderWrapper.parentNode.removeChild(loaderWrapper);
            }
        }, 1500); // Match the transition duration in loading.css
    };

    // --- Event listener for when the page is fully loaded ---
    window.addEventListener('load', () => {
        const timeElapsed = Date.now() - loadingStart;
        const remainingTime = loadingMinTime - timeElapsed;

        if (remainingTime > 0) {
            setTimeout(hideLoader, remainingTime);
        } else {
            hideLoader();
        }
    });

    // Fallback in case the 'load' event fails
    setTimeout(hideLoader, 10000); // Hide after 10 seconds regardless
});

// Mobile Navigation Menu Toggle - Cải tiến
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Thay đổi icon khi menu mở
            if (menuToggle.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Đóng menu khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                e.target !== menuToggle &&
                !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Xử lý thanh điều hướng khi cuộn
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Kiểm tra ngay khi trang tải
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        }
    }
});

// Smooth Scroll Behavior for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target element
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the element with smooth behavior
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('nav ul li a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    });
});

// Active Menu Item on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    
    function activateMenuOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', activateMenuOnScroll);
});

// Reveal animation on scroll - cải tiến
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.section, .card, .gallery-item');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Check on load and scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Kích hoạt ngay khi trang tải xong để hiển thị các phần tử trong viewport
    setTimeout(revealOnScroll, 300);
});

// Header Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    if (header) {
        // Kiểm tra vị trí cuộn khi trang tải
        checkScroll();
        
        // Kiểm tra khi cuộn trang
        window.addEventListener('scroll', checkScroll);
        
        function checkScroll() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
});

// YouTube API and Video Background
// Declare player variable globally so it's accessible from all functions
let player;

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {

    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        // Header scroll effect
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Reveal elements on scroll
        revealElements();
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Reveal elements on scroll
    function revealElements() {
        const elements = document.querySelectorAll('.section, .card, .gallery-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    // Initial reveal
    revealElements();

    // Check if we're on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Get the video background element
    const videoBackground = document.querySelector('.video-background');
    
    // If it's a mobile device and we have a video background, replace with image
    if (isMobile && videoBackground) {
        const hero = document.querySelector('.hero');
        videoBackground.style.display = 'none';
        hero.style.backgroundImage = "url('images/destinations/imperial-citadel.jpg')";
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center center';
    } else if (videoBackground) {
        // Load YouTube API for desktop - with a slight delay to ensure DOM is ready
        setTimeout(() => {
            console.log("Starting YouTube API load");
            loadYouTubeAPI();
        }, 500);
    }

    // Popup functionality
    const popupTriggers = document.querySelectorAll('.popup-trigger');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupCloseButtons = document.querySelectorAll('.popup-close');
    const body = document.body;

    // Open popup
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            
            popupOverlay.style.display = 'block';
            popup.style.display = 'flex';
            body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
            
            // Add animation
            setTimeout(() => {
                popupOverlay.style.opacity = '1';
                popup.style.opacity = '1';
            }, 10);
        });
    });

    // Close popup
    function closePopup() {
        const openPopups = document.querySelectorAll('.popup[style*="display: flex"]');
        
        popupOverlay.style.opacity = '0';
        openPopups.forEach(popup => {
            popup.style.opacity = '0';
        });
        
        setTimeout(() => {
            popupOverlay.style.display = 'none';
            openPopups.forEach(popup => {
                popup.style.display = 'none';
            });
            body.style.overflow = ''; // Restore scrolling
        }, 300);
    }

    popupCloseButtons.forEach(button => {
        button.addEventListener('click', closePopup);
    });

    popupOverlay.addEventListener('click', closePopup);

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Prevent closing when clicking inside popup content
    const popupContents = document.querySelectorAll('.popup-content');
    popupContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

// YouTube API Functions
// Load YouTube API
function loadYouTubeAPI() {
    console.log("Loading YouTube API");
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// This function will be called by the YouTube API when it's ready
window.onYouTubeIframeAPIReady = function() {
    console.log("YouTube API is ready");
    
    // Create a div for the player if it doesn't exist
    let playerDiv = document.getElementById('youtube-player');
    if (!playerDiv) {
        console.log("Creating player div");
        playerDiv = document.createElement('div');
        playerDiv.id = 'youtube-player';
        document.querySelector('.video-background').appendChild(playerDiv);
    }
    
    // Create YouTube player
    player = new YT.Player('youtube-player', {
        videoId: 'O1qMEdD2BhE', // Video ID for 24 hours in Hue, Vietnam
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playlist': 'O1qMEdD2BhE', // Same video ID for looping
            'mute': 1, // Muted by default for autoplay
            'playsinline': 1,
            'modestbranding': 1,
            'iv_load_policy': 3,
            'enablejsapi': 1,
            'origin': window.location.origin,
            'vq': 'hd1080' // Request high quality video
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
    
    console.log("YouTube player created with video ID: O1qMEdD2BhE");
};

// When player is ready
function onPlayerReady(event) {
    console.log("YouTube player is ready");
    
    try {
        event.target.playVideo();
        event.target.mute();
        
        // Set initial size
        setTimeout(function() {
            resizePlayer();
        }, 100);
        
        // Add resize event listener
        window.addEventListener('resize', resizePlayer);
    } catch (error) {
        console.error("Error in onPlayerReady:", error);
        fallbackToImage();
    }
}

// When player state changes
function onPlayerStateChange(event) {
    console.log("Player state changed:", event.data);
    
    // If video ends, replay it
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
    
    // If video is paused, play it
    if (event.data === YT.PlayerState.PAUSED) {
        player.playVideo();
    }
    
    // If video is buffering for too long, show fallback
    if (event.data === YT.PlayerState.BUFFERING) {
        setTimeout(function() {
            if (player && player.getPlayerState && player.getPlayerState() === YT.PlayerState.BUFFERING) {
                console.log("Video buffering too long, showing fallback");
                fallbackToImage();
            }
        }, 5000); // Wait 5 seconds
    }
}

// Handle player errors
function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
    
    // Error codes: https://developers.google.com/youtube/iframe_api_reference#onError
    const errorMessages = {
        2: "Invalid parameter value",
        5: "HTML5 player error",
        100: "Video not found or removed",
        101: "Video embedding not allowed",
        150: "Video embedding not allowed"
    };
    
    console.error("Error details:", errorMessages[event.data] || "Unknown error");
    
    // Fallback to an image if video fails
    fallbackToImage();
}

// Resize player to cover the container
function resizePlayer() {
    try {
        if (!player || !player.getIframe) {
            console.log("Player not ready for resize");
            return;
        }
        
        const iframe = player.getIframe();
        if (!iframe) {
            console.log("Iframe not found");
            return;
        }
        
        const videoBackground = document.querySelector('.video-background');
        if (!videoBackground) {
            console.log("Video background not found");
            return;
        }
        
        console.log("Resizing player");
        
        // Get container dimensions
        const containerWidth = videoBackground.offsetWidth;
        const containerHeight = videoBackground.offsetHeight;
        
        console.log("Container dimensions:", containerWidth, "x", containerHeight);
        
        // Calculate dimensions to maintain aspect ratio and cover the container
        const videoRatio = 16/9;
        let newWidth, newHeight;
        
        // Always make the video larger than the container to avoid black bars
        if (containerWidth / containerHeight > videoRatio) {
            // Container is wider than video aspect ratio
            newWidth = containerWidth;
            newHeight = containerWidth / videoRatio;
            
            // If height is still not enough, increase it
            if (newHeight < containerHeight) {
                newHeight = containerHeight;
                newWidth = containerHeight * videoRatio;
            }
        } else {
            // Container is taller than video aspect ratio
            newHeight = containerHeight;
            newWidth = containerHeight * videoRatio;
            
            // If width is still not enough, increase it
            if (newWidth < containerWidth) {
                newWidth = containerWidth;
                newHeight = containerWidth / videoRatio;
            }
        }
        
        // Add extra size to ensure no black bars, but with a smaller scale factor
        newWidth = newWidth * 1.05;
        newHeight = newHeight * 1.05;
        
        console.log("New dimensions:", newWidth, "x", newHeight);
        
        // Apply the calculated dimensions
        iframe.width = newWidth;
        iframe.height = newHeight;
        
        // Center the video
        iframe.style.position = 'absolute';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
        
        // Ensure iframe is visible and covers the container
        iframe.style.opacity = '1';
        iframe.style.visibility = 'visible';
        iframe.style.objectFit = 'cover';
    } catch (error) {
        console.error("Error in resizePlayer:", error);
    }
}

// Fallback to image if video fails
function fallbackToImage() {
    console.log("Falling back to image");
    
    const videoBackground = document.querySelector('.video-background');
    const hero = document.querySelector('.hero');
    
    if (videoBackground && hero) {
        // Hide video container
        videoBackground.style.display = 'none';
        
        // Add background image to hero section
        hero.style.backgroundImage = "url('images/destinations/imperial-citadel.jpg')";
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center center';
    }
}

// --- Chatbox Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const chatboxToggle = document.querySelector('.chatbox-toggle');
    const chatboxContainer = document.querySelector('.chatbox-container');
    const chatMessages = document.querySelector('.chatbox-messages');
    const chatInput = document.querySelector('.chatbox-input input');
    const sendButton = document.querySelector('.chatbox-input button');
    const quickRepliesContainer = document.querySelector('.quick-replies');

    if (!chatboxToggle) return;
    
    const initialQuickReplies = [
        "Các điểm đến nổi bật?",
        "Ăn gì ở Huế?",
        "Giá vé tham quan",
    ];

    // --- Toggle Chatbox ---
    chatboxToggle.addEventListener('click', () => {
        chatboxContainer.classList.toggle('active');
        if (chatboxContainer.classList.contains('active')) {
            if (chatMessages.children.length === 0) {
                addBotMessage("Xin chào! Tôi là trợ lý ảo của Du Lịch Huế. Tôi có thể giúp gì cho bạn?", initialQuickReplies);
            }
        }
    });

    // --- Send Message Logic ---
    const handleSendMessage = (messageText) => {
        if (messageText.trim() === '') return;

        addUserMessage(messageText);
        chatInput.value = '';
        clearQuickReplies();

        showTypingIndicator();
        setTimeout(() => {
            getBotResponse(messageText);
        }, 1200);
    };

    sendButton.addEventListener('click', () => handleSendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(chatInput.value);
        }
    });
    
    quickRepliesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
            handleSendMessage(e.target.textContent);
        }
    });

    // --- UI Update Functions ---
    const addUserMessage = (text) => {
        addMessage(text, 'user');
    };
    
    const addBotMessage = (text, replies = []) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot');
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        if (replies.length > 0) {
            displayQuickReplies(replies);
        }
    };
    
    const addMessage = (text, type) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const displayQuickReplies = (replies) => {
        clearQuickReplies();
        replies.forEach(replyText => {
            const replyButton = document.createElement('button');
            replyButton.classList.add('quick-reply');
            replyButton.textContent = replyText;
            quickRepliesContainer.appendChild(replyButton);
        });
    };

    const clearQuickReplies = () => {
        quickRepliesContainer.innerHTML = '';
    };

    const showTypingIndicator = () => {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot', 'typing');
        typingElement.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const typingIndicator = chatMessages.querySelector('.typing');
        if (typingIndicator) {
            chatMessages.removeChild(typingIndicator);
        }
    };
    
    // --- Bot Brain & Response Logic ---
    const knowledgeBase = {
        greetings: {
            keywords: ['chào', 'hello', 'xin chào', 'hi'],
            responses: [
                "Xin chào! Tôi là trợ lý ảo của Du Lịch Huế. Tôi có thể giúp gì cho chuyến đi sắp tới của bạn không?",
                "Chào bạn! Rất vui được trò chuyện. Bạn đang tìm kiếm thông tin gì về du lịch Huế ạ?"
            ],
            replies: ["Các điểm đến nổi bật?", "Ăn gì ở Huế?", "Giá vé tham quan"]
        },
        destinations: {
            keywords: ['điểm đến', 'chơi đâu', 'tham quan', 'địa điểm'],
            responses: [
                "Huế có rất nhiều điểm đến lịch sử và thơ mộng! Các địa điểm không thể bỏ qua là Kinh Thành Huế, Chùa Thiên Mụ, và các Lăng tẩm của vua triều Nguyễn. Bạn muốn tìm hiểu chi tiết về nơi nào?",
                "Bạn đã đến đúng nơi rồi! Huế nổi tiếng với các di sản văn hóa. Tôi gợi ý bạn nên ghé thăm Kinh Thành, Chùa Thiên Mụ. Bạn muốn biết thêm về nơi nào cụ thể?"
            ],
            replies: ["Kinh Thành Huế", "Chùa Thiên Mụ", "Các Lăng tẩm"]
        },
        imperial_city: {
            keywords: ['kinh thành', 'đại nội'],
            responses: [
                "Kinh Thành Huế là một quần thể kiến trúc đồ sộ, nơi các vị vua triều Nguyễn đã ở và làm việc. Vé vào cổng khoảng 200.000 VNĐ. Bạn nên dành ít nhất nửa ngày để khám phá nơi này nhé!",
                "À, Đại Nội! Đó là trái tim của Kinh Thành Huế. Một nơi tuyệt vời để tìm hiểu về lịch sử. Giá vé tham khảo là 200.000 VNĐ. Đừng quên mang máy ảnh nhé!"
            ],
            replies: ["Giá vé các lăng?", "Chùa Thiên Mụ thì sao?", "Ăn gì gần đây?"]
        },
        ticket_price: {
            keywords: ['giá vé', 'bao nhiêu tiền', 'vé vào cổng'],
            responses: [
                "Giá vé tham quan có thể thay đổi, nhưng tôi có một vài thông tin tham khảo: Vé vào Đại Nội là 200.000 VNĐ, Lăng Khải Định là 150.000 VNĐ. Bạn muốn biết giá vé của địa điểm cụ thể nào không?",
                "Về giá vé, vé vào các điểm chính như Đại Nội là 200.000 VNĐ/người, Lăng Tự Đức và Khải Định là 150.000 VNĐ/người. Bạn cũng có thể mua vé combo để tiết kiệm hơn đó!"
            ],
            replies: ["Lăng Tự Đức", "Lăng Minh Mạng", "Mua vé combo ở đâu?"]
        },
        opening_hours: {
            keywords: ['thời gian', 'mấy giờ', 'mở cửa'],
            responses: [
                "Các điểm tham quan chính thường mở cửa từ 7:00 sáng đến 5:30 chiều hàng ngày. Vào các dịp Festival, giờ mở cửa có thể kéo dài hơn. Tốt nhất là bạn nên kiểm tra lại trước khi đi nhé!",
                "Hầu hết các di tích đều chào đón du khách từ 7:00 đến 17:30. Bạn có kế hoạch đi đâu để tôi kiểm tra cụ thể hơn không?"
            ],
            replies: ["Kinh thành mở cửa đến mấy giờ?", "Festival Huế khi nào?", "Cảm ơn bạn"]
        },
        food: {
            keywords: ['ăn gì', 'đặc sản', 'ẩm thực', 'quán ăn'],
            responses: [
                "Huế là thiên đường ẩm thực! Bạn không thể bỏ qua Bún Bò Huế, các loại bánh (bèo, nậm, lọc), cơm hến... Nghe thôi đã thấy đói bụng rồi! Bạn muốn tôi gợi ý một vài quán ăn ngon không?",
                "Nói đến ẩm thực Huế thì không thể kể hết! Từ món ăn cung đình đến dân dã đều rất đặc sắc. Bạn muốn thử món mặn như Bún Bò, Cơm Hến hay các loại bánh và chè ngọt ngào?"
            ],
            replies: ["Gợi ý quán Bún Bò", "Gợi ý quán bánh Huế", "Chè Huế có ngon không?"]
        },
        thank_you: {
            keywords: ['cảm ơn', 'cám ơn', 'thank you', 'tuyệt vời'],
            responses: [
                "Rất vui được hỗ trợ bạn! Chúc bạn có một chuyến đi thật nhiều kỷ niệm đẹp tại Huế.",
                "Không có gì ạ! Nếu cần thêm thông tin, đừng ngần ngại hỏi tôi nhé. Chúc bạn một ngày tốt lành!"
            ],
            replies: ["Các điểm đến nổi bật?", "Ăn gì ở Huế?"]
        },
        fallback: {
            keywords: [],
            responses: [
                "Rất xin lỗi, tôi chưa được lập trình để hiểu câu hỏi này. Tuy nhiên, bạn có thể tìm thấy nhiều thông tin hữu ích trong các mục Điểm Đến và Ẩm Thực trên trang web của chúng tôi.",
                "Ôi, câu hỏi này làm khó tôi rồi! Tôi vẫn đang học hỏi thêm. Trong lúc đó, bạn có thể xem các phần khác trên trang web, có thể câu trả lời bạn tìm đang ở đó.",
                "Cảm ơn bạn đã hỏi. Tôi sẽ ghi nhận câu hỏi này để học hỏi thêm. Bạn có cần trợ giúp về các chủ đề như điểm đến, ẩm thực hay giá vé không?"
            ],
            replies: ["Các điểm đến nổi bật?", "Ăn gì ở Huế?", "Giá vé tham quan"]
        }
    };

    const getBotResponse = (userInput) => {
        removeTypingIndicator();
        const lowerCaseInput = userInput.toLowerCase();
        
        let bestMatch = 'fallback';

        // Find the best matching intent
        for (const intent in knowledgeBase) {
            for (const keyword of knowledgeBase[intent].keywords) {
                if (lowerCaseInput.includes(keyword)) {
                    bestMatch = intent;
                    break; // Exit inner loop once a keyword matches
                }
            }
            if (bestMatch !== 'fallback') break; // Exit outer loop if we found a match
        }
        
        const intentData = knowledgeBase[bestMatch];
        const randomResponse = intentData.responses[Math.floor(Math.random() * intentData.responses.length)];
        
        addBotMessage(randomResponse, intentData.replies);
    };
}); 